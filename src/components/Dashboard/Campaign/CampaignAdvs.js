import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { backendHost } from '../../../api-config';


import axios from 'axios';



const AllAdds = () => {

    const [allAdds, setAllAdds] = useState([])
    const [searchValue, setSearchValue] = useState('');
    const [searchType, setSearchType] = useState('name'); // Default search type is by name
  

    const fetchad= (e) => {

        const searchCriteria = {};

    if(searchValue){

        if (searchType === 'name') {
            searchCriteria.CampaignName = searchValue;
          } else if (searchType === 'date') {
            searchCriteria.CreateDate = searchValue;
          }
         else if (searchType === 'startDate') {
             searchCriteria.StartDate = searchValue;
          }
          else if (searchType === 'endDate') {
            searchCriteria.EndDate = searchValue;
         }
         else if (searchType === 'type') {
            searchCriteria.AdTypeName = searchValue;
         }
         else if (searchType === 'slot') {
            searchCriteria.SlotName = searchValue;
         }
      
          axios
            .post(`${backendHost}/sponsored/search/campaignsads`, searchCriteria)
            .then((res) => {
                setAllAdds(res.data);
            })
            .catch((res) => {
              return;
            });
    

    }
    else{

        axios.get(`${backendHost}/sponsored/get/all/ads`)
        .then(res => {
            setAllAdds(res.data)
        })
        .catch(res => {return})
    }
    }
    useEffect(() => {
        document.title = "All Cures | Dashboard | Sponsered"
        fetchad();
    }, [])

  
  return (
    <>

         
<div className="row ml-2 mt-3" >


    
<div className="col-md-5">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            // placeholder={`Search By ${searchType === 'name' ? ' Campaign Name' : 'Create Date'}`}

            placeholder={`Search By ${searchType === 'name' ? 'Campaign Name' : searchType === 'date' ? 'Create Date' : searchType === 'startDate' ? 'Start Date' : searchType === 'endDate' ? 'End Date' : searchType === 'type' ? 'Ad Type Name' : searchType === 'slot' ? 'Slot Name' : ''}`}

            className="form-control"
            required
          />
        </div>

        <div className="col-md-3 mt-2">
          <select
            className="form-control "
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="name"> Search by Campaign Name</option>
            <option value="date">Search by Create Date</option>
            <option value="startDate">Search by Start Date</option>
            <option value="endDate">Search by End Date</option>
            <option value="type">Search by Ad Type(Generic/Target)</option>
            <option value="slot">Search by Slot(Banner/left)</option>
          </select>
        </div>

        
     <button className=' btn btn-primary btn-sm mt-2 ' style={{ height: '35px' }} id='' onClick={(e) => fetchad(e)}>Search  <i class="fa fa-search"></i></button>

    </div>
           

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
