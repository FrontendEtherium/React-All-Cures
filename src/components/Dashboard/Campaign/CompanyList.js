import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { backendHost } from '../../../api-config';

import axios from 'axios';

    
  

const AllCompanies = () => {

  const [allCompanies, setAllCompanies] = useState([])
  const[searchName,setSearchName]=useState("")
  const[searchDate,setSearchDate]=useState()
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('name'); // Default search type is by name



  const fetchCompany = (e) => {
    const searchCriteria = {};


    if(searchValue){

        if (searchType === 'name') {
            searchCriteria.CompanyName = searchValue;
          } else if (searchType === 'date') {
            searchCriteria.CreateDate = searchValue;
          }
      
          axios
            .post(`${backendHost}/sponsored/search/companies`, searchCriteria)
            .then((res) => {
              setAllCompanies(res.data);
            })
            .catch((res) => {
              return;
            });
    

    }
  

   
   
   else{
    axios.get(`${backendHost}/sponsored/all/companies`)
      .then(res => {
          setAllCompanies(res.data)
      })
      .catch(res => {return})
  }
}
  useEffect(() => {
      document.title = "All Cures | Dashboard | Sponsered"
      fetchCompany();
  }, [])

  const CompanyDelete = (companyId) => {
    axios.delete(`${backendHost}/sponsored/delete/company/${companyId}`)
    .then(res => {
        fetchCompany()
    })
    .catch(err => {
        return;
    })
}

  return (
    <>

<div className="row ml-2 mt-3" >
     
     {/* <div class="col-5"> 
     <input type="text" value={searchName}   onChange={(e) => setSearchName(e.target.value)} placeholder="Search With Company Name" className="form-control" required/>
     </div>
     <div class="col-5"> 
     <input type="text" value={searchDate}   onChange={(e) => setSearchDate(e.target.value)} placeholder="Search With Create Date" className="form-control" required/>
     </div> */}



<div className="col-md-5">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={`Search By ${searchType === 'name' ? 'Company Name' : 'Create Date'}`}
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
            <option value="name"> Search by Company Name</option>
            <option value="date">Search by Create Date</option>
          </select>
        </div>

    
     <button className=' btn btn-primary btn-sm mt-2 ' style={{ height: '35px' }} id='' onClick={(e) => fetchCompany(e)}>Search  <i class="fa fa-search"></i></button>
     </div>
     

<div className="container mb-4">
                <div className="row">
            {
                allCompanies?
                allCompanies.filter(item=>item.Status===1)
                .map(i => {
                    return(
                        <div className="card col-md-5 mt-5 mx-3 border p-3 h6">
                            <div className="card-title h4"><span className="font-weight-bold">Company Name: </span>{i.CompanyName}</div>
                            {/* <div className="card-body"> */}
                                <div className="pb-2"><span className="font-weight-bold">Company Website:</span> {i.CompanyWebsite}</div>
                                <div className="pb-2"><span className="font-weight-bold">Contact Person:</span> {i.ContactPerson}</div>
                                <div className="pb-2"><span className="font-weight-bold">Email:</span> {i.Email}</div>
                                <div className="pb-2"><span className="font-weight-bold">Phone:</span> {i.Phone}</div>
                                <div className="pb-2"><span className="font-weight-bold">Created on:</span> {i.CreateDate}</div>
                                <div className="pb-2"><span className="font-weight-bold">Last Updated:</span> {i.LastUpdatedDate}</div>
                              
                            <div className="row mx-1 my-2">
                            <Link to={`/dashboard?updatecompany=${i.CompanyID}`} className="col-md-3 btn mr-2" style={{backgroundColor: '#9289be', color: '#fff'}}>Edit</Link>
                            {/* {
                                i.Status === 1?
                                    <button onClick={() => {
                                        const confirmBox = window.confirm(
                                            "Are you sure?"
                                        )
                                        if (confirmBox === true) {
                                            CompanyDelete(i.CompanyID)
                                        }
                                    }} className="col-md-4 btn btn-dark">Delete</button>
                                    : <button className="col-md-4 btn btn-dark" disabled>De-activate</button>
                            }
                             */}

                                         <button onClick={() => {
                                        const confirmBox = window.confirm(
                                            "Are you sure?"
                                        )
                                        if (confirmBox === true) {
                                            CompanyDelete(i.CompanyID)
                                        }
                                    }} className="col-md-4 btn btn-dark">Delete</button> 
                            </div>
                        </div>
                    )
                })
                : null
            }

                         

{
                allCompanies?
                allCompanies.filter(item=>item.Status===0)
                .map(i => {
                    return(
                        <div className="card col-md-5 mt-5 mx-3 border p-3 h6">
                            <div className="card-title h4"><span className="font-weight-bold">Company Name: </span>{i.CompanyName}</div>
                            {/* <div className="card-body"> */}
                                <div className="pb-2"><span className="font-weight-bold">Company Website:</span> {i.CompanyWebsite}</div>
                                <div className="pb-2"><span className="font-weight-bold">Contact Person:</span> {i.ContactPerson}</div>
                                <div className="pb-2"><span className="font-weight-bold">Email:</span> {i.Email}</div>
                                <div className="pb-2"><span className="font-weight-bold">Phone:</span> {i.Phone}</div>
                                <div className="pb-2"><span className="font-weight-bold">Created on:</span> {i.CreateDate}</div>
                                <div className="pb-2"><span className="font-weight-bold">Last Updated:</span> {i.LastUpdatedDate}</div>
                              
                            <div className="row mx-1 my-2">
                            <Link to={`/dashboard?updatecompany=${i.CompanyID}`} className="col-md-3 btn mr-2" style={{backgroundColor: '#9289be', color: '#fff'}}>Edit</Link>
                           
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

export default AllCompanies;
