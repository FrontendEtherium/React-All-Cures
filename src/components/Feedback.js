
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import axios from 'axios';
import { backendHost } from '../api-config';
import { Link } from 'react-router-dom';
import { Alert, Form } from 'react-bootstrap';
import '../styles.css';
import  axiosInstance  from '../axiosInstance';
import { useHistory } from 'react-router';






function Feedback() {
    const[name,setName] = useState();
    const[first,setFirst] = useState();
    const[email,setEmail] = useState();
    const[number,setNumber] = useState('');
    const[feedback,setFeedback] = useState();
    const[alert,setAlert] = useState();
    const[gender,setGender] = useState();

     const history = useHistory()
    
    
    const submitForm = (e) => {
        e.preventDefault();
       axiosInstance.post(`${backendHost}/admin/create/feedback  `, {
            "firstname":first,
            "lastname": name,
            "email": email,
            "phonenumber": number,
            "whatsapp_alert":gender,
            "feedback": feedback,
         
        })
        .then(res => {
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
            }, 4000);
        })
        .catch(res => console.log(res))
    }
 
  return (
      <div>
                <Header  history={history}/>    
          
          <div className="promo-page feedbackmobile">
                <div className="container">
                <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom">We would love to hear from you. Please share any feedback</div>
                        <form onSubmit={submitForm}>
                            <div className="row m-4">
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Your First Name (Optional)</Form.Label>
                            <Form.Control  value={first} onChange={(e) => setFirst(e.target.value)} type="text" name=""
                            placeholder="Enter Your First Name..." />
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Your Last Name (Optional)</Form.Label>
                            <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" name=""
                            placeholder="Enter Your Last Name..." />
                        </Form.Group>
                       
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Your Email (Optional)</Form.Label>
                            <Form.Control  value={email} onChange={(e) => setEmail(e.target.value)} type="text" name=""
                            placeholder="Enter Your Email..."
                            />
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Your Phone Number (Optional)</Form.Label>
                            <Form.Control value={number} onChange={(e) => setNumber(e.target.value)} type="text" name=""
                            placeholder="Enter Your Phone Number..." />
                        </Form.Group>
                                  <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
      <Form.Label>Would you like to subscribe to our WhatsApp alerts on health?</Form.Label>
      <div>
        <Form.Check
          inline
          label="Yes"
          name="whatsapp"
          type="radio"
          value="yes"
          checked={gender === 'yes'}
          onChange={(e) => setGender(e.target.value)}
          className="radio-button"
          required 
        />
        <Form.Check
          inline
          label="No"
          name="whatsapp"
          type="radio"
          value="no"
          checked={gender === 'no'}
          onChange={(e) => setGender(e.target.value)}
          className="radio-button"
          required 
        />
      </div>
    </Form.Group>

  
                        <Form.Group className="col-md-12 float-left"  style={{zIndex: 2}}>
                            <Form.Label>Enter Your Feedback</Form.Label>
                          
                            <Form.Control
        Value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        as="textarea"
        placeholder="Enter Your Feedback" 
        style={{ height: '100px' } }
        required />
                             
                        </Form.Group>
                        {
                            alert?
                                <Alert variant="success" className="h6 mx-3">Thanks For Your Feedback!!</Alert>
                                : null
                        }
                     
                        </div>
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>


                    </div>
                    <Footer/>
                </div>
            </div>
   
                     
       
       
        

  );
}

export default Feedback;
