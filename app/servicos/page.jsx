import { fixPaths } from "@/app/utils/fixPaths";
import Header from "@/app/components/Header";
export const metadata = {
  title: "Serviços | Fisioterapia Cardiorrespiratória e do Sono em Lajeado",
  description: "Fisioterapia completa e personalizada focando em distúrbios do sono, ronco, apneia e reabilitação cardiovascular em Lajeado e Vale do Taquari.",
  keywords: [
    "tratamento de apneia do sono lajeado",
    "ronco",
    "cpap vale do taquari",
    "serviços de fisioterapia",
    "reabilitação cardiovascular"
  ],
  openGraph: {
    title: "Serviços de Fisioterapia em Lajeado e Vale do Taquari",
    description: "Tratamento de apneia, ronco e reabilitação cardiovascular.",
    url: "https://draalessandrakerkhoff.com.br/servicos",
    siteName: "Dra. Alessandra Kerkhoff",
    locale: "pt_BR",
    type: "article",
  },
};

export default function Page() {
  return (
    <>      <Header currentPath="/servicos" />
      <div dangerouslySetInnerHTML={{ __html: fixPaths(`
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MFHZBLMD"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<a class="skip-link screen-reader-text" id="wp-skip-link" href="#wp--skip-link--target">Pular para o conteúdo</a><div class="wp-site-blocks">


<main id="wp--skip-link--target" class="wp-block-group is-layout-flow wp-container-core-group-is-layout-36bb09e9 wp-block-group-is-layout-flow" style="margin-top:0">
    <div class="entry-content wp-block-post-content has-global-padding is-layout-constrained wp-block-post-content-is-layout-constrained" style="width: 100%; max-width: 100%; margin: 0 auto; padding-top: 2rem; padding-bottom: 3rem;">
        
        <!-- Hero Header -->
        <section class="services-hero">
            <span class="services-hero-badge">Dra. Alessandra Kerkhoff</span>
            <h1 class="services-hero-title">Fisioterapia Cardiorespiratória e do Sono, soluções em CPAP</h1>
            <p class="services-hero-desc">Tratamento humanizado, suporte técnico continuado e tecnologia de ponta para devolver a sua qualidade de vida, capacidade respiratória e noites de sono verdadeiramente reparadoras em Lajeado e Vale do Taquari.</p>
        </section>

        <!-- Core Areas of Expertise Grid -->
        <section style="margin-bottom: 4rem;">
            <div class="services-main-grid">
                <!-- Card 1: Apneia & Ronco -->
                <article class="services-main-card">
                    <div class="services-card-img-wrap">
                        <img class="services-card-img" src="/wp-content/uploads/2025/08/DSC_4829-edited-scaled.avif" alt="Tratamento de Ronco e Apneia do Sono - Dra. Alessandra Kerkhoff" />
                    </div>
                    <div class="services-card-body">
                        <span style="display: inline-block; padding: 0.35rem 0.85rem; border-radius: 50px; font-size: 0.8rem; font-weight: 600; background: #f3e8ff; color: #6b21a8; margin-bottom: 1rem; width: fit-content;">🌙 Fisioterapia do Sono</span>
                        <h2 class="services-card-title">Apneia do Sono e Ronco</h2>
                        <p class="services-card-desc">Diagnóstico funcional, manejo de distúrbios respiratórios obstrutivos e acompanhamento especializado para adaptação ao CPAP e BiPAP.</p>
                        <ul class="services-card-list">
                            <li><span>✓</span> Adaptação personalizada a equipamentos CPAP e BiPAP</li>
                            <li><span>✓</span> Teste prático de máscaras para ajuste anatômico sem vazamentos</li>
                            <li><span>✓</span> Aluguel de CPAP para teste terapêutico e reposição de insumos</li>
                            <li><span>✓</span> Monitoramento contínuo da eficácia e adesão ao tratamento</li>
                        </ul>
                        <a class="services-card-btn" href="/apneia-e-ronco">
                            Saiba Mais sobre Apneia e Ronco ➔
                        </a>
                    </div>
                </article>

                <!-- Card 2: Fisioterapia Cardiorrespiratória -->
                <article class="services-main-card">
                    <div class="services-card-img-wrap">
                        <img class="services-card-img" src="/wp-content/uploads/2025/11/Post-fisio-respiratoria.avif" alt="Fisioterapia Cardiorrespiratória - Dra. Alessandra Kerkhoff" />
                    </div>
                    <div class="services-card-body">
                        <span style="display: inline-block; padding: 0.35rem 0.85rem; border-radius: 50px; font-size: 0.8rem; font-weight: 600; background: #f0fdf4; color: #15803d; margin-bottom: 1rem; width: fit-content;">🫁 Reabilitação Funcional</span>
                        <h2 class="services-card-title">Fisioterapia Cardiorrespiratória</h2>
                        <p class="services-card-desc">Reabilitação pulmonar e cardíaca focada em reduzir a falta de ar, aumentar a capacidade física e promover a recuperação da autonomia diária.</p>
                        <ul class="services-card-list">
                            <li><span>✓</span> Treinamento muscular respiratório e recondicionamento físico</li>
                            <li><span>✓</span> Reabilitação pós-cirúrgica cardíaca e pulmonar</li>
                            <li><span>✓</span> Manejo de doenças respiratórias crônicas (DPOC, asma, fibrose)</li>
                            <li><span>✓</span> Exercícios respiratórios guiados para maior disposição e energia</li>
                        </ul>
                        <a class="services-card-btn" href="/fisioterapia-cardiorrespiratoria">
                            Saiba Mais sobre Fisioterapia Cardiorrespiratória ➔
                        </a>
                    </div>
                </article>
            </div>
        </section>

        <!-- Detailed Services 6-Grid -->
        <section style="margin-bottom: 4rem;">
            <div class="services-section-title-wrap">
                <span class="services-section-tag">Nossos Cuidados</span>
                <h2 class="services-section-title">O Que Oferecemos Na Prática</h2>
                <p class="services-section-subtitle">Serviços técnicos especializados pensados para cada etapa da sua saúde respiratória e da sua noite de sono.</p>
            </div>

            <div class="services-grid-6">
                <div class="services-item-card">
                    <div class="services-item-icon">💨</div>
                    <h3 class="services-item-title">Adaptação & Titulação de CPAP/BiPAP</h3>
                    <p class="services-item-desc">Acompanhamento humanizado para ajuste gradual da pressão, orientação de uso e garantia de noites confortáveis sem desconforto.</p>
                </div>

                <div class="services-item-card">
                    <div class="services-item-icon">🎭</div>
                    <h3 class="services-item-title">Teste e Ajuste de Máscaras</h3>
                    <p class="services-item-desc">Seleção criteriosa entre modelos nasais, oronasais e de almofadas narinais para evitar vazamentos e marcas no rosto.</p>
                </div>

                <div class="services-item-card">
                    <div class="services-item-icon">📦</div>
                    <h3 class="services-item-title">Aluguel e Reposição de Insumos</h3>
                    <p class="services-item-desc">Locação de CPAP para testes terapêuticos e fornecimento de insumos originais como filtros, tubos e umidificadores.</p>
                </div>

                <div class="services-item-card">
                    <div class="services-item-icon">📊</div>
                    <h3 class="services-item-title">Análise de Dados do Sono</h3>
                    <p class="services-item-desc">Leitura e interpretação de relatórios dos equipamentos para mensurar a redução do índice de apneia e otimizar resultados.</p>
                </div>

                <div class="services-item-card">
                    <div class="services-item-icon">🫁</div>
                    <h3 class="services-item-title">Reabilitação Pulmonar & Cardíaca</h3>
                    <p class="services-item-desc">Protocolos de exercícios individualizados para fortalecimento dos músculos inspiratórios e melhora da capacidade aeróbica.</p>
                </div>

                <div class="services-item-card">
                    <div class="services-item-icon">🌱</div>
                    <h3 class="services-item-title">Higiene do Sono & Orientação</h3>
                    <p class="services-item-desc">Educação em saúde para otimização do ambiente de descanso, controle do estresse e prevenção de distúrbios respiratórios.</p>
                </div>
            </div>
        </section>

        <!-- CTA Banner -->
        <section>
            <div class="services-cta-banner">
                <h2 class="services-cta-title">Pronto para Respirar e Durmir Melhor?</h2>
                <p class="services-cta-desc">Entre em contato para agendar sua consulta, tirar dúvidas sobre adaptação de CPAP ou conhecer nossos tratamentos em Lajeado.</p>
                <div class="services-cta-actions">
                    <a class="services-cta-btn-primary" href="https://wa.me/5551996145583" target="_blank" rel="noopener noreferrer">
                        💬 Conversar no WhatsApp
                    </a>
                    <a class="services-cta-btn-secondary" href="tel:+5551996145583">
                        📞 (51) 99614-5583
                    </a>
                </div>
            </div>
        </section>

    </div>
</main>



</div>


`) }} />
    </>
  );
}
