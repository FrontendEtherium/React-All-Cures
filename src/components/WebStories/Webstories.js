import React,{useEffect,useState} from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom/cjs/react-router-dom";
<<<<<<< HEAD
// import Floater from "../../assets/img/floater.png"
=======
>>>>>>> fb6a7866c4c0e5439616594c06fa375c83ca7c7f
import axios from 'axios';
import { backendHost } from '../../api-config';
import'./WebStories.css'
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core"
import Footer from "../Footer/Footer";



const options = {
  margin: 30,
  responsiveClass: true,
  nav: true,
  loop: false,
  dots: true,
  smartSpeed: 1000,
  singleItem: true,
  items:1,
  responsive: {
      0: {
          items: 1,
      },
      400: {
          items: 1,
      },
      600: {
          items: 2,
      },
      700: {
          items: 2,
      },
      1000: {
          items: 3,

      }
  },
};





const Webstories = () => {

  const[data,setData]=useState([]);


useEffect(()=>{
  getWebStories();
},[]
)
  const getWebStories= () => {
    axios.get(`${backendHost}/data/webStories/get `)
    .then(res => {
        console.log(res)
        console.log(res.data)
        setData(res.data);
        
    })
    .catch(err => 
        console.log(err)
    )
}
  return (
    <>

    <Header/>
    <div>
   
   
    




    <div className="container d-flex flex-wrap webs"style={{width:"100%"}}>




<<<<<<< HEAD
    {/* <div className="card shadow-sm  mr-3 mb-3" style={{maxWidth:"300px",minHeight:"480px"}}> 
=======
    {/* <div className="card shadow-sm  mr-3 mb-3" style={{maxWidth:"300px"}}> 
>>>>>>> fb6a7866c4c0e5439616594c06fa375c83ca7c7f
      <a href="https://stories.all-cures.com/curing-low-blood-sugar" className="text-decoration-none">
        <div className="card-body">
          <img src={Floater} alt="img" style={{ width: "100%", maxHeight: "250px" }} />
          <h5 className="card-title mt-2"><strong>title</strong></h5>
          <p className="card-text" style={{ fontWeight: "400px" }}>des.</p>
        </div>
      </a>
    </div> */}

<div className="tab-content mt-5" id="choose-category" style={{maxWidth:"1150px", width:"100%", zIndex: 0}}>


  {data.length>0 ?(
                  <OwlCarousel className="owl-theme owl-loading" items={6} loop margin={150}  {...options}>
    
<<<<<<< HEAD
 {data &&
=======
  {data &&
>>>>>>> fb6a7866c4c0e5439616594c06fa375c83ca7c7f
  [...data].reverse().map((item) => (
    <div
      className="card shadow-sm  mr-3 mb-3 "
      style={{ maxWidth: "300px", minHeight: "480px" }}
    >
      <a href={item.link} className="text-decoration-none">
        <div className="card-body">
          <img
<<<<<<< HEAD
            src={`https://ik.imagekit.io/hg4fpytvry/product-images/tr:w-300,f-webp${item.image}`}
=======
            src={`https://ik.imagekit.io/qi0xxmh2w/productimages/tr:w-300,f-webp${item.image}`}
>>>>>>> fb6a7866c4c0e5439616594c06fa375c83ca7c7f
            alt="img"
            style={{ width: "100%", maxHeight: "300px" }}
          />
          <h5 className="card-title mt-2">
            <strong>{item.title}</strong>
          </h5>
          <p className="card-text textTruncate">{item.description}</p>
        </div>
      </a>
    </div>
<<<<<<< HEAD
  ))}
=======
  ))} 

>>>>>>> fb6a7866c4c0e5439616594c06fa375c83ca7c7f




<<<<<<< HEAD
  
=======
>>>>>>> fb6a7866c4c0e5439616594c06fa375c83ca7c7f

</OwlCarousel>
  ):"Loading"}
</div>

</div>


  
    </div>
<<<<<<< HEAD
    <Footer/>
=======
     <Footer/>
>>>>>>> fb6a7866c4c0e5439616594c06fa375c83ca7c7f
    </>
  );
};

export default Webstories;
