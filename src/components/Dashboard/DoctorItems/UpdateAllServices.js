import React, {useState, useEffect} from 'react';
import { Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import {useLocation} from "react-router-dom";
import history from '../../history';
import { userId } from '../../UserId'
import { backendHost } from '../../../api-config';


export default function UpdateAllServices(props){
    const [serviceName, setServiceName] = useState('')
    const [serviceDesc, setServiceDesc] = useState()
    const [paymentReq, setPaymentReq] = useState()
    const [contractReq, setContractReq] = useState()
    const [updatedBy, setUpdatedBy] = useState()
    const [status, setStatus] = useState()
    const [submitAlert, setAlert] = useState(false)
    

    
    const search = useLocation().search;  
    const id = new URLSearchParams(search).get('updateallserviceslist');

    const fetchPromo = (e) => {
        axios.get(`${backendHost}/sponsored/get/service/${id}`)
        .then(res => {
            console.log('hhhhh',res.data)
            setServiceName(res.data[0].serviceName)
            setServiceDesc(res.data[0].serviceDesc)
            setPaymentReq(res.data[0].paymentReq)
            setContractReq(res.data[0].contractReq)
            setUpdatedBy(res.data[0].updatedBy)
            setStatus(res.data[0].status)

           
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
        axios.put(`${backendHost}/sponsored/update/service/${id}`, {
            "ServiceName": serviceName,
            "ServiceDesc": serviceDesc,
            "PaymentReq": paymentReq,
            "ContractReq": contractReq,
            "UpdatedBy": userId,
            "Status": status
        })
        .then(res => {
            history.back()
        })
        .catch(res => {return})
    }

    return(
            <div className="container">
                <div className="card my-3">
                    <div className="card-title h3 text-center py-2 border-bottom">Update Service Details</div>
                    <form onSubmit={submitForm}>
                        <div className="row m-4">
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Service Name</Form.Label>
                            <Form.Control value={serviceName} onChange={(e) => setServiceName(e.target.value)} type="text" name=""
                            placeholder="Service Name" required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Service Description</Form.Label>
                            <Form.Control type="text" value={serviceDesc} onChange={(e) => setServiceDesc(e.target.value)} name=""
                            placeholder="Service Description" required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Payment Required</Form.Label>
                            <Form.Control defaultValue={paymentReq} onChange={(e) => setPaymentReq(e.target.value)} type="text" name=""
                            placeholder="Payment Required" required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Contract Required</Form.Label>
                            <Form.Control type="text" name="" value={contractReq} onChange={(e) => setContractReq(e.target.value)} 
                            placeholder="Contract Required" required/>
                        </Form.Group>


                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Updated By</Form.Label>
                            <Form.Control type="text" name="" value={updatedBy} onChange={e => setUpdatedBy(e.target.value)}
                             placeholder="Updated By" required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Status</Form.Label>
                            <Form.Control type="text" name="" value={status} onChange={e => setStatus(e.target.value)}
                             placeholder="Status" required/>
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