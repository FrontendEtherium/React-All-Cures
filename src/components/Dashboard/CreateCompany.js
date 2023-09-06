
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendHost } from '../../api-config';

import { Alert, Form } from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';





function App() {
  const [first, setFirst] = useState();
  const [middle, setMiddle] = useState();
  const [last, setLast] = useState();
 
  const [emaill, setEmail] = useState()

 const[phone,setPhone] = useState()
 
  const [alert,setAlert] = useState()
  const [isError, setIsError] = useState(false);

  
  const submitForm = (e) => {
    e.preventDefault();

    // if (!isValidPhoneNumber(phone)) {
    //     setAlert(true)
    // }

      

    axios.post(`${backendHost}/sponsored/create/company`, {
        "CompanyName": first,
        "CompanyWebsite": middle,
        "ContactPerson": last,
        "Phone": phone,
        "Email": emaill,
        
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
      
  
          
          <div className="promo-page">
                <div className="container">
                <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom"> <b> (Create Company)</b></div>
                        <form onSubmit={submitForm}>
                            <div className="row m-4">
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Company Name  <b> (Required)</b></Form.Label>
                            <Form.Control value={first} onChange={(e) => setFirst(e.target.value)}  type="text" name=""
                            placeholder="Enter Company Name..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Company Website Name  <b> (Optional)</b></Form.Label>
                            <Form.Control  value={middle} onChange={(e) => setMiddle(e.target.value)} type="text" name=""
                            placeholder="Enter Company Website Name..." />
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Contact Person  <b> (Required)</b></Form.Label>
                            <Form.Control value={last} onChange={(e) => setLast(e.target.value)}  type="text" name=""
                            placeholder="Enter Contact Person..."  required/>
                        </Form.Group>
                   
                        
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Author Email  <b> (Required)</b></Form.Label>
                            <Form.Control value={emaill} onChange={(e) => setEmail(e.target.value)}  type="text" name=""
                            placeholder="Enter Author Email..." required
                            />
                        </Form.Group>
                    
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Phone Number  <b> (Required)</b></Form.Label>
                           


                            <Form.Control
                              value={phone}
                              error={isError}
                              type="number" 
                                  name=""
                             placeholder="Enter Phone Number..."
                               required
                               onChange={(e) => {
                             setPhone(e.target.value);
                         if (e.target.value.length > 10) {
                          setIsError(true);
                            } else {
                         setIsError(false);
                                  }
                                          }}
                                              />
            {isError && <p className="text-danger">Please enter a valid 10-digit phone number.</p>}
                            

                            
                            
                            
                        </Form.Group>
                          
                    
                        {
                            alert?
                                <Alert variant="success" className="h6 mx-3">Company Create successfully!!</Alert>
                                : null
                        }
                     
                        </div>
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>

               
                </div>
            </div>
   
   
       
       
        

  );
}

export default App;
