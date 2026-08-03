import RedirectClient from './RedirectClient';

export const metadata = {
  title: 'Fisioterapia Do Sono - Redirecionando...',
  description: 'Esta página foi movida permanentemente para /apneia-e-ronco.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <RedirectClient />;
}
