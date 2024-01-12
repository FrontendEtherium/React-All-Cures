
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { backendHost } from '../../../api-config';
import { Link } from 'react-router-dom'
import { Alert, Form } from 'react-bootstrap';
import  { userId} from '../../UserId'





function DoctorAvailibility() {
 
  const [alertMessage, setAlertMessage] = useState('');
 

  const [contractId, setContractId] = useState();
  const [docId, setDocId] = useState();
  const [slotDuration, setSlotDuration] = useState();
  const [fromTime, setFromTime] = useState();
  const [totime, setToTime] = useState();
  const [weekDayOnly, setWeekDayOnly] = useState();
  const [statuss, setStatuss] = useState();
  const [mon, setMon] = useState();
  const [tue, setTue] = useState();
  const [wed,setWed] = useState();
  const [thurs, setThurs] = useState();
  const[fri,setFri]=useState();
  const [createdBy, setCreatedBy] = useState();




  const submitForm = async (event) => {
  event.preventDefault();

 

  function formatTime(time) {
    // Assuming time is in "hh:mm" format
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}:00`;
}


    const AdMap = {
      "ContractID":parseInt(contractId),
      "MonAvailability":parseInt(mon) ,
      "TueAvailability": parseInt(tue),
      "WedAvailability": parseInt(wed),
      "ThuAvailability": parseInt(thurs),
      "FriAvailability": parseInt(fri),
      "WeekDayOnly":parseInt(weekDayOnly),
      "DocID":parseInt(docId),
      'SlotDuration(min)': parseInt(slotDuration),
      "FromTime": formatTime(fromTime),
      "ToTime":formatTime(totime),
      "Status":parseInt(1) ,
      "CreatedBy": parseInt(userId),
       
    };
  
    // Log AdMap data before sending
 // Convert AdMap object to JSON and append it to formData
    
  

    axios.post(`${backendHost}/video/add/doctor/schedule`, AdMap, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    .then((response) => {
      if (response.data === 1) {
        setAlertMessage('Availability created successfully!!');
      } else if (response.data === 0) {
        setAlertMessage('Availability not created. Please check all fields and try again.');
      } else {
        setAlertMessage('An error occurred. Please contact the development team.');
      }

      setTimeout(() => {
        setAlertMessage('');
      }, 3000); // Hide alert after 3 seconds
    })
    .catch((error) => {
      console.error('Error creating Availability:', error);
      setAlertMessage('An error occurred. Please contact the development team.');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000); // Hide alert after 3 seconds
    });

  };
  

useEffect(() => {
  

}, []) 



  return (
      
  
          
          <div className="promo-page">
                <div className="container">
                <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom"> <b> (Doctor Availibility)</b></div>
                        <Form onSubmit={submitForm}  >
                            <div className="row m-4">
                       
                       
         
                      

                            
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Contract Id  <b>(Required)</b></Form.Label>
                            <Form.Control  value={contractId} onChange={(e) => setContractId(e.target.value)} type="number" name=""
                            placeholder="Enter Contract Id" required />
                        </Form.Group>

                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Doctor Id  <b>(Required)</b></Form.Label>
                            <Form.Control  value={docId} onChange={(e) => setDocId(e.target.value)} type="number" name=""
                            placeholder="Enter Contract Id" required />
                        </Form.Group>
                        
                     

                              
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="fri">WeekDay Only  <b>(Required)</b></label>
                        <select name="fri" value={weekDayOnly} onChange={(e) => setWeekDayOnly(e.target.value)} placeholder="Select Availibility" required className="form-control">
                    <option>Select Availibility</option>
    
                    <option value='1'>Yes</option>
                    <option value='0'>No</option>
                        </select>
                        </Form.Group>
                      


                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="mon">Monday Availibility  <b>(Required)</b></label>
                        <select name="mon" value={mon} onChange={(e) => setMon(e.target.value)} placeholder="Select Availibility" required className="form-control">
                    <option>Select Availibility</option>
    
                    <option value='1'>Yes</option>
                    <option value='0'>No</option>
                        </select>
                        </Form.Group>
                      


                        
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="tue">Tuesday Availibility  <b>(Required)</b></label>
                        <select name="tue" value={tue} onChange={(e) => setTue(e.target.value)} placeholder="Select Availibility" required className="form-control">
                    <option>Select Availibility</option>
    
                    <option value='1'>Yes</option>
                    <option value='0'>No</option>
                        </select>
                        </Form.Group>

                        
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="wed">Wednesday Availibility  <b>(Required)</b></label>
                        <select name="wed" value={wed} onChange={(e) => setWed(e.target.value)} placeholder="Select Availibility" required className="form-control">
                    <option>Select Availibility</option>
    
                    <option value='1'>Yes</option>
                    <option value='0'>No</option>
                        </select>
                        </Form.Group>

                        
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="thurs">Thursday Availibility  <b>(Required)</b></label>
                        <select name="thurs" value={thurs} onChange={(e) => setThurs(e.target.value)} placeholder="Select Availibility" required className="form-control">
                    <option>Select Availibility</option>
    
                    <option value='1'>Yes</option>
                    <option value='0'>No</option>
                        </select>
                        </Form.Group>
                      
                      
                      
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="fri">Friday Availibility  <b>(Required)</b></label>
                        <select name="fri" value={fri} onChange={(e) => setFri(e.target.value)} placeholder="Select Availibility" required className="form-control">
                    <option>Select Availibility</option>
    
                    <option value='1'>Yes</option>
                    <option value='0'>No</option>
                        </select>
                        </Form.Group>
                      



                        
              
                       


                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Slot Duration  <b>(Required)</b></Form.Label>
                            <Form.Control  value={slotDuration} onChange={(e) => setSlotDuration(e.target.value)} type="number" name=""
                            placeholder="Enter Slot Duration" required />
                        </Form.Group>
                        
                     
             

                <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Slot Start time</Form.Label>
                            <Form.Control type="Time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} name=""
                            placeholder="Slot Start Time" required/>
                        </Form.Group>
                        
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Slot End Time</Form.Label>
                            <Form.Control value={totime} onChange={(e) => setToTime(e.target.value)} type="Time" name=""
                            placeholder="Slot End Time" required/>
                        </Form.Group>
                    
                       
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="fri">Set Status  <b>(Required)</b></label>
                        <select name="fri" value={statuss} onChange={(e) => setStatuss(e.target.value)} placeholder="Select Availibility" required className="form-control">
                    <option>Select Status</option>
    
                    <option value='1'>Active</option>
                    <option value='0'>Inactive</option>
                        </select>
                        </Form.Group>
                    
                     
                        </div>
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </Form>
                    </div>

                    {alertMessage && (
          <Alert variant="danger" className="h6 mx-3">
            {alertMessage}
          </Alert>
        )}

               
                </div>
            </div>
   
   
       
       
        

  );
}


export default DoctorAvailibility
