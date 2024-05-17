import React, {useState, useEffect} from 'react';
import { Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import {useLocation} from "react-router-dom";
import history from '../history';
import { userId } from '../UserId'
import { backendHost } from '../../api-config';


export default function EditTip(props){
   

    const [title, setTitle] = useState()
    
    const [submitAlert, setAlert] = useState(false)
    const [subscriptionData, setSubscription] = useState([])

    
    const search = useLocation().search;  
    const id = new URLSearchParams(search).get('edittip');

    const fetchSubscription = (e) => {
        axios.get(`${backendHost}/tip/${id}`)
        .then(res => {
            setSubscription(res.data)
            setTitle(res.data[0].tip_title)
           
        })
        .catch(res => {return})
    }


    useEffect(() => {
        document.title = "All Cures | Dashboard | Update Subscription"
        fetchSubscription();
        // eslint-disable-next-line
    }, [])

    const submitForm = (e,userId) => {
        e.preventDefault();
        axios.put(`${backendHost}/tip/updatetip/${id}`, {
        
            "tip_title":title,
            "createdBy":userId,
            
         
        })
        .then(res => {
            history.back()
        })
        .catch(res => {return})
    }

    return(
            <div className="container">
                <div className="card my-3">
                    <div className="card-title h3 text-center py-2 border-bottom">Update Subscription Details</div>
                    <form onSubmit={submitForm}>
                        <div className="row m-4">
                        
                       
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Tip Title Details</Form.Label>
                            <Form.Control type="text" name="" value={title} onChange={(e) => setTitle(e.target.value)} 
                            placeholder="Tip Title Details..." required/>
                        </Form.Group>

                      

              

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
