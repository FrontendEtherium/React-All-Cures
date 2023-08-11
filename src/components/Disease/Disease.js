 
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
    };
    this.handleShows = this.handleShows.bind(this);
   

  }

  
  handleShow() {
    // this.setState({ modalState: !this.state.modalState })
    if(this.state.url.includes('?whatsapp'))
    {
      return this.setState({
        modelState:false
      })
    } 
    else {
    return setTimeout(() => {
      this.setState({
         modalState: true

      })
   }, 9000);
  } 
    
}

 showModal(){
  // get value from localStorage
  var is_modalState = sessionStorage.getItem('alrState');
  if(is_modalState != 'alredy shown'){
    ("#myModal").show()
    sessionStorage.setItem('alreadyShow','alredy shown');
  }else{
    console.log(is_modalState);
  }
}

handleShows() {
  this.setState({ modalState: !this.state.modalState });
}

showModal() {
  this.setState({ modalState: !this.state.modalState });
}
  fetchBlog = () => {
    var id = this.props.match.params.id.split('-')[0]
    if(/^[0-9]+$/.test (id)){           // Test if URL contains article_id or TITLE
      fetch(`${backendHost}/article/${id}`)       // if URL contains article_id
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        }, 
        () => {
          this.fetchCountriesCures()
          this.regionalPosts()
          this.diseasePosts(this.state.items.dc_name)
          this.comments(this.props.match.params.id.split('-')[0])
          this.getRating(this.props.match.params.id.split('-')[0])
          this.getRate(this.props.match.params.id.split('-')[0])
          this.getFavourite(this.props.match.params.id.split('-')[0])
          document.title = `${this.state.items.title}`
        });
      });
    } else {                                                    // if URL contains title

      fetch(`${backendHost}/article/title/${id}`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        }, 
        () => {
          this.fetchCountriesCures()
          this.regionalPosts()
          this.diseasePosts(this.state.items.dc_name)
          this.comments(this.props.match.params.id.split('-')[0])
          this.getRating(this.props.match.params.id.split('-')[0])
          this.getRate(this.props.match.params.id.split('-')[0])
          this.getFavourite(this.props.match.params.id.split('-')[0])
          document.title = `${this.state.items.title}`
        });
      });
    }
    
  }

  Alert = (msg) => {
    this.setState({
       showAlert:true,
       alertMsg: msg
    })
    setTimeout(() => {
       this.setState({
          showAlert: false
       })
    }, 5000);
  }
 pageLoading = async () => {
    var id = this.props.match.params.id.split('-')[0]
    if(this.state.url.includes('?whatsapp'))
    {
      await axios.post(`${backendHost}/article/${id}/${userId? userId: 0}/jsession/whatsapp`)

    }else{
      await axios.post(`${backendHost}/article/${id}/${userId? userId: 0}/jsession//NA`)

    }
      
    
    }
  componentDidMount(){
   
    const pageLoad = async () => {
      var id = this.props.match.params.id.split('-')[0]
      await axios.post(`${backendHost}/${id}/${userId}`)
      .then(res => {
        console.log(res.data)
         this.setState({
            afterSubmitLoad: false
         })
         
        })
        .catch(err => {   
      })
    } 
  
      pageLoad();
      this.pageLoading();
  }
  postSubscribtion() {
    //  var mobileNumber = this.state.mobile.split('+')
    var phoneNumber = this.state.value.split('+')[1]
    var countryCodeLength = phoneNumber.length % 10
    var countryCode = phoneNumber.slice(0, countryCodeLength)
    var StringValue = phoneNumber.slice(countryCodeLength).replace(/,/g, '')
     if(phoneNumber){
       this.setState({
          afterSubmitLoad: true
       })
      axios.post(`${backendHost}/users/subscribe/${StringValue}`, {
      "nl_subscription_disease_id":this.state.disease.join(','),
      "nl_sub_type": this.state.type.indexOf('1') === -1 ? 0: 1,
      "nl_subscription_cures_id":this.state.cures.join(','),
      "country_code": countryCode,
      })
        .then(res => {
         this.setState({
            afterSubmitLoad: false
         })
         if(res.data === 1){
            this.Alert('You have successfully subscribed to our Newsletter')
         }
         else {
            this.Alert('Some error occured! Please try again later.')
         }
        })
        .catch(err => {
         this.setState({
            afterSubmitLoad: false
         })
         this.Alert('Some error occured! Please try again later.')
         
   
      })
     } else {
        this.Alert('Please enter a valid number!')
     }
  }

  postSubscribtions() {
    var phoneNumber = this.state.value.split('+')[1]
    var countryCodeLength = phoneNumber.length % 10
    var countryCode = phoneNumber.slice(0, countryCodeLength)
    var StringValue = phoneNumber.slice(countryCodeLength).replace(/,/g, '')
     if(phoneNumber){
       this.setState({
          afterSubmitLoad: true
       })
      axios.post(`${backendHost}/users/subscribe/${StringValue}`, {
      "nl_subscription_disease_id": this.state.disease.join(','),
      "nl_sub_type":1,
      "nl_subscription_cures_id":this.state.cures.join(','),
      "country_code": countryCode,
      })
        .then(res => {
         this.setState({
            afterSubmitLoad: false
         })
         if(res.data === 1){
            this.Alert('You have successfully subscribed to our Newsletter')
         }
         else {
            this.Alert('Some error occured! Please try again later.')
         }
        })
        .catch(err => {
         this.setState({
            afterSubmitLoad: false
         })
         this.Alert('Some error occured! Please try again later.')
         
   
      })
     } else {
        this.Alert('Please enter a valid number!')
     }
  }

  fetchCountriesCures = () => {
    fetch(`${backendHost}/isearch/treatmentregions/${this.state.items.disease_condition_id}`)
      .then((res)=> res.json())
      .then((json) => {
        this.setState({
          regions: json
        })
      })
      .catch(err => 
        null
      )
  }

  getRating = (ratingId) => {
    axios.get(`${backendHost}/rating/target/${ratingId}/targettype/2/avg`)
    .then(res => {
      this.setState({
        ratingValue: res.data
      })
    }) 
    .catch(err => null)
  }

  getRate = (articleId) => {
    axios.get(`${backendHost}/rating/target/${articleId}/targettype/2?userid=${userId? userId: 0}`)
      .then(res => {
        this.setState({
          rating: res.data[0].ratingVal
        })
      })
      .catch(err => null)
  }

  getFavourite = (articleid) => {
    axios.get(`${backendHost}/favourite/userid/${userId}/articleid/${articleid}/favourite`)
      .then(res => {
       
        this.setState({
          favourite: res.data[0].status
        })
      })
      .catch(err => null)
  }
  regionalPosts(){
    fetch(`${backendHost}/isearch/treatmentregions/${this.state.items.disease_condition_id}`)       // /isearch/treatmentregions/${this.state.diseaseCondition}
    .then((res) => res.json())
    .then((json) => {
      this.setState({
        regionPostsLoaded: true,
        regionalPost: json,
      });
    })
    .catch(err => 
      null
  )
  }
  comments(article_id) {                        // For all available blogs "/blogs"
    fetch(`${backendHost}/rating/target/${article_id}/targettype/2`)
      .then((res) => res.json())
      .then((json) => {
        var temp = []
        json.forEach(i => {
          if(i.reviewed === 1 && i.comments !== "null"){
            temp.push(i)
          }
        })
        this.setState({
          comment: temp
        })
      })
      .catch(err => 
        null
    )
  }

  showRating = (val) => {
    if(document.getElementById('avg-rating')){
      for(let i=0 ; i<val; i++){
        document.getElementById('avg-rating').children[i].classList.add('checked')  
      }
    }
  }
 
  toggleShowCuresCards = (val) => {
    this.setState({showCuresCards: val})
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
   handleSelect = function(subs) {
    const flavors = [];
    for (let i=0; i<subs.length; i++) {
        flavors.push(subs[i].value);
    }
    this.setState({
      type:flavors
    })
    
}
 getDisease = () => {
    axios.get(`${backendHost}/article/all/table/disease_condition`)
    .then(res => {
        this.setState({
          diseaseList:res.data
        })
       
    })
    .catch(err => null)
}

//  pageLoad = async () => {
//   await axios.post(`${backendHost}/{article_id}/{userId}`)
//   .then(res => {
//      this.setState({
//         afterSubmitLoad: false
//      })
     
//     })
//     .catch(err => {   
//   })
// }
// pageLoad();

diseasePosts(dcName) {                     // For specific blogs like "/blogs/diabetes"
  fetch(`${backendHost}/isearch/${dcName}`)
  .then((res) => res.json())
  .then((json) => {
    // setLoaded(true)
    var temp= []
    json.forEach(i => {
      if(i.pubstatus_id === 3){
        temp.push(i)
      }
    });
    this.setState({
      carouselItems: temp
    })
  })
  .catch(err => null)
}

  componentDidMount() {
  
    window.scrollTo(0, 0);
    this.fetchBlog()
    this.handleShow()
    console.log ('url',window.location.href)
    
    
    this.getDisease()
    this.pageLoading()
   
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = window.location.href;
    document.head.appendChild(canonicalLink);

    console.log('Canonical link:', canonicalLink);


    return () => {
      document.head.removeChild(canonicalLink);
    };
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
    var { isLoaded, items, carouselItems,text } = this.state;
    
    
    if(!isLoaded) {
    return (
      <>
      <Header history={this.props.history}/>
        <Container className="my-5 loading">
          <div className="loader">
            <img src={Heart} alt="All Cures Logo" id="heart"/>
          </div>
        </Container>
      <Footer/>
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
    return (
    <div>

<div>
             {
                this.state.afterSubmitLoad &&
                <div className="loader main on-submit-loading">
                  <img src={Heart} alt="All Cures Logo" id="heart"/>
                </div>
            }
             {
                this.state.showAlert &&
                    <div className="alert alert-success pop-up border-bottom">
                        <div className="h5 mb-0 text-center">{this.state.alertMsg}</div>
                        <div className="timer"></div>
                    </div>
            }
        
           
         </div>
      <Header history={this.props.history}/>
        <HelmetMetaData 
          title={items.title} 
          description={b[0].data.text} 
          keywords = {items.keywords}
          image={`${imagePath}`+ items.content_location.replace('json', 'png').split('/webapps/')[1]}>
        </HelmetMetaData>
        <div className="ad-spac">
        <button className="btn" data-toggle="modal"data-target=".bd-example-modal-lg">
          <img src={AyurvedaAd} alt="advertisment"/>
     
            </button>
        </div>
        <Row>
          <div className='left-menu pb-3'>  
            <div id="sidebar-wrapper">
          {
            this.state.regionalPost.length !== 0 &&
              <Sidebar diseaseId={items.disease_condition_id} 
              id={this.props.match.params.id} 
              regionalPosts={this.state.regionPostsLoaded? this.state.regionalPost: null}
              name={items.dc_name} 
              />
          }    
            </div>
            <button className="btn pl-4 mt-2 " id="left-menu-ad" data-toggle="modal"data-target=".bd-example-modal-lg">
              <img className="pl-4" src={PersianAd} alt="ad"/>
            </button>
          </div>
          
          <Col  md={7} id="page-content-wrapper" className="col-xs-12 pb-5">
            <div id="center-well" className="">
              <Breadcrumb >
                   
                <Breadcrumb.Item className='mt-1 pb-2' href="/"id="s1">Home</Breadcrumb.Item>                                     
                <Breadcrumb.Item className='mt-1'id="s1">
                  <Link to={`/searchcures/${items.dc_name}`}>
                    {items.dc_name}
                  </Link>
                  
                </Breadcrumb.Item>
                <Breadcrumb.Item className='mt-1'id="s1">
                  {
                    items.type.includes(1) && !this.props.match.params.cureType?
                    <Link to="#">Overview</Link>: <Link to="#">Cures</Link>
                  }
                  
                </Breadcrumb.Item>
                
                <div id="share-icons-regions">
                {/* Sharing icons */}
                <div id="socilaBtn">
                <FacebookShareButton
                  url={encodeURI(`https://all-cures.com${this.props.location.pathname}`)}
                  quote={`All-Cures - ${items.title}`}
                  hashtag={`#allCures#${items.title}`}
                  className="socialMediaButton"
                >
                  <FacebookIcon size={36} />
                </FacebookShareButton>
                <TwitterShareButton
                  url={encodeURI(`https://all-cures.com${this.props.location.pathname}`)}
                  title={`All-Cures - ${items.title}`}
                  hashtag={`#allCures#${items.title}`}
                  className="socialMediaButton"
                >
                  <TwitterIcon size={36} />
                </TwitterShareButton>
                <WhatsappShareButton
                  url={encodeURI(`https://all-cures.com${this.props.location.pathname}`)}
                  title={`*All Cures -* ${items.title}`}
                  separator=": "
                  className="socialMediaButton"
                >
                  <WhatsappIcon size={36} />
                </WhatsappShareButton>
              </div>
              
              <div className="share-buttons-region ml-2" id="filter">
              
              <div className="d-flex justify-content-end margin-auto" id="article-acc-to-regions">
                
              { finalRegions?
                  finalRegions.map(i => i.countryname!== null && (
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
                </div>
                </div>
                </div>
              </Breadcrumb>
              
              {
                this.props.match.params.cureType?
                null
                : <div className="articles-carousel" id="articles-carousel">
                {
                  carouselItems.length !== 0?
                  <OwlCarousel nav="true" items={4} margin={10} autoPlay="true" {...options} >
                    {
                      carouselItems.map((i) => {
                        var content = []
                        var imgLocation = i.content_location
                        var imageLoc = '';
                        if(i.content){
                            content = this.IsJsonValid(decodeURIComponent(i.content))
                        }
                        if(imgLocation && imgLocation.includes('cures_articleimages')){
                            imageLoc = `https://all-cures.com:444/`+imgLocation.replace('json', 'png').split('/webapps/')[1]
                        } else {
                            imageLoc = 'https://all-cures.com:444/cures_articleimages//299/default.png'
                        }var id = this.props.match.params.id.split('-')[0]
                        return(
                          
                          i.article_id!=id?
                        <PreviewTab 
                          key={i.article_id.toString()}
                          id={i.article_id} 
                          title={i.title} 
                          windowTitle={i.window_title}  
                          content = {content}
                          imageLoc={imageLoc}
                        />:null
                      )})
                    }
                  
                  
                </OwlCarousel>
                : null
                }
              
              </div>
              }
              
            {
              this.props.match.params.cureType?
                <CarouselPreview type="cures" dcName={`${items.dc_name}`}/>
                : <>
                   <div className="article-title-container">
              <div className="h3 font-weight-bold text-decoration-underline">{items.title}</div>
             
             
              
              {/* Show average rating */}
              {/* <div id="rate">
            
             <a href='#docRate'>Click To Rate Here</a></div> */}
            {/* <Dropdown>
                      <Dropdown.Toggle className="mr-220 btn btn-info color-white">
                       < a href='#docRate'className="color-white" >Click Here To Rate</a>
                      </Dropdown.Toggle>
                   
                    </Dropdown> */}
              {
                this.state.ratingValue?
                <div className="average-rating mb-4 ml-3 mt-2" id="avg-rating">
                <span class="fa fa-star opacity-7"></span>
                <span class="fa fa-star opacity-7"></span>
                <span class="fa fa-star opacity-7"></span>
                <span class="fa fa-star opacity-7"></span>
                <span class="fa fa-star opacity-7"></span>
                </div>
                : null
              }
               
               {/* Call average rating fetch function */}
              {
                this.state.ratingValue? this.showRating(this.state.ratingValue) : null
              }
            
            </div>

            {/* Center Well article main content */}
              <div id="article-main-content">
                {b.map((i, idx) => (
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
                    imageUrl = {i.data.file? i.data.file.url: null}
                    link = {i.data.link}
                    url = {i.data.url}
                    item = {i.data.items}
                    props = {this.props}
                  />
                ))}
              </div>
              <hr/>
              {/* Author */}
              {
                items.authors_name?
                  <div className='h5 text-left ml-3 mb-2'><span>Author:</span> {items.authored_by.includes(7)? items.authors_name: <Link to={`/profile/${items.reg_doc_pat_id}`}> {items.authors_name}</Link>}</div>
                  : null
              }
                  <div className='h6 text-muted text-left ml-3 mb-4'><>Published on:</> 
                  {items.published_date? 
                  <Date dateString={items.published_date} />
                  : items.published_date}</div>
              
              
                
              </>
             
            }
              {/* <Button className="ml-3 mt-4 btn-article-search" id="textComment" >
               Add To Favourite
             </Button> */}

          </div>

           
          {

                userAccess?
                  <>    
                    {
                          this.state.rating.length === 0 ?
                            <span className='h6 mt-3'> You Have Not Rated Yet, Please Rate </span>
                            : <p className='h4 mt-3'>Your Earlier Rated {this.state.rating } <span className="icon-star-1"></span><br/>Rate Again,</p>
                            
                        }          
                  </>
                : <div className='h4 mt-3'>Rate here</div>
              }
                      
                      <span id="docRate">
          <ArticleRating article_id={this.props.match.params.id.split('-')[0]} />
          </span>




               {/* Review Button (Rating + Comment) */}
               {
                userAccess?
                  <>              
                    <ArticleComment refreshComments={this.comments} article_id={this.props.match.params.id.split('-')[0]}/>
                  </>
                : null
              }
                                    {
                userAccess?
                  <>   
                  {
                          this.state.favourite.length === 0  ?
                     <Favourite  article_id={this.props.match.params.id.split('-')[0]}/>
                     :<Favourites  article_id={this.props.match.params.id.split('-')[0]}/>
                  }
                     </>
                : null
              }

               <h4>Source :  <a href="https://all-cures.com/Editorial">https://all-cures.com/Editorial</a></h4>
             
            <div id="comments-column">              

              {/* SHOW ALL COMMENTS */}
              <div className="main-hero">
                {!this.state.showMore?
                this.state.comment.slice(0, 1).map((item,i) => (
                  this.showComments(item, i)
                )):
                this.state.comment.map((item,i) => (
                  this.showComments(item, i)
                ))
                }
            </div>
            {
              this.state.comment?
                this.state.comment.length > 1 &&
                  <button id="show-hide-comments" className="white-button-shadow btn w-75 mb-4 ml-3" 
                    onClick={() => {
                      this.state.showMore?
                      this.setState({
                      showMore: false
                      }): 
                      this.setState({
                        showMore: true
                        })
                    }}>
                      {
                        !this.state.showMore?
                        'Show more'
                        : 'Hide'
                      }
                  </button>
                : null
            }
            </div>
          </Col> 
          <Col id="right-sidebar-wrapper">      
            <SidebarRight title={items.title} history={this.props.history} dcName={items.dc_name} id={items.article_id}/>
          </Col>
        </Row>
        <div>
         
         <button id="mobile-subscribe-fixed-btn" className="btn newsletter-icon rounded subscribe-btn newsletter_float" data-toggle="modal"data-target=".bd-example-modal-lg">
      Subscribe
     
            </button>
            <Link  to="/feedback">
            <button id="mobile-feedback-fixed-btn" className="btn newsletter-icon rounded subscribe-btn newsletter_float">
      Feedback
     
            </button>
            </Link>
           
         </div>
<div className="modal fade bd-example-modal-lg" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
    <div className="modal-header">
        
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    <section className="appStore" >
         <div className="container">
            <div className="row">
               <div className="appStoreBg clearfix" style={{display:"flex",width: "100%",flexWrap: 'wrap'}}>
                  <div className="col-md-6 col-sm-6 col-sx-12">
                     <div className="innerapp">
                        <div className="doc-img">
                           {/* <img src={Doct} alt="doct"/> */}
                           <div className="aaa">
                             <div className='container'>
                    <h3 className="text-dark">Subscribe Your Disease/Cures Type</h3></div><br/>
                    <select 
                    multiple
               
                    name="type" placeholder="Type" 
                    value={this.state.type} 
                    
                    onChange={(e)=> {
                       this.handleSelect(e.target.selectedOptions)
                    }}
                    required className="form-control">
                        <option value="1">All</option>
                        <option value="2">Disease</option>
                        <option value="3">Cures</option>
                    </select>
                </div>
                {   
                    this.state.type?
                    this.state.type.indexOf('2') === -1 
                    ? null 
                    :                             <div className="col-lg-6 form-group">
                    <label htmlFor="">Disease</label>
                        <Select multiple
                        value={this.state.disease}
                        onChange={(e) =>  this.setState({
                          disease:e.target.value
                        })
                          }
                        input={<Input id="select-multiple-chip" />}
                        className="form-control">
                        {this.state.diseaseList.map((lan) => {
                            return (
                                <MenuItem key={lan[0].toString()} value={lan[0]} >
                                    {lan[1]}
                                </MenuItem>
                            )
                        })}
                        </Select>
                </div>
                    : null
                } 
                {   
                    this.state.type?
                   this.state.type.indexOf('3') === -1 
                    ? null 
                    :  <div className="col-lg-6 form-group">
                    <label htmlFor="">Cure</label>
                        <Select multiple
                        value={this.state.cures}
                        onChange={(e) =>  this.setState({
                          cures:e.target.value
                        })}
                        input={<Input id="select-multiple-chip" />}
                        className="form-control">
                        {this.state.diseaseList.map((lan) => {

                            return (
                                <MenuItem key={lan[0].toString()} value={lan[0]} >
                                    {lan[1]}
                                </MenuItem>
                            )
                        })}
                        </Select>
                </div>
                    : null
                } 
                        </div>
                       
                     </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-sx-12 bg-white subs-hero-2">
                     <div className="subscribe">                    
                        <h1 className="text-dark">All Cures</h1>
                        <div className="h5">Sign up for our free <span>Disease/Cures</span> Weekly Newsletter</div><br/>
                        <div className="h5">Get <span>doctor-approved</span> health tips, news, and more</div>
                        <div className="form-group relative">
                           <div className="aaa">
                           <PhoneInput
                            placeholder="Enter phone number"
                            value={this.state.value}
                            defaultCountry='IN'
                          
                            onChange={(newValue) => {
                              this.setState({
                                value: newValue
                              })
                            }}
                            />
                              
                           </div>
                           <div>
                                <button className="bcolor rounded py-2" onClick={( ) => {this.postSubscribtion()}}>
                                   Submit
                                </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
        
      </section>
    </div>
  </div>
</div>



<div className={"modal fade" + (this.state.modalState ? " show d-block" : " d-none")} tabIndex="-1" role="dialog">

  <div className="modal-dialog modal-lg">
    <div className="modal-content">
    <div className="modal-header">
        
        {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleShows}>
          <span aria-hidden="true">&times;</span>
        </button> */}
          <button type="button" className="close" onClick={this.handleShows}>
                                    <span>&times;</span>
                                </button>
      </div>
    <section className="appStore" >
         <div className="container">
            <div className="row">
               <div className="appStoreBg clearfix" style={{display:"flex",width: "100%",flexWrap: 'wrap'}}>
                  <div className="col-md-6 col-sm-6 col-sx-12">
                     <div className="innerapp">
                        <div className="doc-img">
                           <img src={Doct} alt="doct"/>
                        </div>
                       
                     </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-sx-12 bg-white subs-hero-2">
                     <div className="subscribe">                    
                        <h1 className="text-dark">All Cures</h1>
                        <div className="h5">Sign up for our free <span>All Cures</span> Daily Newsletter</div><br/>
                        <div className="h5">Get <span>doctor-approved</span> health tips, news, and more</div>
                        <div className="form-group relative">
                           <div className="aaa">
                              <PhoneInput
                                 placeholder="Enter phone number"
                                 value={this.state.value}
                                 defaultCountry='IN'
                              
                                 onChange={(newValue) => {
                                    this.setState({
                                       value: newValue
                                    })
                                 }}
                              />                              
                           </div>
                           <div>
                              <button className="bcolor rounded py-2" onClick={( ) => {this.postSubscribtion()}}>
                                 Submit
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
        
      </section>
    </div>
  </div>
</div>

      <Footer/>
    </div>
    );
  }
  }
}
 

export default Disease;
