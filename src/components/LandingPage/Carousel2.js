import React, { Component } from 'react';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core"
import { backendHost } from '../../api-config';
import Heart from"../../assets/img/heart.png";
import DoctorsCard from './DoctorsCard';

const options = {
   margin: 30,
   responsiveClass: true,
   nav: true,
   loop: false,
   dots: true,
   smartSpeed: 1000,
   responsive: {
       0: {
           items: 2,
       },
       400: {
           items: 2,
       },
       600: {
           items: 2,
       },
       700: {
           items: 3,
       },
       1000: {
           items: 4,

       }
   },
};
export default class Carousel2 extends Component {
   constructor(props){
      super(props);
      this.state = {
        items: [],
        rowno:[],
        ratingValue: [],
        isLoaded: false,
        imageExists: false,
        responsive:{
         0: {
             items: 1,
         },
         370: {
             items: 2,
         },
     },
      }
    }

  componentDidMount(lat,lon,city){
      fetch(`${backendHost}/SearchActionController?cmd=getResults&FeaturedDoctors=901,903,905,872,907,923,873,894,885,874,941`)
        .then(res => res.json())
        .then(json => {
          this.setState({
            isLoaded: true,
            items: json.map.DoctorDetails.myArrayList,
          })            
        })
        .catch(err => null )
    }

    render() {
      var { isLoaded,items } = this.state;
      if(!isLoaded) {
        return (
          <div className="loader my-4">
            <img src={Heart} alt="All Cures Logo" id="heart"/>
          </div>
        );
      }
      else if(isLoaded){
        return(
         <OwlCarousel {...options} nav="true" id="specialists" items={40} margin={20}>
         {items.map((i) => (
          <DoctorsCard
            // key = {i.map.rowno.toString()}
            rowno = {i.map.docID}
            firstName= {i.map.docname_first}
            lastName= {i.map.docname_last}
            primary_spl = {i.map.primary_spl}
            hospital_affliated = {i.map.hospital_affliated}
            state = {i.map.state}
            country_code = {i.map.country_code}
            img={i.map.img_Loc}
          />
         ))}
                        
   </OwlCarousel>
        );
      }
    }
    
}
