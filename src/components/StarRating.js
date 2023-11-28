import axios from "axios";
import React, { useState } from 'react';
// import "./styles.css";
import ReactStars from "react-rating-stars-component";
import { Alert } from 'react-bootstrap';
import { backendHost } from '../api-config';
import { userId } from './UserId';


export default function Rating(props) {

  const [ratingValue, setRatingValue] = React.useState([]
    )
  const [submitAlert, setAlert] = useState(false)
  const [rateId,setRateId] = useState(userId?userId:0)
  const postRating = (rating, docid) => {

    axios.post(`${backendHost}/DoctorRatingActionController?ratingVal=${rating}&ratedbyid=${rateId}&ratedbytype=${rateId}&targetid=${props.docid}&targetTypeid=1&cmd=rateAsset`)
    .then(res => {
      setAlert(true)
    
      setTimeout(() => {
          setAlert(false)
      }, 4000);
  })
  .catch(res => {return})
    
    
  }


 
const thirdExample = {
  size: 40,
  count: 5,
  isHalf: false,
  value: 0,
  color: "yellow",
  activeColor: "orange",
  // filledIcon:"orange",
  onChange: newValue => {
    setRatingValue(newValue)
    // getRating(newValue)
    postRating(newValue)
  }
};


  return (
    <div className="">
      
    
      <ReactStars {...thirdExample} />
      

      {
      submitAlert?
          <Alert variant="success" className="h6 mx-3">You rate this doctor successfully!!</Alert>
          : null
  }
  
    </div>
  );
}
