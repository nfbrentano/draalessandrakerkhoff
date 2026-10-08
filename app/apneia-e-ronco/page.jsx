export const metadata = {
  title: 'Redirecionando...',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/fisioterapia-do-sono/',
  },
};

export default function ApneiaERoncoRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/fisioterapia-do-sono/" />
      <script
        dangerouslySetInnerHTML={{
          __html: 'window.location.replace("/fisioterapia-do-sono/");',
        }}
      />
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <p>Redirecionando para <a href="/fisioterapia-do-sono/">/fisioterapia-do-sono/</a>...</p>
      </div>
    </>
  );
}
