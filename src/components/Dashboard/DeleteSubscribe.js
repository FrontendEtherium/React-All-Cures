import React, { useState, useEffect } from 'react';

import { Form } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import Heart from"../../assets/img/heart.png";
import { Link } from 'react-router-dom'
import axios from 'axios';
import { backendHost } from '../../api-config';

import '../../assets/healthcare/css/main.css';
import Input from '@material-ui/core/Input';
import { Select, MenuItem } from '@material-ui/core'
import  axiosInstance from '../../axiosInstance';
function LoginInfo(props) {  
const[number,setNumber] = useState('');
    const [type,setType] = useState([])
    const [disease, setDisease] = useState([])
    const [cures, setCures] = useState([])
    const [diseaseList, setDiseaseList] = useState([])
    const setMail = (event)=>{
        setNumber({ ...number,Mail: event.target.value})
    }
    
    useEffect(() => {
        const getEmail = props.location.search
        axios.post(`${backendHost}/users/getemdecrypt`,
            {
                "email":getEmail.split('em=')[1]
            })
            .then(res => {
            setNumber(res.data)
            })
        getDisease()
        // eslint-disable-next-line
    }, [])

     const handleSelect = function(countries) {
        const flavors = [];
        for (let i=0; i<countries.length; i++) {
            flavors.push(countries[i].value);
        }
        setType(flavors);
    }
    const getDisease = () => {
        axiosInstance.get(`/article/all/table/disease_condition`)
        .then(res => {
            setDiseaseList(res.data)
        })
        .catch(err =>{return})
    }

    return (
        <>
                        <div className="profilePage">
                <div className="comman-pg-header">
                    <section className="pageHeader zIndex-2 h-auto">
                    <div className="container">
                    <div className="row">
                        <div className="header" style={{width:"100%"}}>
                        <div className="logo"> 
                            <Link to='/home'>
                                <img src={Heart} alt="All Cures Logo"/>
                                <span>All Cures</span>
                            </Link>
                        </div>
    
                        <div className="loginSign">
                            {/* <ToggleButton acPerm={acPerm} url={props.url} logout={logout}/>  */}
                        </div>   	
                        </div>
                    </div>
                    </div>
                    </section>
                </div>
                 </div>
                        <div className="container">
                <div className="p text-center my-3">We Didnt feel good as you have unscbscribed us . Hope You wil subscribe as soon</div>
        <div className="card mb-5">
      
                   
                        <form>
                       
                           
      <div className="row">
                  
      <div className="col-lg-6 form-group">
                    <label htmlFor="">Type</label>
                    <select 
                    multiple
               
                    name="type" placeholder="Type" 
                    value={type} 
                    
                    onChange={(e)=> {
                        handleSelect(e.target.selectedOptions)
                    }}
                    required className="form-control">
                        <option value="1">All</option>
                        <option value="2">Disease</option>
                        <option value="3">Cures</option>
                    </select>
                </div>
                       <Form.Group className="col-lg-6  " style={{zIndex: 1}}>
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control disabled onChange={setMail} value={number} type="Email" name="" required/>
                            </Form.Group>


                              {   
                    type?
                    type.indexOf('2') === -1 
                    ? null 
                    :                             <div className="col-lg-6 form-group">
                    <label htmlFor="">Disease</label>
                        <Select multiple
                        value={disease}
                        onChange={(e) =>  setDisease(e.target.value)}
                        input={<Input id="select-multiple-chip" />}
                        // MenuProps={MenuProps}
                        className="form-control">
                        {diseaseList.map((lan) => {
                            return (
                                <MenuItem key={lan[0]}value={lan[0]} >
                                    {lan[1]}
                                </MenuItem>
                            )
                        })}
                        </Select>
                </div>
                    : null
                } 
                  {   
                    type?
                    type.indexOf('3') === -1 
                    ? null 
                    :  <div className="col-lg-6 form-group">
                    <label htmlFor="">Cure</label>
                        <Select multiple
                        value={cures}
                        onChange={(e) =>  setCures(e.target.value)}
                        input={<Input id="select-multiple-chip" />}
                        // MenuProps={MenuProps}
                        className="form-control">
                        {diseaseList.map((lan) => {

                            return (
                                <MenuItem key={lan[0]}value={lan[0]} >
                                    {lan[1]}
                                </MenuItem>
                            )
                        })}
                        </Select>
                </div>
                    : null
                } 
                
                
                </div> 
                       
      <div className="d-flex flex-column align-items-sm-center">
                            </div>
                        </form>
                    </div>
                </div>
        
            <Footer/>
            </>
      );
    }

    export default LoginInfo;       