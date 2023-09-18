import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Link, useParams } from 'react-router-dom';
import { backendHost } from '../../api-config';
import { useHistory } from 'react-router-dom';
import { userId } from '../UserId';
import { userAccess } from '../UserAccess';
import { imagePath } from '../../image-path';
import Subscribe from '../Subscribe';

export default function Userprofile(props) {
    // const profileId = useState(userId)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    
    const [mobile, setMobile] = useState('')
    const [subnum, setSubnum] = useState('')
    
    const [isLoaded, setLoaded] = useState(false)
    const history = useHistory()
    const [showAlert, setShowAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')

    const [selectedFile, setSelectedFile] = useState();

	const [isFilePicked, setIsFilePicked] = useState(false);
  


	const changeHandler = (event) => {
    if(event.target.files[0].size > 1048576){
      Alert('Image should be less than 1MB!')
    } else {
		  setSelectedFile(event.target.files[0])
    }
  }

  const Alert = (msg) => {
    setShowAlert(true)
    setAlertMsg(msg)
    setTimeout(() => {
       setShowAlert(false)
    }, 5000);
  }

    const handleImageSubmission = (e) => {
        const imageType = userAccess == 1? "doctor": "patient"
        const formData = new FormData();
        formData.append('File', selectedFile);
        fetch(`${backendHost}/dashboard/imageupload/${imageType}/${userId}`,
          {
                    method: 'POST',
            body: formData,
          }
        )
            .then((response) => response.json())
        .then((result) => {
                Alert('Image uploaded successfully.')
            // console.log('Success:', result);
        })
        .catch((error) => {
            return
        });
    }

  useEffect(() => {
    handleImageSubmission()
  }, [selectedFile]);

  useEffect(() => {
    getSubsnum()
  }, [mobile]);

  useEffect(() => {
    getProfile()
    // eslint-disable-next-line
}, [])

const getSubsnum=() =>{
 console.log(mobile)
 
  axios.get(`${backendHost}/users/subscriptiondetails/${mobile}/cc/91`)
  
  .then((res) => {
     setSubnum(res.data.length);
     setLoaded(true)
  })
  .catch(err => {return})
}

const onError = (e) => {
  if(e.target.parentElement){
  e.target.parentElement.innerHTML = `<i class="fas fa-user-md fa-6x"></i>`
  }
}

    const getProfile = () => {
        axios.get(`${backendHost}/profile/${userId}`)
        .then(res => {
            setFirstName(res.data.first_name)
            setLastName(res.data.last_name)
            setEmail(res.data.email_address)
            setMobile(res.data.mobile_number)
            // setRegType(res.data.registration_type)
            setLoaded(true)
           
        })
        .catch(err => {return})
    }
   
    if(!isLoaded){
      return(
      <>
      <Header history={history}/>
      <div className="loader my-4">
        <i className="fa fa-spinner fa-spin fa-6x" />
      </div>
      <Footer/>
      </>
      );
    } else {
      return (
        <div>
          {
                showAlert &&
                    <div className="alert alert-success pop-up border-bottom">
                        <div className="h5 mb-0 text-center">{alertMsg}</div>
                        <div className="timer"></div>
                    </div>
            }
          <Header history={history}/>
          
          <section className="Profileleft" id="sectionMain">
            <div className="container">
              <div className="row">
                <div className="col-md-8 pd-0">
                  <div className="profile-card clearfix">
                    <div className="col-md-3 mr-3">
                      <div className="profileImageBlok">
                        <div className="profile-card-img text-center">
                          {/* <i className="fas fa-user-md fa-6x"></i> */}
                          <img src={`${imagePath}/cures_articleimages/patients/${userId}.png?d=${parseInt(Math.random()*1000)}`} 
                          onError={(e) => onError(e)}/>
                        </div>
                        {/* <i className="fas fa-edit fa-2x"></i> */}
                        {/* <div className="col-md-6 float-left" style={{zIndex: 2}}> */}
                        <label for="fileInput" className="image-edit-icon"> 
                       <i className="fas fa-camera fa-2x"></i>
                        </label>
                  <input id="fileInput" type="file" name="file" onChange={changeHandler} required />                 
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div id="profile-info">
                        <div className="profile-infoL-card">
                          <div className="profile-info-name" id="DocDetails">
                          <div className="h4 font-weight-bold">
                          <div>
            <div className="h4 text-capitalize">Name: {firstName} {lastName}</div>
            <div className="h5"><span className=''>Email:</span> {email}</div>
           {<div className="h5"><span className=''>Mobile:</span> {mobile}</div>}
            {/* <div className="h5"><span className=''>Registration Type:</span> {regType}</div> */}
            <div>
      { 
        (() => {
          if(subnum==0) {
            return<><div>
            <button id="" class="btn btn-dark" 
            data-toggle="modal" data-target=".bd-example-modal-lg">Subscribe</button>
              </div></>
          }
          else{
            return<><div>
              <Link to={'/editsubscribe'}>
              <button className='article-search btn btn-dark'>edit subscribe</button></Link>
              </div></>
              
          }
        })()
      }
    </div>
        </div>
                            </div>
                            {/* <!--  <button onclick="loadUsers()">Click</button> --> */}
                          </div>
                          
                        </div>
                      </div>
                    {/* </div> */}
                  
                    
                  </div>
                  
                  </div>
                </div>
              </div>
            </div>
         
           <Subscribe/>
          </section>
          <Footer />
        </div>
      );
    }
    } 
    
        
