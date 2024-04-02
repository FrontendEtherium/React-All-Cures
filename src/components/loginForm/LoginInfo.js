 import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { Form, Dropdown, DropdownButton } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import Heart from"../../assets/img/heart.png";
import { useHistory, Link} from 'react-router-dom'
import axios from 'axios';
import { backendHost } from '../../api-config';
import headers from '../../api-fetch';
function LoginInfo(props) {  

    const [password, setPassword] = useState({
          firstPassword: "",
          secondPassword: "",
         });
    const [alert, setSubmitAlert] = useState(false)
    const acPerm = Cookies.get('acPerm')
    const [states, setStates] = useState([])
    const [uprn, setUprn] = useState('')
    const [selectedState, setSelectedState] = useState('')
    const [regNum, setRegNumber] = useState('')

    const [
        validLength,
        upperCase,
        lowerCase,
        match
    ] = usePasswordValidation({
    firstPassword: password.firstPassword,
    secondPassword: password.secondPassword,
    });
    
    const setFirst = (event) => {
      setPassword({ ...password, firstPassword: event.target.value });
    };
    const setSecond = (event) => {
      setPassword({ ...password, secondPassword: event.target.value });
    };

    const history = useHistory();

    const routeChange = (docid) =>{ 
        let path = `/profile/${docid}`; 
        history.push(path);
    }

    const submitForm = async (e) => {
        e.preventDefault()
        setSubmitAlert(true)
        if(validLength && upperCase && lowerCase && match && uprn && regNum && password.firstPassword && selectedState){
            axios.post(`${backendHost}/doctors/verification`, {
                "uprn": uprn,
                "registration_number": regNum,
                "password": password.firstPassword,
                "stateid": selectedState,
                "email": 'anil3.kumar@test.com',
                })
            .then(res => {
                routeChange(res.data)
            })
            .catch(err => {
                return
            })
    
        }
    }
    
    useEffect(() => {
        Promise.all([
            fetch(`${backendHost}/article/all/table/states`,{
                headers: headers
            }).then(res => res.json()),
        ]).then(([statesData]) => {
                setStates(statesData);
            });
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
    
                        <div className="loginSign">
                            <ToggleButton acPerm={acPerm} url={props.url} logout={logout}/> 
                        </div>   	
                        </div>
                    </div>
                    </div>
                    </section>
                </div>
                 </div>
                        <div className="container">
                <div className="h2 text-center my-3">Let us know you better!</div>
        <div className="card mb-5">
                    <div className="card-body">
                        <form>
                        <div className='LoginInfo'>
                            
                        
    
      </div>
                            <Form.Group className="col-md-12 float-left" style={{zIndex: 1}}>
                                 <Form.Label>UPNR</Form.Label>
                                 <Form.Control value={uprn} onChange={(e) => setUprn(e.target.value)} type="text" name=""
                                     placeholder="Enter your UPNR here" required/>
                            </Form.Group>
                            
                            <Form.Group className="col-md-6 float-left" style={{zIndex: 1}}>
                                        <Form.Label>Select State</Form.Label>
                                        <Form.Control value={selectedState} onChange={(e)=>setSelectedState(e.target.value)} as="select" name="authById" custom
                                        required>
                                            <option>Open this select menu</option>
                                            {states.map((i) => (
                                                <option value={i[0]}>
                                                    {i[1]}
                                                </option>                                                
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="col-md-6 float-left" style={{zIndex: 1}}>
                                 <Form.Label>Registration Number</Form.Label>
                                 <Form.Control value={regNum} onChange={(e)=>setRegNumber(e.target.value)} type="text" name=""
                                     placeholder="Enter your Registration/MIN ID here" required/>
                            </Form.Group>
                            <Form.Group className="col-md-6 float-left" style={{zIndex: 1}}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={setFirst} type="password" name="" placeholder="Enter Password" required/>
                            </Form.Group>
                            <Form.Group className="col-md-6 float-left" style={{zIndex: 1}}>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control  type="password" name="" onChange={setSecond} placeholder="Confirm password" required/>
                            </Form.Group>
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
                                  {/* <li className="m-3">
                                    {specialChar ? null : <span className="px-3 py-1 alert-danger">Should contain at least one special character</span>}
                                  </li> */}
                              </ul>
                              </div>
                            //   :null
                              : null
                            }
                            <div className="col-md-12 text-center">
                            <button onClick={submitForm} className="btn btn-dark col-md-12">Submit</button>
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