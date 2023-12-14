import React from 'react';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Arthritis from "../../assets/img/arthritis.png";
import Slider2 from "../../assets/img/slider-2.png";
import BloodPressure from "../../assets/img/bloodpressure.png";
// import Slider4 from "../../assets/img/slider-4.png";
import Thyroid from "../../assets/img/thyroid.png";
import Psoriasis from "../../assets/img/psoriasis.png";
import Slider7 from "../../assets/img/insomnia.png";
import Slider5 from "../../assets/img/slider-5.png";
import { Link } from 'react-router-dom';

const options = {
   margin: 20,
   responsiveClass: true,
   nav: true,
   dots: false,
   autoplay: false,
   smartSpeed: 1000,
   responsive: {
       0: {
           items: 1,
       },
       200: {
           items: 2,
       },
       600: {
           items: 2,
       },
       700: {
           items: 3,
       },
       1000: {
           items: 5,
       }
   },
};

export default function Carousel1(props){

        return(
            <div className="tab-content category " id="choose-category" style={{maxWidth:"1140px", width:"100%", zIndex: 0}}>
                  <OwlCarousel className="owl-theme owl-loading" items={6} loop margin={150}  {...options}>
                  <div className="item bg-pink">
                        <Link to={ `/searchcategory/disease/1` }>
                           <div className="item-img">
                              {/* <img src={Arthritis} alt="slider-img"/> */}
                              <img src="https://ik.imagekit.io/qi0xxmh2w/productimages/tr:w-300,f-webp/static/media/arthritis.9355bd39de0a7a41b763.png" alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Arthritis</strong></p>
                           </div>
                        </Link>
                        </div>
                        <div className="item bg-org">
                        <Link to={ `/searchcategory/disease/74` }>
                           <div className="item-img">
                              {/* <img src={Slider2} alt="slider-img"/> */}
                              <img src="https://ik.imagekit.io/qi0xxmh2w/productimages/tr:w-300,f-webp/static/media/slider-2.c34db0a81f68e824317c.png" alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Diabetes</strong></p>
                           </div>
                           </Link>
                        </div>
                        <div className="item bg-l-org">
                        <Link to={ `/searchcategory/disease/50` }>
                           <div className="item-img">
                              {/* <img src={BloodPressure} alt="slider-img"/> */}
                              <img src="https://ik.imagekit.io/qi0xxmh2w/productimages/tr:w-300,f-webp/static/media/bloodpressure.78047994cf0b29614562.png" alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Hypertension</strong></p>
                           </div>
                           </Link>
                        </div>
                        <div className="item bg-voilet">
                        <Link to={ `/searchcategory/disease/164` }>
                           <div className="item-img">
                              {/* <img src={Slider7} alt="slider-img" /> */}
                              <img src="https://ik.imagekit.io/qi0xxmh2w/productimages/tr:w-300,f-webp/static/media/insomnia.8242b02ceb4aaa6e742f.png" alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Insomnia</strong><br/></p>
                           </div>
                        </Link>
                        </div>
                        
                        <div className="item bg-blue">
                        <Link to={ `/searchcategory/disease/87` }>
                           <div className="item-img">
                              {/* <img src={Thyroid} alt="slider-img"/> */}
                              <img src="https://ik.imagekit.io/qi0xxmh2w/productimages/tr:w-300,f-webp/static/media/thyroid.df65340d09d516ed8a97.png" alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Thyroid</strong></p>
                           </div>
                           </Link>
                        </div>
                        <div className="item bg-green">
                        <Link to={ `/searchcategory/disease/160` }>
                           <div className="item-img">
                              {/* <img src={Psoriasis} alt="slider-img"/> */}
                              <img src="https://ik.imagekit.io/qi0xxmh2w/productimages/tr:w-300,f-webp/static/media/psoriasis.f95554961c47268a8763.png" alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Psoriasis</strong></p>
                           </div>
                           </Link>
                        </div> 
                        <div className="item bg-l-org">
                        <Link to={ `/searchcategory/disease/155` }>
                           <div className="item-img">
                              {/* <img src={Slider5} alt="slider-img"/> */}
                              <img src="https://ik.imagekit.io/qi0xxmh2w/productimages/tr:w-300,f-webp/static/media/slider-5.4ed805032d9b4b641704.png" alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Skin</strong><br/>Care</p>
                           </div>
                        </Link>
                        </div>
                        {/* <div className="navClass">></div>  */}
      </OwlCarousel>
      </div>
        )
    
}
