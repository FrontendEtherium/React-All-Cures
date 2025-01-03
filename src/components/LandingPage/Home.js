import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Heart from"../../assets/img/heart.png";
import Doct from "../../assets/img/doct.png";
import { imgKitImagePath } from '../../image-path';



import axios from 'axios';
import { Navbar} from "react-bootstrap"
import { Nav,NavDropdown,Container} from "react-bootstrap"
import '../../assets/healthcare/css/main.css';
import '../../assets/healthcare/css/responsive.css';
import '../../assets/healthcare/css/animate.css';
import '../../assets/healthcare/icomoon/style.css';
import './custom.css';
import Carousel1 from './Caousel1';
import Carousel2 from './Carousel2';
// import CarouselReview from './CarouselReview';
import { Dropdown } from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';

import 'react-phone-number-input/style.css';
import './Home.css'

// ICONS
import Account from '../../assets/icon/icons-AllCures/account_circle_black_48dp.svg'
import CreateCures from '../../assets/icon/icons-AllCures/edit_black_48dp.svg'
import List from '../../assets/icon/icons-AllCures/list_black_48dp.svg'

import { backendHost } from '../../api-config';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Test from './test'
import { env } from 'process';
import { userId } from '../UserId'
import { userAccess } from '../UserAccess'
import ArticlePreview from './ArticlePreview'
import TrendingArticles from './TrendingArticles';
import FeaturedArticles from './FeaturedArticles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import headers from '../../api-fetch';
import Banner from "../../assets/img/Banner_New.svg"
import DocPatient from "../../assets/img/DocPatient.jpeg"

env.REACT_APP = 'http://117.241.171.115:8080/cures';

class Home extends Component {
   constructor(props){
      super(props);
      const params = props.match.params
      this.state = {


         images:[],
      currentIndex: 0,
         isUnaniDropdownOpen: false,
         afterSubmitLoad: false,
         showAlert: false,
         alertMsg: '',
         articleFilter: '',
         article: '',
         users: [],
         city: '',
         name: '',
         value:'',
         texts: '',
         cityList: [],
         pinList: [],
         suggestions: [],
         suggestionsDoc: [],
         doctor : [],
         diseaseTitle: [],
         mobile: '',
         getPincode:null,
         getCityName:null,
         edit: false,
         doctorLoaded: false,
         modalShow: this.props.location.state? this.props.location.state.modalShow: false,
         path: this.props.location.state? this.props.location.state.path: '',
         show: false,
         docname : '',
         spec1: [],
         param: params,
         cures:[],
         disease:[],
         setVisible: false,
         searchParams: {
            city: '',
            Pincode: '',
            name: '',
            subscription: '',  
         },
         ads:'',
         adId:'',
         showDocModal: false,
        
        
    };      
  }
  
 
 
 componentDidMount(){
  
    if(userId){
       this.setState({modalShow: false})
    }

     this.loadFloater();
   const loadUsers = async () => {
      
      await axios.get(`${backendHost}/city/all`)
      .then(res => {
         this.setState ({
            users: res.data
         })
         this.state.users.map((u) => (
            this.state.cityList.push(u.Cityname, u.Pincode)
         ))
      })
      .catch(res => null)
    }
    loadUsers();



   const loaddoctor = async () => {
      await axios.get(`${backendHost}/IntegratedActionController`)
      .then(res => {
         this.setState ({
            doctor: res.data,
            doctorLoaded: true
         })
      })
      .catch(res =>  null)
    }
    loaddoctor();

    Promise.all([
      fetch(`${backendHost}/article/all/table/disease_condition`,{
         headers: headers
      })
      .then(res => res.json()),
    ]).then(([diseaseData]) => {
      this.setState({
          isLoaded: true,
          speciality: diseaseData,
      });

    }).then(() => {
      this.state.speciality.map((i) => (
        this.state.spec1.push(i[3])
      ))
    })
    .catch(res => 
       null
    )


  
    window.onload = () => {

    this.fetchData();
    }
  setTimeout(() => {
        this.setState({ showDocModal: true });
      }, 5000);
    
    
   }

       
   
    loadFloater = async() => {
      // console.log("checkgin the api 123");
         // console.log('call floater')
    await  axios.get(`${backendHost}/data/newsletter/get`)
     .then(res => {
      //   console.log(res.data)
        this.setState ({
          images:res.data
        })
     })
     .catch(res =>  null)
   // console.log("1232121 testing");
   };
  
   floaterInterval = null;
   floaterShow=()=>{
      this.floaterInterval =  setInterval(this.rotateImages, 3000);
   }
  
  handleModalClose = () => {
      if (this.floaterInterval) {
        clearInterval(this.floaterInterval);
      }
    };
   
   
   rotateImages = () => {
      this.setState((prevState) => ({
        currentIndex: (prevState.currentIndex + 1) % this.state.images.length,
      }));
    };



 

 componentDidUpdate(prevProps, prevState){
   if(prevState.article !== this.state.article && this.state.article){
      axios.get(`${backendHost}/isearch/combo/${this.state.article}`)
      .then(res => {
         this.setState({
            diseaseTitle: res.data
         })
      })
   }
 }

 diseasePosts(){                   // For specific cures like "/cures/diabetes"
   // console.log('not delayed')
   fetch(`${backendHost}/isearch/${this.state.param.type}`)
     .then((res) => res.json())
     .then((json) => {
       this.setState({
         isLoaded: true,
         items: json,
       });
     })
     .catch(err => 
      null
      )
 }

 fetchData = async () => {
   try {
     const response = await axios.get(`${backendHost}/sponsored/list/ads/url/1`);
   //   console.log("response API call successful",response); // Check if this log is printed
        

     if(response.data!= 'All Ads are Served'){
      const id=response.data.split('/')[3]
      const ids=id.match(/\d+/)
       const adsId=ids[0]

      // console.log(adsId)
      //    console.log(id)

         this.setState({
           adId:adsId
         });

      }

    const newResponse=`https://uat.all-cures.com:444${response.data}`
   //  console.log(newResponse)
     this.setState({
      //  ads: response.data,
          ads: newResponse,
          
     });
   } catch (error) {
     this.setState({
       error: error.message,
     });
   }
 };
        

    handleClick = (ad) => {
  
      console.log('Image clicked!',ad);
      axios.put(`${backendHost}/sponsored/ads/clicks/${ad}`)
    }
         

   
     postSubscribtion() {
        var phoneNumber = this.state.value.split('+')[1];
      //   console.log(this.state.value);
        var countryCodeLength = phoneNumber.length % 10;
        var countryCode = phoneNumber.slice(0, countryCodeLength);
        var StringValue = phoneNumber.slice(countryCodeLength).replace(/,/g, '');
      //   console.log(isValidPhoneNumber(this.state.value));
      
        if (!isValidPhoneNumber(this.state.value)) {
          this.Alert('Please enter a 10-digit phone number!');
          return; // Exit the function if the phone number is not 10 digits
        }
        
        this.setState({
          afterSubmitLoad: true
        });
        
        axios
          .post(`${backendHost}/users/subscribe/${StringValue}`, {
            nl_subscription_disease_id: this.state.disease.join(','),
            nl_sub_type: 1,
            nl_subscription_cures_id: this.state.cures.join(','),
            country_code: countryCode,
          })
          .then((res) => {
            this.setState({
              afterSubmitLoad: false
            });
      
            if (res.data === 'Subscribed') {
              this.Alert('You have successfully subscribed to our Newsletter');
            } else if (res.data === 'Already subscribed') { // Add a check for 'already_subscribed' response
              this.Alert('You are already subscribed to our Newsletter');
            } else {
              this.Alert('Some error occurred! Please try again later.');
            }
          })
          .catch((err) => {
            this.setState({
              afterSubmitLoad: false
            });
            this.Alert('Some error occurred! Please try again later.');
          });
      }
  handleChange = e => 
        this.setState({
            searchParams: { ...this.state.searchParams, [e.target.name]: e.target.value }
        });

   logout = async e => {
      fetch(`${backendHost}/LogoutActionController`, {
         method: "POST",
         credentials: "include",headers: {'Access-Control-Allow-Credentials': true}
      })
    
       .then(res => {
            Cookies.remove('uName')
            setTimeout(() => {
               window.location.reload()
            }, 500);
         // }
      }).catch(res => 
         null
      )
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
   setModalShow =(action) => {
      this.setState({
        modalShow: action
      })
    }
    setMobile= e => {
       this.setState({
         mobile: e.target.value
       })
    }
    setCountryCode= e => {
       this.setState({
         mobile: e.target.value
       })
    }


    handleUnaniMouseEnter = () => {
      this.setState({ isUnaniDropdownOpen: true });
    };
  
    handleUnaniMouseLeave = () => {
      this.setState({ isUnaniDropdownOpen: false });
    };

   onSearch = (e) => {
      var { city, name } = this.state
      e.preventDefault()
      if(city && name){
         this.props.history.push(`/search/${city}/${name}`)
      } else if(city){
         this.props.history.push(`/search/${city}`)
      } else if(name) {
         this.props.history.push(`/searchName/${name}`)
      }
   }

   articleSearch = (e) => {
      e.preventDefault()
      if(this.state.article){
         this.props.history.push(`/searchcures/${this.state.article}`)
      } else {
         this.props.history.push(`/searchcures`)
      }
   }
   
   render() {
      return(
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
            <div className="profilePage">
            <div className="">
               <section className=" zIndex-2" >
                   <div   className="webAlign" >
                     <div className="row d-flex">
                        <div className="header" style={{width:"100%"}}>
                           <div className=" logo mt-3 ml-4" > 
                              <Link to='/'>
                                <img src={`${imgKitImagePath}/tr:w-300,f-webp/assets/img/heart.png`} alt="All Cures Logo"/>
                                <span>All Cures</span>
                              </Link>
                           </div>
                          
                  <div class="fgrow">
               
                  <nav class="navbar navbar-expand-lg navbar-light bg-light newHeader">
                              
                              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                                  </button>
                                  <div class="collapse navbar-collapse" id="navbarNavDropdown">
     <ul class="navbar-nav">
        <li class="nav-item">
         <Link className="nav-link" to="/">Home</Link>
       </li>
       <li class="nav-item dropdown">
         <Link class="nav-link dropdown-toggle" to="#" id="categoriesDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Categories</Link>
         <div class="dropdown-menu" aria-labelledby="categoriesDropdown">
           <Link class="dropdown-item" to="/searchcategory/disease/1">Arthritis</Link>
           <Link class="dropdown-item" to="/searchcategory/disease/74">Diabetes</Link>
           <Link class="dropdown-item" to="/searchcategory/disease/50">Hypertension</Link>
           <div class="dropdown-divider"></div>
           <Link class="dropdown-item" to="/allcategory">View More</Link>
         </div>
       </li>
       <li class="nav-item dropdown ">
         <Link class="nav-link dropdown-toggle" to="#" id="trendingCuresDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Trending Cures</Link>
         <div class="dropdown-menu" aria-labelledby="trendingCuresDropdown">
           <Link class="dropdown-item" to="/searchmedicine/medicinetype/1">Ayurveda</Link>
           <Link class="dropdown-item" to="/searchmedicine/medicinetype/4">Chinese Medicine</Link>
           <Link class="dropdown-item" to="/searchmedicine/medicinetype/12" onMouseEnter={this.handleUnaniMouseEnter} onMouseLeave={this.handleUnaniMouseLeave}>Arabic
   
                  <li className="nav-item dropdown newDropdown" onMouseEnter={this.handleUnaniMouseEnter} onMouseLeave={this.handleUnaniMouseLeave}>
             <Link className="nav-link dropdown-toggle" to="#" id="unaniDropdownToggle" role="button" data-bs-toggle="dropdown">
            <span style={{fontSize:"1rem",color:" #212529"}}>  <ArrowDropDownIcon/></span>  
             </Link>
             {this.state.isUnaniDropdownOpen && (
               <ul className="dropdown-menu newDropdown-menu" aria-labelledby="unaniDropdownToggle">
                 <li>
                   <Link className="dropdown-item" to="/searchmedicine/medicinetype/2"> Unani</Link>
                 </li>
                 <li>
                   <Link className="dropdown-item" to="/searchmedicine/medicinetype/3">Persian</Link>
                 </li>
               </ul>
             )}
           </li>
           </Link>
           <Link class="dropdown-item" to="/searchmedicine/medicinetype/6">Japanese</Link>
           <Link class="dropdown-item" to="/searchmedicine/medicinetype/5">Scandinavian</Link>
         </div>
       </li>
       <li class="nav-item">
         <Link class="nav-link" to="/AboutUs">About Us</Link>
       </li>
               <li className="nav-item">
         <Link className="nav-link" to="/webstories">Webstories</Link>
       </li>
     </ul>
     </div>
   </nav>
</div>
                           <form onSubmit={(e) => this.articleSearch(e)} className="searchHeader" id="searchArticle">
                              <div className="col-md-12 row">
                                 <div className="col-md-10 p-0">    
                                    <Autocomplete className="bg-white color-black"
                                       freeSolo
                                       value={this.state.article}
                                       onChange={(event, newValue) => {
                                          this.setState({
                                             article: newValue
                                          })
                                       }}
                                       inputValue={this.state.article ? this.state.article : ''}
                                       onInputChange={(event, newInputValue) => {
                                          this.setState({
                                             article: newInputValue
                                          })
                                       }}
                                       id="combo-box-demo"
                                       options={this.state.article?
                                          this.state.article.length >=1 ? 
                                          this.state.diseaseTitle 
                                          : [] 
                                       : []}
                                       sx={{ width: 170}}
                                       renderInput={(params) => <TextField {...params} label="Search Cures" />}
                                    />
                                 </div>
                                 <div className="col-md-2 p-0 mainBtn">
                                    <button className="btn search-main-btns color-white" id="searchHead"type="submit">
                                       <i className="fas header-search fa-search" id="iconSearch"></i>
                                    </button>
                                 </div>
                              </div>
                           </form>

                           <div className="loginSign d-flex">
                           {
                              userAccess?
                              <Link className="btn mr-2 primary-btn-color loginSignbtn color-blue-dark" id="Article" to="/article">
                              <img src={`${imgKitImagePath}/tr:w-300,f-webp/assets/img/edit_black_48dp.svg`} alt="create cures" className='filter-white' height="30px"/>
                            </Link>
                              : <button 
                              className="btn mr-2 primary-btn-color loginSignbtn color-blue-dark" id="Article" 
                              onClick={() => this.setModalShow(true)}
                            >
                              <img src={`${imgKitImagePath}/tr:w-300,f-webp/assets/img/edit_black_48dp.svg`} alt="create cures" className='filter-white' height="30px"/>
                            </button>
                           }   
                           <ToggleButton 
                              userName={Cookies.get('uName')} 
                              setModalShow={this.setModalShow} 
                              userAccess={userAccess} 
                              logout={this.logout}
                           /> 
                           </div>   	
                        </div>
                    </div>
                    </div>
                </section>
              
            </div>
        </div>
               <section className="banner">
                  <div className='banner-title h1 d-flex justify-content-center align-items-center'>
                     <h1 className='color-white font-weight-bold 'id="head1">All Cures</h1>
                     <div className='h2 color-white text-center' id="head1">Getting You Closer To Cures From Around The World</div>
                  </div>
               </section>
               
               <section className="megaSearch">
                  
                  <div className="container">
                  
                     <div className="row">
                     <Test
                        show={this.state.modalShow}
                        path={this.state.path}
                        onHide={() => this.setModalShow(false)}
                     />
                        <div className="search-wrap-inner clearfix">
                        <form onSubmit={(e) => this.onSearch(e)} className="mainSearch" >
                     	  {/* <div className="col-md-6 pd-0 col-sx-12 col-sm-4">
                   			<div className="form-group search"> */}
                            <div className="col-md-12 p-0">
                            <div className="row">
                            <div className="doc-name col-md-6 col-sm-12"id="homeDoc">
                            <Autocomplete className="bg-white color-black"
                              freeSolo
                              value={this.state.name}
                              onChange={(event, newValue) => {
                                 this.setState({
                                    name: newValue
                                 })
                              }}
                              inputValue={this.state.name ? this.state.name : ''}
                              onInputChange={(event, newInputValue) => {
                                 this.setState({
                                    name: newInputValue
                                 })
                              }}
                              id="combo-box-demo-1"
                              options={
                                 this.state.doctorLoaded ?
                                    this.state.name?
                                    this.state.name.length >= 1? 
                                       this.state.doctor.map.Doctorname.myArrayList
                                       : []
                                    : []
                                    :[]
                              }
                              renderInput={(params) => <TextField {...params} label="Search Doctors (Name)" />}
                           />
                            </div>
                            
                                 {/* </div>
                              </div> */}
                              {/* <div className="col-md-5 pd-0 col-sx-12 col-sm-4">
                                 <div className="form-group city zipcode"> */}
                                 <div className="city-name col-md-5" id="homeCity">
                                 <Autocomplete className="bg-white p-0 color-black"
                              freeSolo
                              value={this.state.city}
                              onChange={(event, newValue) => {
                                 this.setState({
                                    city: newValue
                                 })
                              }}
                              inputValue={this.state.city ? this.state.city : ''}
                              onInputChange={(event, newInputValue) => {
                                 this.setState({
                                    city: newInputValue
                                 })
                              }}
                              id="combo-box-demo-2"
                              options={this.state.city?
                                 this.state.city.length >= 1?
                                 this.state.cityList 
                                 : []
                                 :[]
                              }
                              renderInput={(params) => <TextField {...params} label="Search Doctors (City or Pin)" />}
                           />
                                 </div>
                                 
                                 <div className="mainBtn col-md-1">
                           <button type="submit" className=" btn btn-article-search color-white float-right" id="btnDoc">
                                 <i className="fas fa-search"></i>
                              </button>
                              </div>
                              </div>
                              </div>
              			  <input type="hidden" name="Latitude" id="Latitude"  className="form-control"/>
    	 
                       	 <input type="hidden" name="Longitude" id="Longitude"  className="form-control"/>
                       	                                                 
                        </form>
                        </div>
                     </div>   
                  </div>
               </section>

             <div className="d-flex justify-content-center mb-3 mt-5 desktopBanner">
      <Link to="/docPatientConnect">
      <img src={Banner}  className=" img-fluid"alt="img"/>
      </Link>
    </div> 
                                 
      <section className="tabslider clerfix">
          <div className="container">
            <div className="row">
                <div className="tab-nav">
                  <div className="comman-heading"  itemscope itemtype="http://all-cures.com/Product">
                     <h1 style={{display:'none'}}>All Cures is a product developed, managed and owned by 
                        Etherium Technologies. Our mission is to make it simple and convenient for users to get information on Cures from anywhere in the world. 
                        Our belief is that your wellness is your well-being. 
                        We are passionate about giving our users the unique 
                        experience that is both fulfilling and wholesome.</h1>
                        <h2  style={{display:'none'}}>Ayurveda, Homeopathy, Chinese Medicine, Persian, Unani</h2>
                     <div className="h4 mt-4" itemprop="Category">Choose by Diseases</div>
                  </div>
                
               </div>
                  <Carousel1 city={this.state.searchParams.city}/>
          </div>
        </div>
      </section> 

      
    
                  
      <section className="mb-5 mt-2">
      <div className="container">
            <div className="row">
               <div className="comman-heading">
                  <div className="h4">Featured Cures</div>
               </div>
            </div>
            <div className="row">
         <FeaturedArticles/>
         </div>
           
         </div>
      </section>




{
                           
                           this.state.ads?
                           this.state.ads!=="https://uat.all-cures.com:444All Ads are Served"?
                           <div className="container d-flex justify-content-center">
                           <img className=" mb-5 ml-1" id="left-menu-ad" src={this.state.ads} alt="ad"
                            onClick={() => this.handleClick(this.state.adId)}
                           /> </div>:
                           null:null
                         
                     
                        } 

              

      <section className="mb-5 mt-2">
      <div className="container" id='trends'>
            <div className="row">
               <div className="comman-heading">
                  <div className="h4">Trending Cures</div>
               </div>
            </div>
            <div className="row">
         <TrendingArticles/>
         </div>
           
         </div>
      </section>




      <section className="trending-section">
      
         <ArticlePreview articleFilter = {this.state.articleFilter}/>
         
      </section>

      

      <section className="specialists mt-3">
         <div className="container">
            <div className="row">
               <div className="comman-heading">
               <div className="h4 mt-4">Choose by Doctors</div>
               </div>
            </div>
            <div className="row">
            <div className='nav-btn prev-slide'></div><div className='nav-btn next-slide'></div>
               <Carousel2/>
            </div>
           
         </div>
      </section>
      

     
      <div>
         
         <button id="mobile-subscribe-fixed-btn" className="btn newsletter-icon rounded subscribe-btn newsletter_float" data-toggle="modal"data-target=".bd-example-modal-lg"
         onClick={this.floaterShow}>
      Subscribe
     
            </button>
            <Link  to="/feedback">
            <button id="mobile-feedback-fixed-btn" className="btn newsletter-icon rounded subscribe-btn newsletter_float">
      Feedback
     
            </button>
            </Link>
           
         </div>
<div className="modal fade bd-example-modal-lg mt-5" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
    <div className="modal-header">
        
        <button type="button"  onClick={this.handleModalClose}className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    <section className="appStore" >
         <div className="container">
            <div className="row">
               <div className="appStoreBg clearfix" style={{display:"flex",width: "100%",flexWrap: 'wrap'}}>
                  <div className="col-md-6 col-sm-6 col-sx-12">
                     <div className="innerapp">
                        <div className="doc-img ">

                           {this.state.images?(
                         
                            <img src={`https://ik.imagekit.io/qi0xxmh2w/productimages/tr:w-300,f-webp${this.state.images[this.state.currentIndex]}`} alt="doct"  style={{maxHeight:"400px",width:"405px"}}/>)
                          :  <img src={`${imgKitImagePath}/tr:w-300,f-webp/assets/img/doct.png`} alt="doctor"  style={{maxHeight:"400px",width:"397px"}}/> 
                          
                          
                          }


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

<div className=" mobileBanner">

<div
  className={`modal fade ${this.state.showDocModal ? 'show' : ''}`}
  tabIndex="-1"
  style={{ display: this.state.showDocModal ? 'block' : 'none' }}
>
  <div className="modal-dialog modal-dialog-centered mx-auto" style={{ maxWidth: '300px', width: '100%' }}>
    <div className="modal-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
      <div className="modal-header">
        <h5 className="modal-title mt-2">Looking For a Doctor?</h5>
        <button type="button" className="close" aria-label="Close"  onClick={() => this.setState({ showDocModal: false })}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div className="modal-body d-flex flex-column align-items-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="d-flex justify-content-center">
          <div>
            <img style={{ width: '200px' }} src={DocPatient} alt="doctor" />
          </div>
        </div>
        <p className="p-3">
          Connect with our expert doctors from the comfort of your home through video consultation.
          Enjoy personalized medical advice without the need for a physical visit. Click "Schedule Now"
          to book your appointment.
        </p>
      </div>

      <div className="modal-footer">
      <Link to="/docPatientConnect" className="btn btn-secondary text-decoration-none">
    Schedule Now
  </Link>
      </div>
    </div>
  </div>
</div>


</div>

                                    
      <Footer/>
      </div>
      
        );
    }
}

function ToggleButton(props) {
     const handleDropdownItemClick = (itemName) => {
      console.log(`Dropdown item clicked: ${itemName}`);
  };
   if(props.userAccess){
       return(
         <>
         <Dropdown>
           <Dropdown.Toggle  className="header-drop text-capitalize" id="drop-down">
            
           <img className='filter-white' src={`${imgKitImagePath}/tr:w-300,f-webp/assets/img/account_circle_black_48dp.svg`} height="30px" alt="account"/>
           </Dropdown.Toggle>
           <Dropdown.Menu>
             <Dropdown.Item>
             <Link  className="text-dark btn" to={`/user/profile`}>
                               Profile
                      </Link>
             </Dropdown.Item>




         
             <Dropdown.Item >
               <Link to="/editSubscribe" className="text-dark btn">
                  Edit Subscription</Link>
               </Dropdown.Item>

               <Dropdown.Item >
               <Link to="/chatlist" className="text-dark btn">
               My Inbox</Link>
               </Dropdown.Item>

             { props.userAccess >= 4?
                <Dropdown.Item >
               <Link to="/dashboard" className="text-dark btn"  onClick={() => handleDropdownItemClick('Dashboard')}>
                  Dashboard</Link>
               </Dropdown.Item>
               :  <Dropdown.Item >
               <Link to="/my-cures" className="text-dark btn">
                  My Favourite Cures</Link>
               </Dropdown.Item>
            }
             
             <Dropdown.Item >
             <button className="btn text-dark text-capitalize" onClick={props.logout}> Logout</button>
             </Dropdown.Item>
           </Dropdown.Menu>
         </Dropdown>
       </>
          );
   }
   return(
      <>
      <button 
         className="btn primary-btn-color text-light loginSignbtn color-blue-darks" 
       
         variant="dark" 
         style={{width: '10rem'}}
         onClick={() => props.setModalShow(true)}
      >
            Sign in/Sign up
      </button>
   
      </>
   )
}

export default Home;
