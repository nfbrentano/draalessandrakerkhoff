'use client';

import { useEffect } from 'react';

export default function RegisterSW() {
  useEffect(() => {
    if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
      // Registrar apenas em produção (ou quando servido por HTTP/HTTPS)
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          // opcional: acompanhar atualizações
          reg.onupdatefound = () => {
            const installing = reg.installing;
            if (installing) {
              installing.onstatechange = () => {
                if (installing.state === 'installed') {
                  // Se houver um cliente controlado, significa atualização disponível
                  if (navigator.serviceWorker.controller) {
                    // Pode notificar o usuário ou forçar reload
                    console.log('Nova versão instalada do service worker.');
                  } else {
                    console.log('Conteúdo em cache para uso offline.');
                  }
                }
              };
            }
          };
        })
        .catch((err) => {
          console.error('Falha ao registrar service worker:', err);
        });
    }
  }, []);

  return null;
}
