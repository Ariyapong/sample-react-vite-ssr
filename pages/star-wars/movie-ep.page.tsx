// /pages/star-wars/movie.page.tsx
// Environment: browser and server

import styles from './movie-ep.styles.module.scss'
// import './movie-ep.css'
import React from "react";
import { navigate } from "vite-plugin-ssr/client/router";
import { LayoutDefault } from "../../layout/LayoutDefault";

import * as Popover from "@radix-ui/react-popover";

export { Page };

function Page(pageProps: any) {
  const { movie, pageId } = pageProps;

  console.log("check page Props so far : ", pageProps);

  const handleClickNextEpisode = (clickType: string, pageId: string) => {
    let queryParams = "";
    if (clickType === "next-ep") {
      queryParams = `${parseInt(pageId) + 1}`;
    } else {
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
          <div className="popover-wrapper">
            <Popover.Root>
              <Popover.Trigger className={`${styles.PopoverTrigger}`}>More info</Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className={`${styles.PopoverTrigger}`} sideOffset={5}>
                  Some more info…
                  <Popover.Arrow className={`${styles.PopoverArrow}`} />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>
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
