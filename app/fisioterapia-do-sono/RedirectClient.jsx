'use client';

import { useEffect } from 'react';

const destination = '/apneia-e-ronco';

export default function RedirectClient() {
  useEffect(() => {
    window.location.replace(destination);
  }, []);

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '1rem', textAlign: 'center' }}>
      <p>
        Redirecionando para <a href={destination}>{destination}</a>...
      </p>
      <noscript>
        <p>
          Se não redirecionar automaticamente, clique em <a href={destination}>Apenia e Ronco</a>.
        </p>
      </noscript>
    </main>
  );
}
