import React from "react";
import ReactPlayer from "react-player";
import "./ExpertAdviceComponent.css";

const videos = [
  "https://www.youtube.com/shorts/Hjh_tGBtL1U",
  "https://www.youtube.com/shorts/YA-UDrEFVec",
  "https://www.youtube.com/shorts/Hjh_tGBtL1U",
  "https://www.youtube.com/shorts/YA-UDrEFVec",
];

export default function ExpertAdviceComponent() {
  return (
    <section className="expert-advice container">
      <h2 className="landing-page__title">Expert Advice in 60 Seconds</h2>
      <div className="expert-advice__scroll">
        {videos.map((url, idx) => (
          <div key={idx} className="expert-advice__item">
            <div className="expert-advice__wrapper">
              <ReactPlayer
                url={url}
                
                muted
                loop={false}
                controls
                width="100%"
                height="100%"
                config={{
                  youtube: {
                    playerVars: {
                      controls: 1,
                      modestbranding: 1,
                      rel: 0,
                    },
                  },
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
