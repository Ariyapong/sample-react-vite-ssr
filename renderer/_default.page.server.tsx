
// /renderer/_default.page.server.js
// Environment: server

// export { onBeforeRender }
export { render }
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname', 'documentProps', 'isRunOnServer', 'remark']

import "#root/assets/styles/global.styles.scss"
// import "@/assets/styles/global.styles.scss"
import styles from "#root/assets/styles/test.styles.module.scss";
import ReactDOMServer from 'react-dom/server'
import { PageShell } from './PageShell'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server'
import logoUrl from './logo.svg'
import type { PageContextServer } from './types'
import fetch from "node-fetch";

// defined to use as the global onBeforeRender only in this file
async function onBeforeRender(pageContext: any) {
  // The route parameter of `/star-wars/@movieId` is available at `pageContext.routeParams`
  const { movieId } = pageContext.routeParams;

  // `.page.server.js` files always run in Node.js; we could use SQL/ORM queries here.
  const response = await fetch(`https://swapi.dev/api/films/${movieId}`);
  let movie = await response.json();

  // Our render and hydrate functions we defined earlier pass `pageContext.pageProps` to
  // the root React component `Page`; this is where we define `pageProps`.
  const pageProps = { movie, pageId: movieId };

  // console.log("move page server : ", movie)

  // We make `pageProps` available as `pageContext.pageProps`
  return {
    pageContext: {
      pageProps,
      // isRunOnServer: true,
      remark: 'this-override-_default.page.server.tsx-file',
    },
  };
}

async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext
  // This render() hook only supports SSR, see https://vite-plugin-ssr.com/render-modes for how to modify render() to support SPA
  if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined')
  const pageHtml = ReactDOMServer.renderToString(
    <PageShell pageContext={pageContext}>
      <p className={`${styles.testColor} font-bold`}>test style</p>
      {/* <p className={`font-bold`}>test style</p> */}
      <Page {...pageProps} />
    </PageShell>
  )

  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext.exports
  const title = (documentProps && documentProps.title) || 'Vite SSR app'
  const desc = (documentProps && documentProps.description) || 'App using Vite + vite-plugin-ssr'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="react-root" class="testapp">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

    console.log("run on server side default",)

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
      isRunOnServer: true,
      remark: 'this-from-_default.page.server.tsx-file',
    }
  }
}






