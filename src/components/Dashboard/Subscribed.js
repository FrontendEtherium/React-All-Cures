import React, { Component, useState, useEffect } from 'react';

import { Alert,Form, Dropdown, DropdownButton } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import Heart from"../../assets/img/heart.png";
import { useHistory, Link, Redirect} from 'react-router-dom'
import axios from 'axios';

import '../../assets/healthcare/css/main.css';
import Input from '@material-ui/core/Input';
import { Checkbox, FormGroup, FormControlLabel, Select, MenuItem , FormControl, InputLabel,TextField} from '@material-ui/core'

function LoginInfo(props) {  
const[number,setNumber] = useState('');

    const [type,setType] = useState([])
   
    const [disease, setDisease] = useState([])
    const [cures, setCures] = useState([])
    const [diseaseList, setDiseaseList] = useState([])
    const setMail = (event)=>{
        setNumber({ ...number,Mail: event.target.value})
    }
     
  const putSubscribe= async e => {
       e.preventDefault()
    axios.post('/users/subscribe/7889761896',
  {   
 "nl_subscription_disease_id":1,
  "nl_sub_type":1,
  "nl_subscription_cures_id": 0
  })
  .then(res => {
      console.log(res)
  })
  .catch(err => console.log(err))
   }
    

       
      
        
    
    useEffect(() => {

        // const params = new URLSearchParams(location.search);
        // const getEmail= params.get('em');
      
       const getEmail = props.location.search
       
         axios.post(`/users/getemdecrypt`,
         {
             "email":getEmail.split('em=')[1]
         })
         .then(res => {
            setNumber(res.data)
         })
         
    
     
        getDisease()

         
        }, [])

    // const logout = async e => {
    //     const res = await fetch("/LogoutActionController", {
    //        method: "POST"
    //     });
    //     setTimeout(() => {
    //        window.location.reload()
    //     }, 1000);
    //  }
     const handleSelect = function(countries) {
        const flavors = [];
        for (let i=0; i<countries.length; i++) {
            flavors.push(countries[i].value);
        }
        setType(flavors);
    }
    const getDisease = () => {
        axios.get('/article/all/table/disease_condition')
        .then(res => {
            console.log(res.data);
            setDiseaseList(res.data)
        })
        .catch(err => console.log(err))
    }

    return (
        <>
                        <div className="profilePage">
                <div className="comman-pg-header">
                    <section className="pageHeader zIndex-2 h-auto">
                    <div className="container">
                    <div className="row">
                        <div className="header" style={{width:"100%"}}>
                        <div className="logo"> 
                            <Link to='/home'>
                                <img src={Heart} alt="All Cures Logo"/>
                                <span>All Cures</span>
                            </Link>
                        </div>
    
                        <div className="loginSign">
                            {/* <ToggleButton acPerm={acPerm} url={props.url} logout={logout}/>  */}
                        </div>   	
                        </div>
                    </div>
                    </div>
                    </section>
                </div>
                 </div>
                 <div>
         <button i className=" newsletter-icon btn  newsletter_float" data-toggle="modal"data-target=".bd-example-modal-lg">
      Subscribe
     
            </button>
 
         </div>

         <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
    <div class="modal-header">
        
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
                        </div>
                        <div className="btn-Gropu">
                           <a href="/#" className="appBTN">App Store</a>
                           <a href="/#" className="appBTN">App Store</a>
                        </div>
                     </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-sx-12">
                     <div className="subscribe">
                        <h1>Get along with us on</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue  turpis sollicitudin nulla finibus dignissim.</p>
                       
                        <div className="form-group relative">
                           <div className="aaa">
                              <input type="text" name="" className="form-control"/>
                           </div>
                           <div>
                              {/* <a href="/#" className="subscribeBtn">Subscribe</a> */}
                              
                                
                                <button onClick={() => {this.postSubscribtion()}}>Submit</button>
                              
                             
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
            </>
      );
    }
    function ToggleButton(props) {
        if(props.acPerm){
            return(
                <DropdownButton style={{background: 'white'}} title="Hi there!">
                <Dropdown.Item >
                <Link to="/dashboard">
                   Dashboard
               </Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={props.logout}>Logout</Dropdown.Item>
             </DropdownButton>
            );
        }
        return(
            <Link 
             className="btn-white loginSignbtn color-blue-dark" 
             to={{pathname: props.url, search: '?login=true', state: {open: true}}}
            >
                Sign Up
            </Link>
        )
    }
    export default LoginInfo;       