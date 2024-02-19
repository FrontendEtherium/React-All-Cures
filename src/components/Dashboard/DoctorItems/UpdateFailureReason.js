import React, {useState, useEffect} from 'react';
import { Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import {useLocation} from "react-router-dom";
import history from '../../history';
import { userId } from '../../UserId'
import { backendHost } from '../../../api-config';


export default function UpdateFailureReason(props){
    const [reason, setReason] = useState('')
    const [refund, setRefund] = useState()
    const [penalty, setPenalty] = useState()
    const [updatedBy, setUpdatedBy] = useState()
    const [status, setStatus] = useState()
    const [submitAlert, setAlert] = useState(false)
    

    
    const search = useLocation().search;  
    const id = new URLSearchParams(search).get('updatefailurereasonlist');

    const fetchPromo = (e) => {
        axios.get(`${backendHost}/video/get/failure/reason/${id}`)
        .then(res => {
            console.log('hhhhh',id)
            setReason(res.data[0].reasons)
            setRefund(res.data[0].refund)
            setPenalty(res.data[0].penalty)
            setUpdatedBy(res.data[0].updatedBy)
    
            setStatus(res.data[0].status.toString())

           
        })
        .catch(res => {return})
    }

    useEffect(() => {
        document.title = "All Cures | Dashboard | Update Promo"
        fetchPromo();
        // eslint-disable-next-line
    }, [])

    const submitForm = (e) => {
        e.preventDefault();
        axios.put(`${backendHost}/video/update/failure/reason/${id}`, {
            "Reasons": reason,
            "Refund": refund,
            "Penalty": penalty,
            "UpdatedBy": userId,
            "Status": status
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
                    <div className="card-title h3 text-center py-2 border-bottom">Failure Reasons</div>
                    <form onSubmit={submitForm}>
                        <div className="row m-4">
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Reason</Form.Label>
                            <Form.Control value={reason} onChange={(e) => setReason(e.target.value)} type="text" name=""
                            placeholder="Reason" required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Refund</Form.Label>
                            <Form.Control type="number" value={refund} onChange={(e) => setRefund(e.target.value)} name=""
                            placeholder="Refund" required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Penalty</Form.Label>
                            <Form.Control defaultValue={penalty} onChange={(e) => setPenalty(e.target.value)} type="number" name=""
                            placeholder="Penalty" required/>
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

{/* 
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Updated By</Form.Label>
                            <Form.Control type="text" name="" value={updatedBy} onChange={e => setUpdatedBy(e.target.value)}
                             placeholder="Updated By" required/>
                        </Form.Group> */}
                       
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