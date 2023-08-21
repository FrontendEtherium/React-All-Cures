import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { backendHost } from '../../../api-config';

import axios from 'axios';


const AllCampaigns = () => {

  const [allCampaigns, setAllCampaigns] = useState([])
  const fetchCampaign = (e) => {
      axios.get(`${backendHost}/sponsored/all/campaigns`)
      .then(res => {
          setAllCampaigns(res.data)
          console.log(res.data)
      })

    
      .catch(res => {return})
  }
  useEffect(() => {
      document.title = "All Cures | Dashboard | Sponsered"
      fetchCampaign();
      
  }, [])

  const CampaignDelete = (companyId) => {
    axios.delete(`${backendHost}/sponsored/delete/campaign/${companyId}`)
    .then(res => {
        fetchCampaign()
    })
    .catch(err => {
        return;
    })
}

  return (
    <>

<div className="container mb-4">
                <div className="row">
            {
                allCampaigns?
                allCampaigns.filter(item=>item.Status===1)
                .map(i => {
                    return(
                        <div className="card col-md-5 mt-5 mx-3 border p-3 h6">
                            <div className="card-title h4"><span className="font-weight-bold">Campaign Name: </span>{i.CampaignName}</div>
                               
                                <div className="pb-2"><span className="font-weight-bold">Start Date:</span> {i.StartDate}</div>
                                <div className="pb-2"><span className="font-weight-bold">End Date:</span> {i.EndDate}</div>
                               <div className="pb-2"><span className="font-weight-bold">Created on:</span> {i.CreateDate}</div>
                              
                            <div className="row mx-1 my-2">
                            <Link to={`/dashboard?updatecampaignlist=${i.CampaignID}`} className="col-md-3 btn mr-2" style={{backgroundColor: '#9289be', color: '#fff'}}>Edit</Link>
                            {/* {
                                i.Status === 1?
                                    <button onClick={() => {
                                        const confirmBox = window.confirm(
                                            "Are you sure?"
                                        )
                                        if (confirmBox === true) {
                                            CampaignDelete(i.CampaignID)
                                        }
                                    }} className="col-md-4 btn btn-dark">Delete</button>
                                    : <button className="col-md-4 btn btn-dark" disabled>De-activate</button>
                            } */}

                                  
                   
                                      <button onClick={() => {
                                        const confirmBox = window.confirm(
                                            "Are you sure?"
                                        )
                                        if (confirmBox === true) {
                                            CampaignDelete(i.CampaignID)
                                        }
                                    }} className="col-md-4 btn btn-dark">Delete</button>

                            
                            </div>
                        </div>
                    )
                })
                : null
            }




{
                allCampaigns?
                allCampaigns.filter(item=>item.Status===0)
                .map(i => {
                    return(
                        <div className="card col-md-5 mt-5 mx-3 border p-3 h6">
                            <div className="card-title h4"><span className="font-weight-bold">Campaign Name: </span>{i.CampaignName}</div>
                               
                                <div className="pb-2"><span className="font-weight-bold">Start Date:</span> {i.StartDate}</div>
                                <div className="pb-2"><span className="font-weight-bold">End Date:</span> {i.EndDate}</div>
                               <div className="pb-2"><span className="font-weight-bold">Created on:</span> {i.CreateDate}</div>
                              
                            <div className="row mx-1 my-2">
                            <Link to={`/dashboard?updatecampaignlist=${i.CampaignID}`} className="col-md-3 btn mr-2" style={{backgroundColor: '#9289be', color: '#fff'}}>Edit</Link>
                           
                            <button className="col-md-4 btn btn-dark" disabled>De-activate</button>
                                  
                   
                                     

                            
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

export default AllCampaigns;
