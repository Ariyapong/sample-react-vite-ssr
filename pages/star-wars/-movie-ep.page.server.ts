// // /pages/star-wars/movie.page.server.js
// // Environment: server

// import fetch from "node-fetch";

// export async function onBeforeRender(pageContext: any) {
//   // The route parameter of `/star-wars/@movieId` is available at `pageContext.routeParams`
//   const { movieId } = pageContext.routeParams;

//   // `.page.server.js` files always run in Node.js; we could use SQL/ORM queries here.
//   const response = await fetch(`https://swapi.dev/api/films/${movieId}`);
//   let movie = await response.json();

//   // Our render and hydrate functions we defined earlier pass `pageContext.pageProps` to
//   // the root React component `Page`; this is where we define `pageProps`.
//   const pageProps = { movie, pageId: movieId };

//   // console.log("move page server : ", movie)

//   // We make `pageProps` available as `pageContext.pageProps`
//   return {
//     pageContext: {
//       pageProps,
//       // isRunOnServer: true,
//       remark: 'this-override-_default.page.server.tsx-file',
//     },
//   };
// }

// // By default `pageContext` is available only on the server. But our hydrate function
// // we defined earlier runs in the browser and needs `pageContext.pageProps`; we use
// // `passToClient` to tell `vite-plugin-ssr` to serialize and make `pageContext.pageProps`
// // available to the browser.
// export const passToClient = ["pageProps", "isRunOnServer", "remark"];
