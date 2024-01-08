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
            setMon(res.data[0].monAvailability)
            setTue(res.data[0].tueAvailability)
            setWed(res.data[0].wedAvailability)
            setThurs(res.data[0].thuAvailability)
            setFri(res.data[0].friAvailability)
            setStatuss(res.data[0].status)
            setWeekDayOnly(res.data[0].weekDayOnly)
            setSlotDuration(res.data[0].slotDuration)
            setFromTime(res.data[0].fromTime)
            setToTime(res.data[0].toTime)

           
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
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Monday Availibility</Form.Label>
                            <Form.Control type="text" value={mon} onChange={(e) => setMon(e.target.value)} name=""
                            placeholder="Service Description" required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Tuesday Availibility</Form.Label>
                            <Form.Control defaultValue={tue} onChange={(e) => setTue(e.target.value)} type="text" name=""
                            placeholder="Payment Required" required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Wednesday Availibility</Form.Label>
                            <Form.Control type="text" name="" value={wed} onChange={(e) => setWed(e.target.value)} 
                            placeholder="Contract Required" required/>
                        </Form.Group>


                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Thursday Availibility</Form.Label>
                            <Form.Control type="text" name="" value={thurs} onChange={e => setThurs(e.target.value)}
                             placeholder="Updated By" required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Friday Availibility</Form.Label>
                            <Form.Control type="text" name="" value={fri} onChange={e => setFri(e.target.value)}
                             placeholder="Updated By" required/>
                        </Form.Group>

                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>WeekDay Only</Form.Label>
                            <Form.Control type="text" name="" value={weekDayOnly} onChange={e => setWeekDayOnly(e.target.value)}
                             placeholder="Updated By" required/>
                        </Form.Group>

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

                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Status</Form.Label>
                            <Form.Control type="text" name="" value={statuss} onChange={e => setStatuss(e.target.value)}
                             placeholder="Status" required/>
                        </Form.Group>
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





// <Form onSubmit={submitForm}  >
//                             <div className="row m-4">
                       
                       
         
                      

                            
//                         <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
//                             <Form.Label>Contract Id  <b>(Required)</b></Form.Label>
//                             <Form.Control  value={contractId} onChange={(e) => setContractId(e.target.value)} type="number" name=""
//                             placeholder="Enter Contract Id" required />
//                         </Form.Group>

//                         <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
//                             <Form.Label>Doctor Id  <b>(Required)</b></Form.Label>
//                             <Form.Control  value={docId} onChange={(e) => setDocId(e.target.value)} type="number" name=""
//                             placeholder="Enter Contract Id" required />
//                         </Form.Group>
                        
                     

                              
//                         <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
//                         <label htmlFor="fri">WeekDay Only  <b>(Required)</b></label>
//                         <select name="fri" value={weekDayOnly} onChange={(e) => setWeekDayOnly(e.target.value)} placeholder="Select Availibility" required className="form-control">
//                     <option>Select Availibility</option>
    
//                     <option value='1'>Yes</option>
//                     <option value='0'>No</option>
//                         </select>
//                         </Form.Group>
                      


//                         <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
//                         <label htmlFor="mon">Monday Availibility  <b>(Required)</b></label>
//                         <select name="mon" value={mon} onChange={(e) => setMon(e.target.value)} placeholder="Select Availibility" required className="form-control">
//                     <option>Select Availibility</option>
    
//                     <option value='1'>Yes</option>
//                     <option value='0'>No</option>
//                         </select>
//                         </Form.Group>
                      


                        
//                         <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
//                         <label htmlFor="tue">Tuesday Availibility  <b>(Required)</b></label>
//                         <select name="tue" value={tue} onChange={(e) => setTue(e.target.value)} placeholder="Select Availibility" required className="form-control">
//                     <option>Select Availibility</option>
    
//                     <option value='1'>Yes</option>
//                     <option value='0'>No</option>
//                         </select>
//                         </Form.Group>

                        
//                         <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
//                         <label htmlFor="wed">Wednesday Availibility  <b>(Required)</b></label>
//                         <select name="wed" value={wed} onChange={(e) => setWed(e.target.value)} placeholder="Select Availibility" required className="form-control">
//                     <option>Select Availibility</option>
    
//                     <option value='1'>Yes</option>
//                     <option value='0'>No</option>
//                         </select>
//                         </Form.Group>

                        
//                         <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
//                         <label htmlFor="thurs">Thursday Availibility  <b>(Required)</b></label>
//                         <select name="thurs" value={thurs} onChange={(e) => setThurs(e.target.value)} placeholder="Select Availibility" required className="form-control">
//                     <option>Select Availibility</option>
    
//                     <option value='1'>Yes</option>
//                     <option value='0'>No</option>
//                         </select>
//                         </Form.Group>
                      
                      
                      
//                         <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
//                         <label htmlFor="fri">Friday Availibility  <b>(Required)</b></label>
//                         <select name="fri" value={fri} onChange={(e) => setFri(e.target.value)} placeholder="Select Availibility" required className="form-control">
//                     <option>Select Availibility</option>
    
//                     <option value='1'>Yes</option>
//                     <option value='0'>No</option>
//                         </select>
//                         </Form.Group>
                      



                        
              
                       


//                         <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
//                             <Form.Label>Enter Slot Duration  <b>(Required)</b></Form.Label>
//                             <Form.Control  value={slotDuration} onChange={(e) => setSlotDuration(e.target.value)} type="number" name=""
//                             placeholder="Enter Slot Duration" required />
//                         </Form.Group>
                        
                     
             

//                 <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
//                             <Form.Label>Slot Start time</Form.Label>
//                             <Form.Control type="Time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} name=""
//                             placeholder="Slot Start Time" required/>
//                         </Form.Group>
                        
//                         <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
//                             <Form.Label>Slot End Time</Form.Label>
//                             <Form.Control value={totime} onChange={(e) => setToTime(e.target.value)} type="Time" name=""
//                             placeholder="Slot End Time" required/>
//                         </Form.Group>
                    
                       
//                         <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
//                         <label htmlFor="fri">Set Status  <b>(Required)</b></label>
//                         <select name="fri" value={statuss} onChange={(e) => setStatuss(e.target.value)} placeholder="Select Availibility" required className="form-control">
//                     <option>Select Status</option>
    
//                     <option value='1'>Active</option>
//                     <option value='0'>Inactive</option>
//                         </select>
//                         </Form.Group>
                    
                     
//                         </div>
//                         <div className="col-md-12 text-center">
//                             <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
//                         </div>
//                         </Form>






