import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = 'https://draalessandrakerkhoff.com.br';
  let articlesText = '';

  try {
    const snapshot = await getDocs(collection(db, 'artigos'));
    const nowIso = new Date().toISOString();

    const articles = snapshot.docs
      .map((doc) => doc.data())
      .filter((data) => {
        if (!data || !data.slug) return false;
        if (data.status === 'rascunho') return false;
        if (data.status === 'agendado' && data.dataPublicacao && data.dataPublicacao > nowIso) {
          return false;
        }
        return true;
      });

    if (articles.length > 0) {
      articlesText = '\n## Artigos Recentes do Blog\n';
      articles.forEach(article => {
        const title = article.titulo || 'Artigo';
        const url = `${baseUrl}/blog/${article.slug.replace(/^\/|\/$/g, '')}/`;
        const summary = article.resumo || article.excerpt || '';
        articlesText += `- [${title}](${url})`;
        if (summary) {
          articlesText += `: ${summary}`;
        }
        articlesText += '\n';
      });
    }
  } catch (err) {
    console.warn('Erro ao buscar artigos do Firestore para o llms.txt:', err);
  }

  const content = `# Dra. Alessandra Kerkhoff — Fisioterapeuta em Lajeado (RS)

> Fisioterapeuta (não médica) — CREFITO-5 116016-F. Fisioterapia do sono (ronco, apneia do sono, adaptação e titulação de CPAP/BiPAP) e fisioterapia cardiorrespiratória em Lajeado e no Vale do Taquari.

## Sobre a Dra. Alessandra
Alessandra Cristina Kerkhoff é fisioterapeuta, com mais de 17 anos de experiência clínica, acadêmica e científica. É especialista em Fisioterapia Cardiorrespiratória, com Mestrado e Doutorado em Ciências da Saúde (Ciências Cardiovasculares) pela UFRGS. Atende presencialmente na Clínica Valecor, em Lajeado, em domicílio e por teleconsulta. Também oferece consultoria e mentoria online para profissionais.

## Serviços
- **Fisioterapia do sono — ronco e apneia do sono** (${baseUrl}/fisioterapia-do-sono/): avaliação funcional da respiração no sono, orientação de higiene do sono e acompanhamento do tratamento da apneia obstrutiva do sono (SAOS).
- **Adaptação e titulação de CPAP / BiPAP**: ajuste da pressão, orientação de uso e análise dos dados do equipamento, conforme indicação médica.
- **Teste de máscaras, aluguel de CPAP e reposição de insumos**: máscaras nasais, oronasais e almofadas nasais; locação para teste terapêutico; filtros, tubos e umidificadores.
- **Fisioterapia cardiorrespiratória** (${baseUrl}/fisioterapia-cardiorrespiratoria/): reabilitação cardíaca (pós-infarto, pós-cirurgia cardíaca, angioplastia, insuficiência cardíaca) e pulmonar (DPOC, asma, fibrose pulmonar, bronquiectasias, pós-COVID).
- **Consultoria e mentoria para profissionais** (online).

Visão geral dos serviços: ${baseUrl}/servicos/

## Atendimento
- **Local**: Clínica Valecor — Rua João Abott, 1234 – Bairro Centro, Lajeado – RS, CEP 95900-080
- **Área atendida (domicílio)**: Lajeado, Arroio do Meio, Estrela e Vale do Taquari
- **Modalidades**: presencial, domiciliar e teleconsulta
- **Horário**: a combinar, com agendamento
- **Telefone / WhatsApp**: +55 51 99614-5583
- **E-mail**: ackvalecor@gmail.com

## Links
- **Site oficial**: ${baseUrl}/
- **Sobre**: ${baseUrl}/sobre/
- **Blog**: ${baseUrl}/blog/
- **Instagram**: https://www.instagram.com/draalessandrakerkhoff
- **LinkedIn**: https://www.linkedin.com/in/alessandra-cristina-kerkhoff-3763b0202/
- **Facebook**: https://www.facebook.com/profile.php?id=100068731120650
${articlesText}`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
