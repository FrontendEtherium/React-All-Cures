import React, {useState, useEffect} from 'react';
import { Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import {useLocation} from "react-router-dom";
import history from '../../history';
import { userId } from '../../UserId'
import { backendHost } from '../../../api-config';


export default function UpdatePromo(props){
    const [code, setCode] = useState('')
    const [startDate, setStart] = useState()
    const [endDate, setEnd] = useState()
   
    const [submitAlert, setAlert] = useState(false)
    const [promoData, setPromo] = useState([])

    
    const search = useLocation().search;  
    const id = new URLSearchParams(search).get('updatecampaignlist');

    const fetchPromo = (companyId) => {
        axios.get(`${backendHost}/sponsored/campaign/${id}`)
        .then(res => {
            setPromo(res.data)
            setCode(res.data[0].CampaignName)
            setStart(res.data[0].StartDate.split('T')[0])
            setEnd(res.data[0].EndDate.split('T')[0])
           
        })
        .catch(res => {return})
    }

    useEffect(() => {
        document.title = "All Cures | Dashboard | Update Campaign"
        fetchPromo();
        // eslint-disable-next-line
    }, [])

    const submitForm = (e) => {
        e.preventDefault();
        axios.put(`${backendHost}/sponsored/update/campaign/${id}`, {
            "CampaignName": code,
            "StartDate": startDate,
            "EndDate": endDate,
           
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
                            <Form.Label>Campaign Name</Form.Label>
                            <Form.Control value={code} onChange={(e) => setCode(e.target.value)} type="text" name=""
                            placeholder="Campaign Name here..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Campaign Start Date</Form.Label>
                            <Form.Control type="Date" defaultValue={startDate} onChange={(e) => setStart(e.target.value)} name=""
                            placeholder="Start Date here..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Campaign End Date</Form.Label>
                            <Form.Control defaultValue={endDate} onChange={(e) => setEnd(e.target.value)} type="Date" name=""
                            placeholder="Start Date here..." required/>
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
