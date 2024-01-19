import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import { backendHost } from '../../../api-config';

import axios from 'axios';
function GetPromo(){
    const [promoData, setPromo] = useState([])
    const fetchPromo = (e) => {
        axios.get(`${backendHost}/sponsored/get/all/contracts`)
        .then(res => {
            setPromo(res.data)
        })
        .catch(res => {return})
    }
    useEffect(() => {
        document.title = "All Cures | Dashboard | Contract"
        fetchPromo();
    }, [])

    const PromoDelete = (contractId) => {
        axios.delete(`${backendHost}/sponsored/delete/contract/${contractId}`)
        .then(res => {
            fetchPromo()
        })
        .catch(err => {
            return;
        })
    }

    return(
        <>
            <div className="container mb-4">
                <div className="row">
            {
                promoData?
                promoData.map(i => {
                    return(
                        <div className="card col-md-5 mt-5 mx-3 border p-3 h6">
                            <div className="card-title h4"><span className="font-weight-bold">Contract ID: </span>{i.contractId}</div>
                            {/* <div className="card-body"> */}
                              
                              { i.userName &&
                            <div className="pb-2"><span className="font-weight-bold">User Name:</span> {i.userName}</div>}
                             
                             { i.contactFirstName &&
                            <div className="pb-2"><span className="font-weight-bold">Contact Name:</span> {`${i.contactFirstName} ${i.contactLastName}`}</div>}
                            
                            <div className="pb-2"><span className="font-weight-bold">Service Name:</span> {i.serviceName}</div>

                                <div className="pb-2"><span className="font-weight-bold">StartDate:</span> {i.startDate.split('T')[0]}</div>
                                <div className="pb-2"><span className="font-weight-bold">End Date:</span> {i.endDate.split('T')[0]}</div>
                                <div className="pb-2"><span className="font-weight-bold">Fee:</span> {i.fee}</div>
                                <div className="pb-2"><span className="font-weight-bold">Currency:</span> {i.currency}</div>
                                <div className="pb-2"><span className="font-weight-bold">Created By:</span> {i.created_Name}</div>
                                <div><span className="font-weight-bold">Status:</span> 
                                {
                                    i.status === 1?
                                        <span> Active</span>
                                        : <span> Not Active</span>
                                }
                                </div>
                            {/* </div> */}
                            <div className="row mx-1 my-2">
                            <Link to={`/dashboard?updatecontract=${i.contractId}`} className="col-md-3 btn mr-2" style={{backgroundColor: '#9289be', color: '#fff'}}>Edit</Link>
                            {
                                i.status === 1?
                                    <button onClick={() => {
                                        const confirmBox = window.confirm(
                                            "Are you sure?"
                                        )
                                        if (confirmBox === true) {
                                            PromoDelete(i.contractId)
                                        }
                                    }} className="col-md-4 btn btn-dark">De-activate</button>
                                    : <button className="col-md-4 btn btn-dark" disabled>De-activated</button>
                            }
                            
                            </div>
                        </div>
                    )
                })
                : null
            }
            </div>
            </div>
        </>
       
    )
}

export default GetPromo;
