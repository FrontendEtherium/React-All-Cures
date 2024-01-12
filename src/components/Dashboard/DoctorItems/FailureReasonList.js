import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { backendHost } from '../../../api-config';

import axios from 'axios';

const  FailureReasonList = () => {

    const [failureReason, setFailureReason] = useState([])
    
    const fetchList = (e) => {

    
          axios.get(`${backendHost}/video/get/all/failure/reasons `)
          .then(res => {
              setFailureReason(res.data)
              console.log(res.data)
          })
    
        
          .catch(res => {return})
    
        
      }

      useEffect(() => {
        document.title = "All Cures | Dashboard | VideoChat"
        fetchList();
        
    }, [])
    const AvailDelete = (ServiceId) => {
        console.log('delete')
        axios.delete(`${backendHost}/video/delete/failure/reason/${ServiceId}`)
        .then(res => {
           
        })
        .catch(err => {
            return;
        })
    }
    
  return (
    <div>



<div className="container mb-4">
                <div className="row">
            {
                failureReason?
                failureReason
                .map(i => {
                    return(
                        <div className="card col-md-5 mt-5 mx-3 border p-3 h6">
                            <div className="card-title h4"><span className="font-weight-bold">Failure Id: </span>{i.failureID}</div>
                            <div className="pb-2"><span className="font-weight-bold">Reason:</span> {i.reasons}</div>
                                <div className="pb-2"><span className="font-weight-bold">Refund:</span>Rs {i.refund}</div>
                                <div className="pb-2"><span className="font-weight-bold">Penalty:</span>Rs {i.penalty}</div>
                               <div className="pb-2"><span className="font-weight-bold">Created by:</span> {i.createdBy}</div>
                               
                               <div className="pb-2"><span className="font-weight-bold">Created on:</span> {i.createdDate.split('T')[0]}</div>
                               {/* <div className="pb-2"><span className="font-weight-bold">Created on:</span> {i.slotDuration(min)}</div> */}
                               <div className="pb-2"><span className="font-weight-bold">Last Updated  Date:</span> {i.lastUpdatedDate.split('T')[0]}</div>
                               <div className="pb-2"><span className="font-weight-bold">Updated By:</span> {i.updatedBy}</div>
                               <div className="pb-2"><span className="font-weight-bold">Status:</span> {i.status ===1?
                                <span> Active</span>
                                : <span> Inactive</span>}</div>
                              
                              
                            <div className="row mx-1 my-2">
                            <Link to={`/dashboard?updatefailurereasonlist=${i.failureID}`} className="col-md-3 btn mr-2" style={{backgroundColor: '#9289be', color: '#fff'}}>Edit</Link>
                           


                            { i.status===1?
                                      <button onClick={() => {
                                        const confirmBox = window.confirm(
                                            "Are you sure?"
                                        )
                                        if (confirmBox === true) {
                                            AvailDelete(i.failureID)
                                        }
                                    }} className="col-md-4 btn btn-dark">De-activate</button>
                                    :<button className="col-md-4 btn btn-dark" disabled>De-activated</button>

                                }

                            
                            </div>
                        </div>
                    )
                })
                : null
            }






                                      











                     
                                         

            </div>
            </div>
    </div>
  )
}

export default FailureReasonList
