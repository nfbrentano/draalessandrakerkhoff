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

  const content = `# Dra. Alessandra Kerkhoff - Fisioterapeuta

> Especialista em Fisioterapia Cardiorrespiratória e Tratamento de Apneia do Sono (ronco, cpap, bipap) em Lajeado, RS.

## Sobre a Dra. Alessandra
Me chamo Alessandra Kerkhoff, sou fisioterapeuta com mais de 17 anos de experiência. Minha trajetória profissional inclui especialização em Fisioterapia Cardiorrespiratória e formação acadêmica sólida, com Mestrado e Doutorado em Ciências Cardiovasculares. Sou reconhecida como referência em Fisioterapia Cardiorrespiratória no Vale do Taquari, com expertise em Apneia do Sono e Reabilitação Cardíaca e Pulmonar.

## Principais Serviços Oferecidos
- **Tratamento de Ronco e Apneia do Sono**: Acompanhamento focado na melhoria da qualidade do sono.
- **Adaptação e Titulação de CPAP / BiPAP**: Suporte para utilização confortável dos equipamentos.
- **Reabilitação Pulmonar e Cardíaca**: Recuperação pós-cirúrgica, infartos e doenças crônicas (DPOC).
- **Fisioterapia Respiratória**: Exercícios e higiene brônquica para melhorar a respiração.

## Contato
- **Telefone / WhatsApp**: +55 51 99614-5583
- **Email**: ackvalecor@gmail.com
- **Endereço**: Rua João Abott, 1234, Centro, Lajeado - RS, 95900-080

## Links e Redes Sociais
- **Site Oficial**: [https://draalessandrakerkhoff.com.br/](https://draalessandrakerkhoff.com.br/)
- **Instagram**: [@draalessandrakerkhoff](https://www.instagram.com/draalessandrakerkhoff)
- **LinkedIn**: [Dra. Alessandra Kerkhoff](https://www.linkedin.com/in/alessandra-cristina-kerkhoff-3763b0202/)
- **Facebook**: [Alessandra Kerkhoff](https://www.facebook.com/profile.php?id=100068731120650)
${articlesText}`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
