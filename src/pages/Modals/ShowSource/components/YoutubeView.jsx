import Lottie from 'lottie-react';
import React from 'react';
import YouTube from 'react-youtube';
import noMapDataAnimation from '../../../../assets/animations/no-map-data.json';

const YoutubeView = ({ videoID }) => {
  const onPlayerReady = (event) => {};
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

  return (
    <div className="flex justify-center mt-4 relative h-64 md:h-96">
      {videoID && (
        <YouTube
          videoId={videoID}
          opts={opts}
          onReady={onPlayerReady}
          onError={onPlayerError}
          className="w-full "
          iframeClassName="h-64 md:h-96 w-full rounded-md"
        />
      )}
      {!videoID && (
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
