import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { backendHost } from '../../../api-config';

import axios from 'axios';

    
  

const AllCompanies = () => {

  const [allCompanies, setAllCompanies] = useState([])
  const fetchCompany = (e) => {
      axios.get(`${backendHost}/sponsored/all/companies`)
      .then(res => {
          setAllCompanies(res.data)
      })
      .catch(res => {return})
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
