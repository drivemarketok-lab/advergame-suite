import Head from 'next/head';
import AdverGameSuite from '../src/components/AdverGameSuite'; 

export default function Home() {
  return (
    <>
      <Head>
        <title>AdverGame Suite | Gana Premios Reales</title>
        <meta name="description" content="Participa en nuestra ruleta de premios exclusiva. ¡Gira y gana descuentos increíbles!" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />

        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="¡Prueba tu suerte y Gana!" />
        <meta property="og:description" content="Gira la ruleta para ganar premios exclusivos de nuestra marca. ¿Tienes suerte hoy?" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=1200&q=80" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="¡Prueba tu suerte y Gana!" />
        <meta name="twitter:description" content="Gira la ruleta para ganar premios exclusivos." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=1200&q=80" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black min-h-screen">
        <AdverGameSuite />
      </main>
    </>
  );
}