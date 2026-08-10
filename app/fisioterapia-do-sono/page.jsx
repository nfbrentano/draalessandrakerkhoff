export const metadata = {
  title: 'Redirecionando...',
  robots: {
    index: false,
    follow: false,
  },
};

export default function FisioterapiaDoSonoRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/apneia-e-ronco/" />
      <script
        dangerouslySetInnerHTML={{
          __html: 'window.location.replace("/apneia-e-ronco/");',
        }}
      />
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <p>Redirecionando para <a href="/apneia-e-ronco/">/apneia-e-ronco/</a>...</p>
      </div>
    </>
  );
}
