import React, {useState, useEffect} from 'react';
import { Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import {useLocation} from "react-router-dom";
import history from '../../history';
import { userId } from '../../UserId'
import { backendHost } from '../../../api-config';


export default function UpdatePromo(props){
    const [code, setCode] = useState('')
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [maxLimit, setMax] = useState()
    const [active, setActive] = useState()
    const [submitAlert, setAlert] = useState(false)
    const [promoData, setPromo] = useState([])

    
    const search = useLocation().search;  
    const id = new URLSearchParams(search).get('updatecompany');

    const fetchPromo = (e) => {
        axios.get(`${backendHost}/sponsored/company/${id}`)
        .then(res => {
            setPromo(res.data)
            setCode(res.data[0].CompanyName)
            setMax(res.data[0].CompanyWebsite)
            setActive(res.data[0].ContactPerson)
            setEmail(res.data[0].Email)
            setPhone(res.data[0].Phone)
        })
        .catch(res => {return})
    }

    useEffect(() => {
        document.title = "All Cures | Dashboard | Update Company"
        fetchPromo();
        // eslint-disable-next-line
    }, [])

    const submitForm = (e) => {
        e.preventDefault();
        axios.put(`${backendHost}/sponsored/update/company/${id}`, {
            "CompanyName": code,
            "CompanyWebsite": maxLimit,
            "ContactPerson": active,
            "Email":email,
            "Phone":phone,
            // "promo_updated_by": userId
        })
        .then(res => {
            history.back()
        })
        .catch(res => {return})
    }

    return(
            <div className="container">
                <div className="card my-3">
                    <div className="card-title h3 text-center py-2 border-bottom">Update Campaign Details</div>
                    <form onSubmit={submitForm}>
                        <div className="row m-4">
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Enter Company Name  </Form.Label>
                            <Form.Control value={code} onChange={(e) => setCode(e.target.value)} type="text" name=""
                            placeholder="Enter Company Name   here..." required/>
                        </Form.Group>
                        
                       
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Enter Company Website Name</Form.Label>
                            <Form.Control type="text" name="" value={maxLimit} onChange={(e) => setMax(e.target.value)} 
                            placeholder="Enter Company Website Name..." required/>
                        </Form.Group>

                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Enter ContactPerson</Form.Label>
                            <Form.Control type="text" name="" value={active} onChange={(e) => setActive(e.target.value)} 
                            placeholder="Enter ContactPerson..." required/>
                        </Form.Group>

                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Enter Email</Form.Label>
                            <Form.Control type="text" name="" value={email} onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Enter Email..." required/>
                        </Form.Group>

                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Enter Phone</Form.Label>
                            <Form.Control type="text" name="" value={phone} onChange={(e) => setPhone(e.target.value)} 
                            placeholder="Enter Phone..." required/>
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
