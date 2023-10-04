import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { backendHost } from '../../../api-config';

import axios from 'axios';


const AllCampaigns = () => {

  const [allCampaigns, setAllCampaigns] = useState([])
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('name'); // Default search type is by name


  const fetchCampaign = (e) => {

    const searchCriteria = {};

    if(searchValue){

        if (searchType === 'name') {
            searchCriteria.CampaignName = searchValue;
          } else if (searchType === 'date') {
            searchCriteria.CreateDate = searchValue;
          }
      
          axios
            .post(`${backendHost}/sponsored/search/campaigns`, searchCriteria)
            .then((res) => {
                setAllCampaigns(res.data);
            })
            .catch((res) => {
              return;
            });
    

    }
  
    else{

      axios.get(`${backendHost}/sponsored/all/campaigns`)
      .then(res => {
          setAllCampaigns(res.data)
          console.log(res.data)
      })

    
      .catch(res => {return})

    }
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


<div className="row ml-2 mt-3" >


    
<div className="col-md-5">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={`Search By ${searchType === 'name' ? ' Campaign Name' : 'Create Date'}`}
            className="form-control "
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
          </select>
        </div>

        
     <button className=' btn btn-primary btn-sm mt-2 ' style={{ height: '35px' }} id='' onClick={(e) => fetchCampaign(e)}>Search  <i class="fa fa-search"></i></button>

    </div>

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
