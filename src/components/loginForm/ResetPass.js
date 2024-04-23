import React, { useState, useEffect } from 'react';

import Cookies from 'js-cookie';
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { Alert,Form, Dropdown, DropdownButton } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import Heart from"../../assets/img/heart.png";
import { Link } from 'react-router-dom'
import axios from 'axios';
import { backendHost } from '../../api-config';

function LoginInfo(props) {  
    const[email,setEmail] = useState('');
    const [password, setPassword] = useState({
          firstPassword: "",
          secondPassword: "",
         });
    const [alert, setSubmitAlert] = useState(false)
    const acPerm = Cookies.get('acPerm')
    const [submitAlert, setAlert] = useState(false)
    const [notAlert, noAlert] = useState(false)
    const [errAlert, erAlert] = useState(false)
    const getEmail = props.location.search

    const [
        validLength,
        upperCase,
        lowerCase,
        match,
    ] = usePasswordValidation({
        Mail: email.Mail,
    firstPassword: password.firstPassword,
    secondPassword: password.secondPassword,
    });
    
    const setMail = (event)=>{
        setEmail({ ...email,Mail: event.target.value})
    }
    const setFirst = (event) => {
      setPassword({ ...password, firstPassword: event.target.value });
    };
    const setSecond = (event) => {
      setPassword({ ...password, secondPassword: event.target.value });
    };

    

    const submitForm = async (e) => {
        e.preventDefault()
       
        setSubmitAlert(true)    
        if(validLength && upperCase && lowerCase && match && password.firstPassword){
            axios.put(`${backendHost}/users/updatepassword`, {
                "updated_password": password.firstPassword,
                "email": email,
                })
            .then(res => {
                if(parseInt(res.data) === 1){
                    setAlert(true)
                setTimeout(()=>{
                    window.location.href="/home";
                },100000)
               
          
            }else if(res.data === "Sorry, the email address you entered does not exist in our database."){
                noAlert(true)
                setTimeout(()=>{
                    noAlert(false)
                },4000)
            }
            else if(parseInt(res.data) === 0){
                erAlert(true)
                setTimeout(()=>{
                    noAlert(false)
                },4000)
            }
          
        }
            )
            .catch(err => {return
            })
    
        }
    }
    
    useEffect(() => {

        // const params = new URLSearchParams(location.search);
        // const getEmail= params.get('em');       
         axios.post(`${backendHost}/users/getemdecrypt`,
         {
             "email":getEmail.split('em=')[1]
         })
         .then(res => {
            setEmail(res.data)
         })
         // eslint-disable-next-line
        }, [])

    const logout = async e => {
        const res = await fetch(`${backendHost}/LogoutActionController`, {
           method: "POST"
        });
        setTimeout(() => {
           window.location.reload()
        }, 1000);
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
    
                       
                        </div>
                    </div>
                    </div>
                    </section>
                </div>
                 </div>
                        <div className="container">
                <div className="h2 text-center my-3">Reset Your Password</div>
        <div className="card mb-5">
                    <div className="card-body">
                        <form>
                        <div className='LoginInfo'>
                            
                        
    
      </div>
                           
                            
                       <div className="d-flex flex-column  align-items-md-center">
                       <Form.Group className="col-md-6  " style={{zIndex: 1}}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control onChange={setMail} value={email} type="Email" name="" placeholder="Enter Email" required/>
                            </Form.Group>
                            <Form.Group className="col-md-6  " style={{zIndex: 1}}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={setFirst} type="password" name="" placeholder="Enter Password" required/>
                            </Form.Group>
                            <Form.Group className="col-md-6 " style={{zIndex: 1}}>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control  type="password" name="" onChange={setSecond} placeholder="Confirm password" required/>
                            </Form.Group>
                            </div>
                            {
                                alert?
                                <div>
                                <ul>
                                  <li className="m-3">
                                    {validLength ? <span className="px-3 py-1 alert-success">Contains minimum amount of characters</span> : <span className="px-3 py-1 alert-danger">Minimum 8 characters required</span>}
                                  </li>
                                  {/* <li className="m-3">
                                    {hasNumber ? null : <span className="px-3 py-1 alert-danger">Should contain at least one numeric character</span>}
                                  </li> */}
                                  <li className="m-3">
                                    {upperCase ? <span className="px-3 py-1 alert-success">Contains uppercase character</span> : <span className="px-3 py-1 alert-danger">Should contain at least one uppercase character</span>}
                                  </li>
                                  <li className="m-3">
                                    {lowerCase ? <span className="px-3 py-1 alert-success">Contains Lowercase</span> : <span className="px-3 py-1 alert-danger">Should contain at least one lowercase character</span>}
                                  </li>
                                  <li className="m-3">{match ? <span className="px-3 py-1 alert-success">Passwords match</span> : <span className="px-3 py-1 alert-danger">Passwords do not match</span>}</li>
                              </ul>
                              </div>
                              : null
                            }

{
                   submitAlert?
                   <Alert variant="success" className="h6 mx-3">Password reset successfully!!</Alert>
                   : null
                             }
                             
                             {
                   notAlert?
                   <Alert variant="danger" className="h6 mx-3">Email not found</Alert>
                   : null
                             }
{
                  errAlert?
                   <Alert variant="danger" className="h6 mx-3">Error in Resetting</Alert>
                   : null
                             }
                            <div className="d-flex flex-column align-items-sm-center">
                            <button onClick={submitForm} className="btn btn-dark col-md-4">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
            </>
      );
    }
    function ToggleButton(props) {
        if(props.acPerm){
            return(
                <DropdownButton style={{background: 'white'}} title="Hi there!">
                <Dropdown.Item >
                <Link to="/dashboard">
                   Dashboard
               </Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={props.logout}>Logout</Dropdown.Item>
             </DropdownButton>
            );
        }
        return(
            <Link 
             className="btn-white loginSignbtn color-blue-dark" 
             to={{pathname: props.url, search: '?login=true', state: {open: true}}}
            >
                Sign Up
            </Link>
        )
    }
    export default LoginInfo;
