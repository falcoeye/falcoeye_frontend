import Lottie from 'lottie-react';
import React, { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import noMapDataAnimation from '../../../../assets/animations/no-map-data.json';

import videojs from "video.js";
import "video.js/dist/video-js.css";
import { useState } from 'react';
import { Fragment } from 'react';

const YoutubeView = ({ videoID, url }) => {
  const onPlayerReady = (event) => { };
  const onPlayerError = (event) => {
    event.target.pauseVideo();
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const videoRef = useRef(null);
  const [player, setPlayer] = useState();

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!player) {
      const videoElement = videoRef.current;
      if (!videoElement) return;
      setPlayer(
        videojs(videoElement, {}, () => {
          console.log("player is ready");
        })
      );
    }
  }, [player, videoRef]);

  useEffect(() => {
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [player]);

  const isYoutube  = url.includes('youtu')

  return (
    <div className="flex justify-center mt-4 relative h-64 md:h-96">
      {url && (
        <Fragment>
          {isYoutube ? (
            <YouTube
              videoId={videoID}
              opts={opts}
              onReady={onPlayerReady}
              onError={onPlayerError}
              className="w-full "
              iframeClassName="h-64 md:h-96 w-full rounded-md"
            />
          ) : (
            <video ref={videoRef} fluid className='video-js vjs-default-skin h-64 md:h-96 w-full rounded-md' autoPlay controls >
              <source src={url} type="application/x-mpegURL" />
            </video>
          ) }
        </Fragment>
      )}
      {!url && (
        <div className="absolute w-full h-full inset-0 overflow-y-auto bg-slate-50/50">
          <Lottie
            animationData={noMapDataAnimation}
            loop={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
    </div>
  );
};

export default YoutubeView;
