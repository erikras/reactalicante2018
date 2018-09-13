// @flow
import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet, injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'
import Styles from '../styles'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  ${styledNormalize}
  
  body {
    font-family: 'Helvetica Neue', arial, sans-serif;
  }
  
  * {
    box-sizing: border-box;
    line-height: 1.3em;
    -webkit-font-smoothing: antialiased;
  }

  a {
    text-decoration: underline;
    color: #145;
  }

  p {
    line-height: 1.6em;
  }

  strong {
    color: #145;
    font-weight: bold;
  }

  input, textarea, button {
    outline: none;
  }
  
  button {
    cursor: pointer;
  }
`

export default class MyDocument extends Document {
  render() {
    const sheet = new ServerStyleSheet()
    const main = sheet.collectStyles(<Main />)
    const styleTags = sheet.getStyleElement()
    return (
      <html>
        <Head>
          <title>React Alicante 2018</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <link
            rel="stylesheet"
            href="/static/font-awesome-4.7.0/css/font-awesome.min.css"
          />
          {styleTags}
        </Head>
        <body>
          <Styles>{main}</Styles>
          <NextScript />
        </body>
      </html>
    )
  }
}
