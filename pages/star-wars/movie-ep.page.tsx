// /pages/star-wars/movie.page.tsx
// Environment: browser and server

import React from "react";
import { navigate } from "vite-plugin-ssr/client/router";
import { LayoutDefault } from '../../layout/LayoutDefault'

export { Page };

function Page(pageProps: any) {
  const { movie, pageId } = pageProps;

  console.log("check page Props so far : ", pageProps);

  const handleClickNextEpisode = (clickType: string, pageId: string) => {
    let queryParams = "";
    if (clickType === "next-ep") {
      queryParams = `${parseInt(pageId) + 1}`;
    }
    else {
      queryParams = `${parseInt(pageId) - 1}`;
    }

    navigate(`/star-wars/${queryParams}`);
  };

  return (
    <LayoutDefault>
      {movie && Object.keys(movie).length > 0 && (
        <>
          <h1>{movie.title}</h1>
          <p>Release Date: {movie.release_date}</p>
          <p>Director: {movie.director}</p>
          <button
            className=""
            onClick={() => handleClickNextEpisode("prev-ep", pageId)}
          >
            Previous Episode
          </button>
          <button
            className=""
            onClick={() => handleClickNextEpisode("next-ep", pageId)}
          >
            Next Episode
          </button>
        </>
      )}
      {!movie && <div>No content to render..</div>}
    </LayoutDefault>
  );
}
