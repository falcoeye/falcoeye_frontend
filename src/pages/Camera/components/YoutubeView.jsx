import React from "react";
import YouTube from "react-youtube";
import Lottie from "lottie-react";
import noMapDataAnimation from "../../../assets/animations/no-map-data.json";

const YoutubeView = ({ videoID }) => {
  const onPlayerReady = (event) => {
    // event.target.pauseVideo();
  };
  const onPlayerError = (event) => {
    console.log(event);
    event.target.pauseVideo();
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="flex justify-center mt-3 relative">
      <YouTube
        videoId={videoID}
        opts={opts}
        onReady={onPlayerReady}
        onError={onPlayerError}
        className="w-full "
        iframeClassName="max-h-64 md:max-h-96 w-full rounded-md"
      />

      {!videoID && (
        <div className="absolute w-full h-full inset-0 overflow-y-auto bg-slate-50/50">
          <Lottie
            animationData={noMapDataAnimation}
            loop={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default YoutubeView;
