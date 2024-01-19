import React, {useState, useEffect} from 'react';
import { Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import {useLocation} from "react-router-dom";
import history from '../../history';
import { userId } from '../../UserId'
import { backendHost } from '../../../api-config';


export default function UpdateServicePayment(props){
    const [serviceID, setServiceID] = useState('')
    const [paymentID, setPaymentID] = useState()
    const [status, setStatus] = useState()
    const[servicesList,setServicesList]=useState()
    const[paymentList,setPaymentList]=useState()
    const [submitAlert, setAlert] = useState(false)
    

    
    const search = useLocation().search;  
    const id = new URLSearchParams(search).get('updateservicepaymentmethod');

    const fetchPromo = (e) => {
        axios.get(`${backendHost}/payment/method/get/${id}`)
        .then(res => {
            console.log('hhhhh',res.data[0])
            console.log('serviceid',res.data[0].serviceID)
            setServiceID(res.data[0].serviceID)
            setPaymentID(res.data[0].servicePaymentMasterID)
            setStatus(res.data[0].status.toString())

           
        })
        .catch(res => {return})
    }


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
        document.title = "All Cures | Dashboard | Update Promo"
        fetchPromo();
        fetchServiceList();
        fetchPaymentList();
        // eslint-disable-next-line
    }, [])

    const submitForm = (e) => {
        e.preventDefault();
        axios.put(`${backendHost}/payment/method/update/${id}`, {
            "ServiceID": parseInt(serviceID),
            "ServicePaymentMasterID": parseInt(paymentID),
            "UpdatedBy": parseInt(userId),
            "Status": parseInt(status)
        })
        .then(res => {
            history.back()
            setAlert(true);
            setTimeout(() => {
              setAlert(false);
            }, 4000);
        })
        .catch(res => {return})
    }

    return(
            <div className="container">
                <div className="card my-3">
                    <div className="card-title h3 text-center py-2 border-bottom">Update Service Payment </div>
                    <form onSubmit={submitForm}>
                        <div className="row m-4">
                      
                      
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="">Enter Service  <b>(Required)</b></label>
<select name="speciality" value={serviceID} onChange={(e) => setServiceID(e.target.value)} placeholder=" Enter Speciality" required="" className="form-control">
<option>Select Service</option>
    { servicesList && servicesList.map((c) => {
        
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
                              
                        <div className="col-lg-6 form-group">
              <label htmlFor="">Review Status</label>
              <select
                multiple
                name="status"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="form-control"
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>


                     
                       
                        </div>
                        {
                            submitAlert?
                                <Alert variant="success" className="h6 mx-3">Updated Successfully!!</Alert>
                                : null
                        }
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>
                </div>
    );
    
}
