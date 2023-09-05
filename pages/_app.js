import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Thesaurus</title> 
        <meta charSet = "utf-8"/>
        <meta name = "viewport" content = "width=device-width"/>
        <meta name="robots" content="all" /> 
        <meta name = "keywords" content = "thesaurus, synonyms, antonyms, word, related, rhymes, datamuse, search, term, dictionary" />
        <meta name="description" content = "Thesaurus returning synonyms, antonyms, and rhyming words at once, fetched from the Datamuse API. Returned queries hyperlink to Dictionary.com."/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

