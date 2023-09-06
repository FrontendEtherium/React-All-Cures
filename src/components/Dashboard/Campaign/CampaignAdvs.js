import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { backendHost } from '../../../api-config';


import axios from 'axios';



const AllAdds = () => {

    const [allAdds, setAllAdds] = useState([])
    const fetchad= (e) => {
        axios.get(`${backendHost}/sponsored/get/all/ads`)
        .then(res => {
            setAllAdds(res.data)
        })
        .catch(res => {return})
    }
    useEffect(() => {
        document.title = "All Cures | Dashboard | Sponsered"
        fetchad();
    }, [])

  
  return (
    <>
      <div className="container mb-4">
                <div className="row">
            {
                allAdds?
                allAdds.filter(item=>item.ReviewStatus===1)
                .map(i => {
                    return(
                        <div className="card col-md-5 mt-5 mx-3 border p-3 h6">
                            <div className="card-title h4"><span className="font-weight-bold">CampaignName: </span>{i.CampaignName}</div>
                            {/* <div className="card-body"> */}
                            <div className="pb-2"><span className="font-weight-bold">DiseaseConditionName:</span> {i.DiseaseConditionName}</div>
                            <div className="pb-2"><span className="font-weight-bold">AdTypeName:</span> {i.SlotName}</div>

                                <div className="pb-2"><span className="font-weight-bold">Ad Description:</span> {i.AdDescription}</div>
                                <div className="pb-2"><span className="font-weight-bold">Ad Count:</span> {i.AdCount}</div>
                               <div className="pb-2"><span className="font-weight-bold">AdTitle:</span> {i.AdTitle}</div>
                                <div className="pb-2"><span className="font-weight-bold">Start Date:</span> {i.StartDate}</div>
                                <div className="pb-2"><span className="font-weight-bold">End Date:</span> {i.EndDate}</div>
                                <div className="pb-2"><span className="font-weight-bold">Ad Target Name:</span> {i.AdTypeName}</div>
                        
                               

                               <div className="row mx-1 my-2">
                            
                            <Link to={`/dashboard?updatecampaignads=${i.AdID}`} className="col-md-3 btn mr-2" style={{backgroundColor: '#9289be', color: '#fff'}}>Edit</Link>
                          
                                <button className="col-md-4 btn btn-dark ml-2">Active</button>

                            </div>


                        </div>
                    )
                })
                : null
            }


{
                allAdds?
                allAdds.filter(item=>item.ReviewStatus===0)
                .map(i => {
                    return(
                        <div className="card col-md-5 mt-5 mx-3 border p-3 h6">
                            <div className="card-title h4"><span className="font-weight-bold">CampaignName: </span>{i.CampaignName}</div>
                            {/* <div className="card-body"> */}
                            <div className="pb-2"><span className="font-weight-bold">DiseaseConditionName:</span> {i.DiseaseConditionName}</div>
                            <div className="pb-2"><span className="font-weight-bold">AdTypeName:</span> {i.SlotName}</div>

                                <div className="pb-2"><span className="font-weight-bold">Ad Description:</span> {i.AdDescription}</div>
                                <div className="pb-2"><span className="font-weight-bold">Ad Count:</span> {i.AdCount}</div>
                               <div className="pb-2"><span className="font-weight-bold">AdTitle:</span> {i.AdTitle}</div>
                                <div className="pb-2"><span className="font-weight-bold">Start Date:</span> {i.StartDate}</div>
                                <div className="pb-2"><span className="font-weight-bold">End Date:</span> {i.EndDate}</div>
                                <div className="pb-2"><span className="font-weight-bold">Ad Target Name:</span> {i.AdTypeName}</div>
                        
                               

                               <div className="row mx-1 my-2">
                            
                            <Link to={`/dashboard?updatecampaignads=${i.AdID}`} className="col-md-3 btn mr-2" style={{backgroundColor: '#9289be', color: '#fff'}}>Edit</Link>
                          
                                <button className="col-md-4 btn btn-dark ml-2" disabled>Not-active</button>

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

export default AllAdds
