import Head from 'next/head';
import AdverGameSuite from '../src/components/AdverGameSuite'; 

export default function Home() {
  return (
    <>
      <Head>
        <title>AdverGame Suite</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <main>
        <AdverGameSuite />
      </main>
    </>
  );
}