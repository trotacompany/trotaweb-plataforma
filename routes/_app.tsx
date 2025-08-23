import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html lang="es">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="TrotaWeb - Hosting, almacenamiento y recursos web para desarrolladores. Sin suscripciones, recarga créditos cuando quieras." />
        <meta name="keywords" content="hosting, almacenamiento, web, desarrollo, API, despliegue" />
        <meta name="author" content="TrotaCompany" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TrotaWeb - Plataforma de Hosting y Recursos Web" />
        <meta property="og:description" content="Hosting, almacenamiento y recursos web para desarrolladores. Sin suscripciones obligatorias." />
        <meta property="og:image" content="/logo.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TrotaWeb - Plataforma de Hosting" />
        <meta name="twitter:description" content="Hosting y recursos web para desarrolladores" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" 
        />
        
        <link rel="stylesheet" href="/css/core.css" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        <title>TrotaWeb - Recursos Web</title>
      </head>
      <body>
        <div class="main-layout">
          <Component />
        </div>
      </body>
    </html>
  );
}