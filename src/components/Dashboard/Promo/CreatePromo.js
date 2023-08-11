import React, { useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import { backendHost } from '../../../api-config';
import { userId } from '../../UserId'

function Promo(props) {
    const [code, setCode] = useState('')
    const [startDate, setStart] = useState(Date)
    const [endDate, setEnd] = useState(Date)
    const [maxLimit, setMax] = useState()
    const [active, setActive] = useState()
    const [submitAlert, setAlert] = useState(false)
    
    const submitForm = (e) => {
        e.preventDefault();
        axios.post(`${backendHost}/promo/create`, {
            "promo_code": code,
            "promo_start_datetime": startDate,
            "promo_end_datetime": endDate,
            "promo_max_limit": maxLimit,
            "promo_active": active,
            "promo_updated_by": userId,
        })
        .then(res => {
            setAlert(true)
            setCode('')
            setStart('')
            setEnd('')
            setMax('')
            setActive('')
            setTimeout(() => {
                setAlert(false)
            }, 4000);
        })
        .catch(res => {return})
    }
    return(
        <>
            {/* <Header/> */}
            <div className="promo-page">
                <div className="container">
                    <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom">Campaign Details</div>
                        <form onSubmit={submitForm}>
                            <div className="row m-4">
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Promo Code</Form.Label>
                            <Form.Control value={code} onChange={(e) => setCode(e.target.value)} type="text" name=""
                            placeholder="Promo code here..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Campaign Start Date</Form.Label>
                            <Form.Control type="Date" value={startDate} onChange={(e) => setStart(e.target.value)} name=""
                            placeholder="Start Date here..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Campaign End Date</Form.Label>
                            <Form.Control value={endDate} onChange={(e) => setEnd(e.target.value)} type="Date" name=""
                            placeholder="Start Date here." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Campaign's Maximum Limit</Form.Label>
                            <Form.Control type="text" name="" value={maxLimit} onChange={(e) => setMax(e.target.value)} 
                            placeholder="Maximum Limit here..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Campaign's Active Status</Form.Label>
                            <Form.Control type="text" name="" value={active} onChange={e => setActive(e.target.value)}
                             placeholder="1 for active & 0 for not-active..." required/>
                        </Form.Group>
                        </div>
                        {
                            submitAlert?
                                <Alert variant="success" className="h6 mx-3">Campaign created successfully!!</Alert>
                                : null
                        }
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* <Footer/> */}
        </>
    );
}

export default Promo;
