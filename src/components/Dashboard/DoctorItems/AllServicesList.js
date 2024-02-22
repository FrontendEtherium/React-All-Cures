import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { backendHost } from '../../../api-config';
import {userAccess} from'../../UserAccess';

import axios from 'axios';

const AllServicesList = () => {

    const [allServicesList, setAllServicesList] = useState([])
    
    const fetchList = (e) => {

    
          axios.get(`${backendHost}/sponsored/get/all/services `)
          .then(res => {
              setAllServicesList(res.data)
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
        axios.delete(`${backendHost}/sponsored/delete/service/${ServiceId}`)
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
                allServicesList?
                allServicesList
                .map(i => {
                    return(
                        <div className="card col-md-5 mt-5 mx-3 border p-3 h6">
                            <div className="card-title h4"><span className="font-weight-bold">Service Id: </span>{i.serviceId}</div>
                            <div className="pb-2"><span className="font-weight-bold">Service Name:</span> {i.serviceName}</div>
                                <div className="pb-2"><span className="font-weight-bold">Service Description:</span> {i.serviceDesc}</div>
                               <div className="pb-2"><span className="font-weight-bold">Payment Required:</span> {i.paymentReq ===1?  <span> Yes</span>
                                : <span> No</span>}</div>
                               <div className="pb-2"><span className="font-weight-bold">Contract Required:</span> {i.contractReq ===1?  <span> Yes</span>
                                : <span> No</span>}</div>
                               <div className="pb-2"><span className="font-weight-bold">Created by:</span> {i.created_Name}</div>
                               <div className="pb-2"><span className="font-weight-bold">Status:</span> {i.status===1?  <span> Active</span>
                                : <span> Inactive</span>}</div>
                                 <div className="pb-2"><span className="font-weight-bold">Availability Required :</span> {i.availabilityReq===1?  <span> Yes</span>
                                : <span> No</span>}</div>
                               <div className="pb-2"><span className="font-weight-bold">Created on:</span> {i.createdDate.split('T')[0]}</div>
                               {/* <div className="pb-2"><span className="font-weight-bold">Created on:</span> {i.slotDuration(min)}</div> */}
                               <div className="pb-2"><span className="font-weight-bold">Last Updated  on:</span> {i.lastUpdatedDate?i.lastUpdatedDate.split('T')[0]:""}</div>
                               <div className="pb-2"><span className="font-weight-bold">Updated By:</span> {i.updated_Name}</div>
                              

                               {userAccess !=8 &&
                              
                            <div className="row mx-1 my-2">
                            <Link to={`/dashboard?updateallserviceslist=${i.serviceId}`} className="col-md-3 btn mr-2" style={{backgroundColor: '#9289be', color: '#fff'}}>Edit</Link>
                           

                           { i.status===1?
                                      <button onClick={() => {
                                        const confirmBox = window.confirm(
                                            "Are you sure?"
                                        )
                                        if (confirmBox === true) {
                                            AvailDelete(i.serviceId)
                                        }
                                    }} className="col-md-4 btn btn-dark">De-activate</button>
                                     :<button className="col-md-4 btn btn-dark" disabled>De-activated</button>
                                }
                            </div>

                            }

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

export default AllServicesList
