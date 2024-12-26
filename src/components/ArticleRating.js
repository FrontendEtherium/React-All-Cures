import axios from "axios";
import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Alert } from "react-bootstrap";
import { backendHost } from "../api-config";
import { userId } from "./UserId";

export default function ArticleRating(props) {
  const [ratingValue, setRatingValue] = React.useState([]);
  const [submitAlert, setAlert] = useState(false);
  const rateId = userId ? userId : 0;

  const postRating = (rating) => {
    axios
      .post(
        `${backendHost}/DoctorRatingActionController?ratingVal=${rating}&ratedbyid=${rateId}&ratedbytype=0&targetid=${props.article_id}&targetTypeid=2&cmd=rateAsset`
      )
      .then((res) => {
        setAlert(true);

        setTimeout(() => {
          setAlert(false);
        }, 4000);
      })
      .catch((err) => {
        console.error("Error posting rating:", err);
      });
  };

  const ratingConfig = {
    size: 20, // Smaller star size
    count: 5,
    isHalf: false,
    value: 0,
    color: "#ccc", // Gray for inactive stars
    activeColor: "#ffa500", // Orange for active stars
    onChange: (newValue) => {
      setRatingValue(newValue);
      postRating(newValue);
    },
  };

  return (
    <div className="article-rating">
      <ReactStars {...ratingConfig} />
      {submitAlert && (
        <Alert variant="success" className="mt-2 p-2 text-center small">
          Rating submitted successfully!
        </Alert>
      )}
    </div>
  );
}
