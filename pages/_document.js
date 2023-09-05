import { Html, Head, Main, NextScript } from 'next/document' 

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
      <link href="https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap" rel="stylesheet"/>
      </Head>
      <body className="w-screen flex flex-col h-screen font-ebGaramond tracking-tight bg-gray-800 text-gray-300 overflow-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
