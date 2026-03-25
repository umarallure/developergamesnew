import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head />
      <body className="bg-black min-h-screen antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

