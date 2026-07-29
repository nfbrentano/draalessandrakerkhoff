import "./globals.css";
import "./styles/inline-styles.css";
import "./styles/style-0.css";
import "./styles/style-1.css";
import MenuScript from "./scripts/menu";

export const metadata = {
  title: "Dra. Alessandra Kerkhoff",
  description: "Fisioterapeuta Cardiorrespiratória e do Sono",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="home blog wp-custom-logo wp-embed-responsive wp-theme-site-export-1 jps-theme-site-export-1">
        {children}
        <MenuScript />
      </body>
    </html>
  );
}
