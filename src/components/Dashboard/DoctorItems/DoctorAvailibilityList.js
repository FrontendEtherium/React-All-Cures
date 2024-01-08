import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { backendHost } from '../../../api-config';

import axios from 'axios';

const DoctorAvailibilityList = () => {

    const [availibilityList, setAvailibilityList] = useState([])
    
    const fetchList = (e) => {

    
          axios.get(`${backendHost}/video/get/all/schedules `)
          .then(res => {
              setAvailibilityList(res.data)
              console.log(res.data)
          })
    
        
          .catch(res => {return})
    
        
      }

      useEffect(() => {
        document.title = "All Cures | Dashboard | VideoChat"
        fetchList();
        
    }, [])
    const AvailDelete = (DocID) => {
        axios.delete(`${backendHost}/video/delete/schedule/${DocID}`)
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
                availibilityList?
                availibilityList
                .map(i => {
                    return(
                        <div className="card col-md-5 mt-5 mx-3 border p-3 h6">
                            <div className="card-title h4"><span className="font-weight-bold">Contract ID: </span>{i.contractID}</div>
                            <div className="pb-2"><span className="font-weight-bold">Monday Availibility:</span> {i.monAvailability}</div>
                                <div className="pb-2"><span className="font-weight-bold">Tuesday Availibility:</span> {i.tueAvailability}</div>
                               <div className="pb-2"><span className="font-weight-bold">Wednesday Availibility:</span> {i.wedAvailability}</div>
                               <div className="pb-2"><span className="font-weight-bold">Thursday Availibility:</span> {i.thuAvailability}</div>
                               <div className="pb-2"><span className="font-weight-bold">Friday Availibility:</span> {i.friAvailability}</div>
                               <div className="pb-2"><span className="font-weight-bold">Weekday Only:</span> {i.weekDayOnly}</div>
                               <div className="pb-2"><span className="font-weight-bold">Doctor ID:</span> {i.docId}</div>
                               {/* <div className="pb-2"><span className="font-weight-bold">Created on:</span> {i.slotDuration(min)}</div> */}
                               <div className="pb-2"><span className="font-weight-bold">From Time:</span> {i.fromTime}</div>
                               <div className="pb-2"><span className="font-weight-bold">To Time:</span> {i.toTime}</div>
                               <div className="pb-2"><span className="font-weight-bold">Created Date:</span> {i.createdDate}</div>
                               <div className="pb-2"><span className="font-weight-bold">Last Updated Date:</span> {i.lastUpdatedDate}</div>
                               <div className="pb-2"><span className="font-weight-bold">Status:</span> {i.status}</div>
                               <div className="pb-2"><span className="font-weight-bold">Created By:</span> {i.createdBy}</div>
                               <div className="pb-2"><span className="font-weight-bold">Updated By:</span> {i.updatedBy}</div>
                              
                            <div className="row mx-1 my-2">
                            <Link to={`/dashboard?updateAvailibilityList=${i.docId}`} className="col-md-3 btn mr-2" style={{backgroundColor: '#9289be', color: '#fff'}}>Edit</Link>
                           
                                      <button onClick={() => {
                                        const confirmBox = window.confirm(
                                            "Are you sure?"
                                        )
                                        if (confirmBox === true) {
                                            AvailDelete(i.docId)
                                        }
                                    }} className="col-md-4 btn btn-dark">Delete</button>

                            
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

export default DoctorAvailibilityList