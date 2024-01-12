import React, {useState, useEffect} from 'react';
import { Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import {useLocation} from "react-router-dom";
import history from '../../history';
import { userId } from '../../UserId'
import { backendHost } from '../../../api-config';


export default function UpdateDoctorAvail(props){
   
    const [submitAlert, setAlert] = useState(false)




    const[contractId, setContractId]=useState();
  const[mon, setMon]=useState();
  const[tue ,setTue]=useState();
  const[wed,setWed]=useState();
  const[thurs, setThurs]=useState();
  const[fri, setFri]=useState();
  const[weekDayOnly, setWeekDayOnly]=useState();
  const[slotDuration,setSlotDuration]=useState();
  const[fromTime,setFromTime]=useState();
  const[toTime,setToTime]=useState();
  const[statuss,setStatuss]=useState();
  const[updatedBy,setUpdatedBy]=useState();

    

    
    const search = useLocation().search;  
    const id = new URLSearchParams(search).get('updateAvailibilityList');

    const fetchPromo = (e) => {
        axios.get(`${backendHost}/video/get/schedule/${id}`)
        .then(res => {
            console.log('hhhhh',res.data)
            setContractId(res.data[0].contractId)
            setMon(res.data[0].monAvailability.toString())
            setTue(res.data[0].tueAvailability.toString())
            setWed(res.data[0].wedAvailability.toString())
            setThurs(res.data[0].thuAvailability.toString())
            setFri(res.data[0].friAvailability.toString())
            setStatuss(res.data[0].status.toString())
            setWeekDayOnly(res.data[0].weekDayOnly.toString())
            setSlotDuration(res.data[0].slotDuration)
            setFromTime(res.data[0].fromTime)
            setToTime(res.data[0].toTime)

           console.log(mon,"mon")
        })
        .catch(res => {return})
    }

    useEffect(() => {
        document.title = "All Cures | Dashboard | Update Promo"
        fetchPromo();
        // eslint-disable-next-line
    }, [])

    const submitForm = (e) => {
        e.preventDefault();
        axios.put(`${backendHost}/video/update/schedule/${id}`, {
            "ContractID": contractId,
            "MonAvailability": mon,
            "TueAvailability": tue,
            "WedAvailability": wed,
            "ThuAvailability": thurs,
            "FriAvailability": fri,
            "WeekDayOnly": weekDayOnly,
            "SlotDuration(min)": slotDuration,
            "FromTime": fromTime,
            "ToTime": toTime,
            "Status": statuss,
            "UpdatedBy": userId
        })
        .then(res => {
            history.back()
        })
        .catch(res => {return})
    }

    return(
            <div className="container">
                <div className="card my-3">
                    <div className="card-title h3 text-center py-2 border-bottom">Update Doctor Availibility</div>
                    <form onSubmit={submitForm}>
                        <div className="row m-4">
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Contract Id</Form.Label>
                            <Form.Control value={contractId} onChange={(e) => setContractId(e.target.value)} type="text" name=""
                            placeholder="Service Name" required/>
                        </Form.Group>
                     


<div className="col-lg-6 form-group">
              <label htmlFor="">Monday Availability</label>
              <select
                multiple
                name="monavail"
                placeholder="Monday Availability"
                value={mon}
                onChange={(e) => setMon(e.target.value)}
                className="form-control"
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
         
         



                        <div className="col-lg-6 form-group">
              <label htmlFor="">Tuesday Availability</label>
              <select
                multiple
                name="tuesdayavail"
                placeholder="Tuesday Availability"
                value={tue}
                onChange={(e) => setTue(e.target.value)}
                className="form-control"
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
                      


                        <div className="col-lg-6 form-group">
              <label htmlFor="">Wednesday Availability</label>
              <select
                multiple
                name="wednesdayavail"
                placeholder="Wednesday Availability"
                value={wed}
                onChange={(e) => setWed(e.target.value)}
                className="form-control"
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
                                             

                        <div className="col-lg-6 form-group">
              <label htmlFor="">Thursday Availability</label>
              <select
                multiple
                name="thursdayavail"
                placeholder="Thursday Availability"
                value={thurs}
                onChange={(e) => setThurs(e.target.value)}
                className="form-control"
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
         


                        <div className="col-lg-6 form-group">
              <label htmlFor="">Friday Availability</label>
              <select
                multiple
                name="friavail"
                placeholder="Friday Availability"
                value={fri}
                onChange={(e) => setFri(e.target.value)}
                className="form-control"
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
         


                        
                        <div className="col-lg-6 form-group">
              <label htmlFor="">Week Day Only</label>
              <select
                multiple
                name="weekdayonly"
                placeholder="Week Day Only"
                value={weekDayOnly}
                onChange={(e) => setWeekDayOnly(e.target.value)}
                className="form-control"
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>

                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Slot Duration(min)</Form.Label>
                            <Form.Control type="text" name="" value={slotDuration} onChange={e => setSlotDuration(e.target.value)}
                             placeholder="Updated By" required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>From Time</Form.Label>
                            <Form.Control type="time" name="" value={fromTime} onChange={e => setFromTime(e.target.value)}
                             placeholder="Updated By" required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>To Time</Form.Label>
                            <Form.Control type="time" name="" value={toTime} onChange={e => setToTime(e.target.value)}
                             placeholder="Updated By" required/>
                        </Form.Group>

                     


                        <div className="col-lg-6 form-group">
              <label htmlFor="">Review Status</label>
              <select
                multiple
                name="status"
                placeholder="status"
                value={statuss}
                onChange={(e) => setStatuss(e.target.value)}
                className="form-control"
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
         
                        </div>
                        {
                            submitAlert?
                                <Alert variant="success" className="h6 mx-3">Updated Successfully!!</Alert>
                                : null
                        }
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>
                </div>
    );
    
}





