import React, { Component } from 'react';
import { backendHost } from '../../api-config';
import axios from 'axios';
import Heart from"../../assets/img/heart.png";
import Facebook from '../../assets/icon/facebook.svg';
import Instagram from '../../assets/icon/instagram.svg';
import Linkedin from '../../assets/icon/linkedin.svg';
import GooglePlay from '../../assets/icon/googleplay.png';
import AppStore from '../../assets/icon/appstore.png';
import Twitter from '../../assets/icon/twitter.svg';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
// import Heart from "../../assets/img/heart.png";






class Footer extends Component {
   constructor(props){
      super(props);
      
      this.state = {
         afterSubmitLoad: false,
         showAlert: false,
         alertMsg: '',
      
         value:'',
         texts: '',
       
         mobile: '',
     
          searchParams: {
           
            subscription: '',
           
          
        }
        
    };      
  }
  postSubscribtion() {
   var phoneNumber = this.state.value.split('+')[1]
   var countryCodeLength = phoneNumber.length % 10
   var countryCode = phoneNumber.slice(0, countryCodeLength)
   var StringValue = phoneNumber.slice(countryCodeLength).replace(/,/g, '')
    if(phoneNumber){
      this.setState({
         afterSubmitLoad: true
      })
     axios.post(`${backendHost}/users/subscribe/${StringValue}`, {
     "nl_subscription_disease_id": "0",
     "nl_sub_type":1,
     "nl_subscription_cures_id":"0",
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
 render() {
   return(
      <div>
            {
                this.state.afterSubmitLoad &&
                <div className="loader main on-submit-loading">
                    {/* <i className="fa fa-spinner fa-spin fa-10x" /> */}
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
                  <section className="footer">
         <div className="container">
            <div className="row">
               <div className="col-md-4 col-sm-4 col-sx-12">
                  <div className="footer-inner" >
                     <h1>About us</h1>
                     <p >All Cures is a product developed, managed and owned by Etherium Technologies. Our mission is to make it simple and convenient for users to get information on Cures from anywhere in the world. 
                        Our belief is that your wellness is your well-being. 
                        We are passionate about giving our users the unique experience that is both fulfilling and wholesome.</p>
                  </div>
               </div>
               <div className="col-md-2 col-sm-2 col-sx-12">
                  <div className="footer-inner">
                     <h1>Top Cures</h1>
                     <ul>
                        {/* <li>
                           <a className="text-light"></a>
                        </li> */}
                         <Link to={ `/searchcategory/disease/1`}>
                          
                           
                              <li>
                                 <p className="text-light">Arthritis</p></li>
                           
                        </Link>
                        <Link to={ `/searchcategory/disease/74` }>
                        <li>
                           <p className="text-light">Diabetes</p>
                        </li>
                        </Link>
                        <Link to={ `/searchcategory/disease/50` }>
                        <li>
                           <p className="text-light">Hypertension</p>
                        </li>
                        </Link>
                        <Link to={ `/searchcategory/disease/164` }>
                        <li>
                           <p className="text-light">Insomnia</p>
                        </li>
                        </Link>
                        <Link to={ `/searchcategory/disease/155` }>
                        <li>
                           <p className="text-light">Skin Care</p>
                        </li>
                        </Link>
                        <Link to={ `/searchcategory/disease/87` }>
                        <li>
                           <p className="text-light">Thyroid</p>
                        </li>
                        </Link>
                        <Link to={ `/searchcategory/disease/160` }>
                        <li>
                           <p className="text-light">Psoriasis</p>
                        </li>
                        </Link>
                        {/* <li>
                           <a href="/#">Urologist</a>
                        </li> */}
                        {/* <li>
                           <a href="/#">Gastroenterologist</a>
                        </li> */}
                        
                        {/* <li>
                           <a href="/#"> View all</a>
                        </li> */}
                     </ul>
                  </div>
               </div>
               
               <div className="col-md-3 col-sm-3 col-sx-12">
                  <div className="footer-inner">
                     <h1>Discover</h1>
                     <ul>
                     <Link  to="/article">

                        <li>
                           <p className="text-light">Create A Cure</p>
                        </li>
                        </Link>
                        
                       
                       
                     </ul>
                  </div>
               </div>
               <div className="col-md-3 col-sm-3 col-sx-12">
                  <div className="footer-inner">
                     <h1>Download the All-Cures App here777:</h1>
               { /*  <a href="https://www.facebook.com/All-Cures-100610265834385" target="_blank" rel="noreferrer">
                              <span>
                                 <img src={AppStore} alt="Facebook Link" height="40px" width="150px"></img>
                              </span> 
                              <span className="path1"></span>
                              <span className="path2"></span>
                           </a>*/}
                           <a href="https://play.google.com/store/apps/details?id=com.allcures" target="_blank" rel="noreferrer">
                              <span>
                                 <img src={GooglePlay} alt="Google Play Link" height="" width="150" style={{width:"148px",maxHeight:"45px",marginBottom:"7px",marginRight:"5px"}}></img>
                              </span> 
                              <span className="path1"></span>
                              <span className="path2"></span>
                           </a>
                           <a href="https://apps.apple.com/in/app/all-cures/id1659590351" target="_blank" rel="noreferrer">
                              <span>
                                 <img src={AppStore} alt="Apple Link" height="" width="150"  style={{width:"150px",maxHeight:"45px",marginBottom:"7px"}}></img>
                              </span> 
                              <span className="path1"></span>
                              <span className="path2"></span>
                           </a>
                     </div>
                     </div>
              
            </div>
         </div>
        
      </section>
      <div className="footer-bootm">
         <div className="container">
            <div className="row">
            <div className='col-xs-12 disclaimer mb-3'>
               Disclaimer: Content available on All Cures website is not intended to be a substitute for professional medical advice, diagnosis, or treatment. It is strongly recommended to consult your physician or other qualified medical practitioner with any questions you may have regarding a medical condition. The website should not be used as a source for treatment of any medical condition.
               </div>
             
              
               <div className="col-md-4 col-sm-4 col-sx-12">
                  <div className="logo">
                     <a href="/#">
                        <img src={Heart} alt="All Cures Logo" /><span>All Cures</span>
                    </a>
                  </div>
               </div>
               
               <div className="col-md-4 col-sm-4 col-sx-12">
                  <div className="copyRight">
                     <p>All rights reserved. Copyright <i className="far fa-copyright fa-1x"></i>2022 <a href='https://etheriumtech.com'>Etherium Technologies</a></p>
                  </div>
               </div>

               <div className="col-md-4 col-sm-4 col-sx-12" id="social">
                  <div className="socia-media-footer">
                     <ul>
                        <li>
                           <a href="https://www.facebook.com/All-Cures-100610265834385" target="_blank" rel="noreferrer">
                              <span>
                                 <img src={Facebook} alt="Facebook Link" height="30px" width="30px"></img>
                              </span> 
                              <span className="path1"></span>
                              <span className="path2"></span>
                           </a>
                        </li>
                        <li>
                           <a href="https://www.instagram.com/allcuresinfo/" target="_blank" rel="noreferrer">
                              <span>
                                 <img src={Instagram} alt="Instagram Link" height="30px" width="30px"></img>
                              </span> 
                              <span className="path1"></span>
                              <span className="path2"></span>
                           </a>
                        </li>
                        <li>
                           <a href="https://twitter.com/allcuresinfo" target="_blank" rel="noreferrer">
                              <span>
                                 <img src={Twitter} alt="Twitter Link" height="30px" width="30px"></img>
                              </span> 
                              <span className="path1"></span>
                              <span className="path2"></span>
                           </a>
                        </li>
                        <li>
                           <a href="https://www.linkedin.com/company/etherium-technologies/" target="_blank" rel="noreferrer">
                              <span>
                                 <img src={Linkedin} alt="LinkedIn Link" height="30px" width="30px"></img>
                              </span> 
                              <span className="path1"></span>
                              <span className="path2"></span>
                           </a>
                        </li>
                        {/* <li>
                        <a href="/#">
                              <span>
                                 <img src={Twitter} alt="Twitter Link" height="30px" width="30px"></img>
                              </span> 
                              <span className="path1"></span>
                              <span className="path2"></span>
                           </a>
                        </li> */}
                     </ul>
                  </div>
               </div>
               <div className="back-top">
               <a href="#" id="scroll"style={{display: "block"}} >
                   <span></span>
                </a>
                </div>
               </div>
               <div className='row'></div>
            </div>
         </div>
      </div>
      );
   }
}
export default Footer;
