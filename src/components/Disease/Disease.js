 import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Select, MenuItem } from '@material-ui/core';
import parse from 'html-react-parser';
import {Container, Row, Col, Breadcrumb } from "react-bootstrap";
import {Link } from 'react-router-dom'
import CenterWell from './CenterWell';
import Sidebar from "./leftMenu";
import SidebarRight from "./RightMenu";
import Doct from "../../assets/img/doct.png";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';





import { backendHost } from '../../api-config';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import ArticleComment from '../ArticleComment';
import PhoneInput from 'react-phone-number-input';
import { Button, Modal } from "react-bootstrap";
import 'react-phone-number-input/style.css';
import ArticleRating from '../ArticleRating';
import Favourite from '../favourite';
import Favourites from '../UpdateFavourite';

import HelmetMetaData from '../HelmetMetaData';
import {FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton} from "react-share";
import AyurvedaAd from '../../assets/healthcare/img/images/Banner-ads/97x90 Plain.jpg'
import PersianAd from '../../assets/healthcare/img/images/Banner-ads/Persian.jpg'
import CarouselPreview from './CarouselPreview';

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { PreviewTab } from './PreviewTab';
import Heart from"../../assets/img/heart.png";
import {userId} from "../UserId"
import { userAccess } from '../UserAccess';
import Date from '../Date'
import { imagePath } from '../../image-path'
import { faKeybase } from '@fortawesome/free-brands-svg-icons';
import headers from '../../api-fetch';

import axiosInstance from '../../axiosInstance';



const options = {
  responsiveClass: true,
  nav: true,
  loop: false,
  smartSpeed: 1000,
  autoPlay: true,
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
class Disease extends Component {
  constructor(props) {
    super(props);
    this.childDiv = React.createRef()
    this.state = { 

      
      images:[],
      currentIndex: 0,
      items: [],
      carouselItems: [],
      comment: [],
      isLoaded: false,
      ratingValue: '',
      rating:[],
      ratingVal:[],
      param : this.props.match.params,
      disease: '',
      regions: '',
      regionPostsLoaded: false,
      isVisible: false,
      regionalPost: [],
      showMore: false,
      value:'',
      type: [],
      favourite: [],
      diseaseList:[],
      disease:[],
      cures:[],
      showAlert: false,
      alertMsg: '',
      showCuresCards: false,
      modalState: false,
      url:window.location.href,
      ads:'',
      isWindowLoaded: false,
      adId:'',
       likeClicked:false,
      dislikeClicked:false ,
    };
   
   

  }

  
 







  



fetchBlog = async() => {
  var id = this.props.match.params.id.split('-')[0]
  if(/^[0-9]+$/.test (id)){           // Test if URL contains article_id or TITLE

    Promise.all([
      fetch(`${backendHost}/article/${id}`,{
        method: 'GET',
        headers: headers

      }) // if URL contains article_id
        .then((res) => res.json()),
      // fetch(`${backendHost}/sponsored/parent_disease_id/${this.props.match.params.id.split('-')[0]}`)
      //   .then((res) => res.json()),
        
    ])
    
    
    .then(([json, json_new]) => {


      
      // console.log(json)
     
        this.setState({
          isLoaded: true,
          items: json,
        }, () => {
           
        

          document.title = `${this.state.items.title}`;
        });

        
      // console.log('id', this.props.match.params.id.split('-')[0]);

      
      // console.log('parent_dc_id:', json_new.parent_dc_id);
      // if (json_new.parent_dc_id !== 0) {
      //   console.log('delayed not null');
      //   this.fetchData(json_new.parent_dc_id);
      // }
      
    });
  
  
  
  }
   else {                                                    // if URL contains title

   
    Promise.all([
      fetch(`${backendHost}/article/title/${id}`,{
        method: 'GET',
        headers: headers
      }) // if URL contains article_id
        .then((res) => res.json()),
      // fetch(`${backendHost}/sponsored/parent_disease_id/${this.props.match.params.id.split('-')[0]}`)
      //   .then((res) => res.json()),
       
    ])
    
    
    .then(([json, json_new]) => {

    
        this.setState({
          isLoaded: true,
          items: json,
        }, () => {
        
          
          document.title = `${this.state.items.title}`;
        });

             
        console.log('id', this.props.match.params.id.split('-')[0]);
      // console.log('parent_dc_id:', json_new.parent_dc_id);
      // if (json_new.parent_dc_id !== 0) {
      //   console.log('delayed not null');
      //   this.fetchData(json_new.parent_dc_id);
      // }
      
    });

    
    
    
  
  
  }
  
}

















 
  
 
  componentDidMount(){
   
   
     
  }




 
 

  showComments = (item, i) => {
      return (
        <>
        <div className="col-12">
          <div className="card my-4 ">
            <div className="card-body d-flex">
              <div className='comment-img'>
                <i className="fas fa-user-md fa-4x pl-3 mb-2"></i>
                <h6 className="card-subtitle my-2 text-muted">
                        {item.first_name} {item.last_name}
                      </h6>
              </div>
              <div>
                <h5 className="h5 mt-3"> {item.comments}</h5>
                  <div className="card-info">
                  </div>
              </div>
                
            </div>
          </div>
        </div>
      </>
      )
  }
   



 

 






componentDidMount() {
  // window.scrollTo(0, 0);


  const isMobileView = window.innerWidth <= 768
    window.scrollTo({
      top: isMobileView ? 650 : 200, // Adjust the values as needed
      behavior: 'smooth',
    });


  this.fetchBlog();
  

  const canonicalLink = document.createElement('link');
  canonicalLink.rel = 'canonical';

  const currentURL = window.location.href.toLowerCase();

  const canonicalURL = currentURL.replace(/(https?:\/\/)?www\./, '$1');


  if (canonicalURL.match(/\/cure\/\d+/)) {
    const id = this.props.match.params.id.split('-')[0];

    fetch(`${backendHost}/article/${id}`,{
      method: 'GET',
      headers: headers
    })
      .then((res) => res.json())
      .then((json) => {
        const title = json.title;
        canonicalLink.href = `${window.location.origin}/cure/${id}-${title.replace(/\s+/g, '-')}`;
        document.head.appendChild(canonicalLink);
        console.log('Canonical Link:', canonicalLink.outerHTML);
      })
      .catch((err) => {
        canonicalLink.href = canonicalURL;
        document.head.appendChild(canonicalLink);
        console.log('Canonical Link:', canonicalLink.outerHTML);
      });
  } else {
    canonicalLink.href = canonicalURL;
    document.head.appendChild(canonicalLink);
    console.log('Canonical Link:', canonicalLink.outerHTML);
  }
}




  componentDidUpdate(prevProps){
    if ( prevProps.match.params.id !== this.props.match.params.id){
      this.fetchBlog()
      window.scrollTo(0, 340);
    }
  }

  handleChange = e => {
    this.setState({
        disease: e.target.value 
    });
  }

  IsJsonValid(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return [];
    }
    return JSON.parse(str).blocks;
  }

  render() { 
    const { isVisible } = this.state;
    var { isLoaded, items, carouselItems,text } = this.state;
    
    
    if(!isLoaded) {
    return (
      <>

      </>  
    );
  } else if(isLoaded){

    // FInding distinct regions from fetchCountriesData()
    const finalRegions = [];
    const map = new Map();
    for (const item of this.state.regions) {
        if(!map.has(item.countryname)){
            map.set(item.countryname, true);    // set any value to Map
            finalRegions.push({
              countryname: item.countryname
            });
        }
    }

    var artContent = items.content;
    var a = JSON.parse(decodeURIComponent(artContent))
    var b = a.blocks
console.log('img',b)

       

    return (
    <div>

<div>
           
        
           
         </div>
     
    
        <Row>
          <div className='left-menu pb-3'>  
           
            
             

{/* 
                    <button className="btn pl-4 mt-2 " id="left-menu-ad" data-toggle="modal"data-target=".bd-example-modal-lg">
                                 <img className="pl-4" src={PersianAd} alt="ad"/>
                                 </button> */}

                 
                           
                        





            
          </div>
          
          <Col  md={7} id="page-content-wrapper" className="col-xs-12 pb-5">
            <div id="center-well" className="">

             
              
                
              <div  className="  px-2 py-2"style={{backgroundColor:"#e9ecef"}}>

              <div id="" className="">
                {/* Sharing icons */}
          
              
              <div className="  share-buttons-region ml-2" id="filter" >
              
              <div className="d-flex justify-content-end margin-auto" id="article-acc-to-regions">
                 


                 <div   >
             
                      </div>


                      {/* <div className="d-md-none">
                      <OwlCarousel nav="true" items={5} margin={10} autoPlay="true" {...options} >
          {finalRegions
            ? finalRegions.map((i) => i.countryname !== null && (


              <Dropdown key={i.countryname}>
              <Dropdown.Toggle className="mr-2 btn btn-info color-white">
                <span className="color-white">{i.countryname}</span>
              </Dropdown.Toggle>
            <Dropdown.Menu>
            {
              this.state.regionalPost.map(j => j.countryname === i.countryname 
                &&(
                <>
                <Dropdown.Item href="#" className="pt-2" key={j.countryname}>
                <Link to={ `/cure/${j.article_id}` }  className="d-flex justify-content-between align-items-center mr-2">
                  <div className="d-flex justify-content-between align-items-center mb-2"id="artBtn">
                    <div>                  
                      <div className="card-title mr-5">{j.title.substr(0,25)+'...'}</div>
                    </div>
                    <div>
                      {
                        j.type.includes(1)?
                          <div className="chip overview">Overview</div>
                        : j.type.includes(2)?
                          <div className="chip cure">Cures</div>
                        : j.type.includes(3)?
                          <div className="chip symptoms">Symptoms</div>
                        : null
                      }
                    </div>
                  </div>
                </Link>
                </Dropdown.Item>
                </>
              ))
            }
          </Dropdown.Menu>
        </Dropdown>
              
            ))
            : null
          }
        </OwlCarousel>
      </div> */}
    





                </div>
                </div>


                </div>





              </div>
           
              
            {
              this.props.match.params.cureType?
                <CarouselPreview type="cures" dcName={`${items.dc_name}`}/>
                : <>
                   <div className="article-title-container">
              <h1 className=" font-weight-bold text-decoration-underline">{items.title}</h1>
             
             
              
              {/* Show average rating */}
              {/* <div id="rate">
            
             <a href='#docRate'>Click To Rate Here</a></div> */}
            {/* <Dropdown>
                      <Dropdown.Toggle className="mr-220 btn btn-info color-white">
                       < a href='#docRate'className="color-white" >Click Here To Rate</a>
                      </Dropdown.Toggle>
                   
                    </Dropdown> */}
         
               
               {/* Call average rating fetch function */}
           
            
            </div>

            {/* Center Well article main content */}
              <div id="article-main-content">
                {/* {b.map((i, idx) => (


                  <CenterWell
                    key={idx}
                    pageTitle = {items.title}
                    level = {i.data.level}
                    content = {i.data.content}
                    type = {i.type}
                    text = {i.data.text}
                    title = {i.data.title}
                    message = {i.data.message}
                    source = {i.data.source}
                    embed = {i.data.embed}
                    caption = {i.data.caption}
                    alignment = {i.data.alignment}
                    // imageUrl = {i.data.file? i.data.file.url: null}
                    imageUrl={i.data.file ? `https://ik.imagekit.io/hg4fpytvry/product-images/tr:w-300,f-webp/${i.data.file.url.replace(/^.*[\\/]/, '')}` : null}
                    link = {i.data.link}
                    url = {i.data.url}
                    item = {i.data.items}
                    props = {this.props}
                  />
                ))} */}


{b.map((i, idx) => {
  const fileUrl = i.data.file ? i.data.file.url : null;
  const imageUrl = fileUrl
    ? `https://ik.imagekit.io/hg4fpytvry/product-images/tr:w-1000,f-webp/cures_articleimages/${fileUrl.replace(/^.*[\\/]/, '')}`
    : null;

  // console.log('Original URL:', fileUrl);
  // console.log('Modified URL:', imageUrl);

  return (
    <CenterWell
      key={idx}
      pageTitle={items.title}
      level={i.data.level}
      content={i.data.content}
      type={i.type}
      text={i.data.text}
      title={i.data.title}
      message={i.data.message}
      source={i.data.source}
      embed={i.data.embed}
      caption={i.data.caption}
      alignment={i.data.alignment}
      imageUrl={imageUrl}
      link={i.data.link}
      url={i.data.url}
      item={i.data.items}
      props={this.props}
    />
  );
})}

              </div>
              <hr/>
              {/* Author */}
              {
                items.authors_name?
                  <div className='h5 text-left ml-3 mb-2'><span>Author: </span> {items.authored_by.includes(7)? items.authors_name: <Link to={`/doctor/${items.reg_doc_pat_id}`}> {items.authors_name}</Link>}</div>
                  : null
              }
                  <div className='h6 text-muted text-left ml-3 mb-4'><span>Published on: </span>  
                  {items.published_date? 
                  <Date dateString={items.published_date} />
                  : items.published_date}</div>
              
              
                
              </>
             
            }
              {/* <Button className="ml-3 mt-4 btn-article-search" id="textComment" >
               Add To Favourite
             </Button> */}


                                           
{
                userAccess?
                  <div id="favbutton">   
                  {
                          this.state.favourite.length === 0  ?
                     <Favourite  article_id={this.props.match.params.id.split('-')[0]}/>
                     :<Favourites  article_id={this.props.match.params.id.split('-')[0]}/>
                  }
                     </div>
                : null
              }


          </div>

           
          {

                userAccess?
                  <>    
                    {
                          this.state.rating.length === 0 ?
                            <span className='h6 mt-3 ml-3'> You Have Not Rated Yet, Please Rate </span>
                            : <p className='h4 mt-3 ml-3'>Your Earlier Rated {this.state.rating } <span className="icon-star-1"></span><br/>Rate Again,</p>
                            
                        }          
                  </>
                : <div className='h5 mt-3 ml-3'>Rate here</div>
              }
                      
                      <div id="docRate" className=" ml-3 ">

                         
         
          </div>




               {/* Review Button (Rating + Comment) */}
               
                              
{/*                               
                                    {
                userAccess?
                  <div id="favbutton">   
                  {
                          this.state.favourite.length === 0  ?
                     <Favourite  article_id={this.props.match.params.id.split('-')[0]}/>
                     :<Favourites  article_id={this.props.match.params.id.split('-')[0]}/>
                  }
                     </div>
                : null
              } */}
              


            
               {/* <h5>Source :  <a href="https://all-cures.com/Editorial" style={{textTransform:"none"}}>https://all-cures.com/editorial/</a></h5> */}
               {/* <h5  className=" ml-3 ">Sources: {items.window_title}</h5> */}

            
       
    
          </Col> 
          
        </Row>
        <div>
         
       
           
         </div>




     
    </div>
    );
  }
  }
}
 

export default Disease;
