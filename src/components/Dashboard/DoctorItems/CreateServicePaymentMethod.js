import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { backendHost } from '../../../api-config';
import { Alert, Form } from 'react-bootstrap';
import  { userId} from '../../UserId'


import axios from 'axios';

const  CreateServicePaymentMethod = () => {

    const [servicesList, setServicesList] = useState([])
    const [paymentList, setPaymentList] = useState([])
    const [status, setStatus] = useState('')
    const [serviceID, setServiceID] = useState()
    const [paymentID, setPaymentID] = useState()

    const [alertMessage, setAlertMessage] = useState('');



    
    const fetchServiceList = (e) => {

    
          axios.get(`${backendHost}/sponsored/get/all/services `)
          .then(res => {
              setServicesList(res.data)
              console.log(res.data)
          })
    
        
          .catch(res => {return})
    
        
      }

      const fetchPaymentList = (e) => {

    
        axios.get(`${backendHost}/payment/get/all `)
        .then(res => {
            setPaymentList(res.data)
            console.log(res.data)
        })
  
      
        .catch(res => {return})
  
      
    }

      useEffect(() => {
        document.title = "All Cures | Dashboard | VideoChat"
        fetchServiceList();
        fetchPaymentList();
        
    }, [])

    const submitForm = async (event) => {
        event.preventDefault();
      
       
      
      
          const AdMap = {
           "ServiceID":parseInt(serviceID),
           "ServicePaymentMasterID":parseInt(paymentID),
            "Status":parseInt(status) ,
            "CreatedBy": parseInt(userId),
             
          };
        
          // Log AdMap data before sending
       // Convert AdMap object to JSON and append it to formData
          
        
      
          axios.post(`${backendHost}/payment/method/add`, AdMap, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          
          .then((response) => {
            if (response.data === 1) {
              setAlertMessage('Service Payment Method created successfully!!');
            } else if (response.data === 0) {
              setAlertMessage('Service Payment Method not created. Please check all fields and try again.');
            } else {
              setAlertMessage('An error occurred. Please contact the development team.');
            }
      
            setTimeout(() => {
              setAlertMessage('');
            }, 5000); // Hide alert after 3 seconds
          })
          .catch((error) => {
            console.error('Error creating Service Payment Method:', error);
            setAlertMessage('An error occurred. Please contact the development team.');
            setTimeout(() => {
              setAlertMessage('');
            }, 5000); // Hide alert after 3 seconds
          });
      
        };
        
   
  return (
       
    <div className="promo-page">
    <div className="container">
    <div className="card my-3">
            <div className="card-title h3 text-center py-2 border-bottom"> <b> (Create Service Payment Method)</b></div>
            <Form onSubmit={submitForm}  >
                <div className="row m-4">
           
           


                
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="">Enter Service  <b>(Required)</b></label>
<select name="speciality" value={serviceID} onChange={(e) => setServiceID(e.target.value)} placeholder=" Enter Speciality" required="" className="form-control">
<option>Select Service</option>
    {servicesList.map((c) => {
        
        return (
            <option value={c.serviceId}>{c.serviceName}</option>
        )
    })}
</select>
                        </Form.Group>

        
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="">Enter Payment Method <b>(Required)</b></label>
<select name="speciality" value={paymentID} onChange={(e) => setPaymentID(e.target.value)} placeholder=" Enter Payment Method" required="" className="form-control">
<option>Select Service</option>
    {paymentList && paymentList.map((c) => {
        
        return (
            <option value={c.servicePaymentMasterID}>{c.servicePaymentMasterName}</option>
        )
    })}
</select>
                        </Form.Group>

           
            <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
            <label htmlFor="fri">Set Status  <b>(Required)</b></label>
            <select name="fri" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Select Status" required className="form-control">
        <option>Select Status</option>

        <option value='1'>Active</option>
        <option value='0'>Inactive</option>
            </select>
            </Form.Group>
        
         
            </div>
            <div className="col-md-12 text-center">
                <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
            </div>
            </Form>
        </div>

        {alertMessage && (
<Alert variant="danger" className="h6 mx-3">
{alertMessage}
</Alert>
)}

   
    </div>
</div>

  )
}

export default CreateServicePaymentMethod
