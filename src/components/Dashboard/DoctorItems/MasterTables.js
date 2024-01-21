
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendHost } from '../../../api-config';
import { Alert, Form } from 'react-bootstrap';
import { userId } from '../../UserId';





function App() {
  const [first, setFirst] = useState();
  const [middle, setMiddle] = useState();
  const [last, setLast] = useState();
  const [status,setStatus] = useState('')
  const [authorAddr, setAddr] = useState()
  const [emaill, setEmail] = useState()
  const [type,setType] = useState()
  const[id,setId] = useState()
 const[pinCode,setPinCode] = useState()
  const[hospital,setHospital] = useState()
  const[others,setOthers] = useState()
  const[spl,setSpl] = useState('')
  const[splName,setSplName] = useState('')
  const[cityCode,setCityCode] = useState('')
  const[cityName,setCityName] = useState('')
  const[state, setState] = useState('')
    const[stateList,setStateList] = useState([])
    const[splId,setSplId] = useState()
    const [countriesList,setCountriesList] = useState([])
  const [country, setCountry] = useState('')
  const [stateName, setStateName] = useState()
  const[countryName,setCountryName] = useState()
  const [alert,setAlert] = useState()
  const [hospitalAlert,setHospitalAlert] = useState()
  const [specialtiesAlert,setSpecialtiesAlert] = useState()
  const [cityAlert,setCityAlert] = useState()
  const [stateAlert,setStateAlert] = useState()
  const [countryAlert,setCountryAlert] = useState()
  const [user,setUser] = useState()
  const [article,setArticle] = useState()
  const[search,setSearch] = useState()
  
  const submitForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}/sponsored/create/service`, {
        "ServiceName": first,
        "ServiceDesc": middle,
        "PaymentReq": parseInt(last, 10), 
        "ContractReq": parseInt(type, 10),
        "CreatedBy": parseInt(userId),
        "Status": parseInt(status, 10),
    })
    .then(res => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 4000);
    })
    .catch(res => console.log(res))
}



const hospitalForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}/payment/add  `, {
        // "hospitalid": parseInt(hospitalId),
        "ServicePaymentMasterName": hospital,
        "ServicePaymentDesc": others,
        "CreatedBy":parseInt(userId),
        "Status":1
    })
    .then(res => {
        setHospitalAlert(true)
        setTimeout(() => {
            setHospitalAlert(false)
        }, 4000);
    })
    .catch(res => console.log(res))
}

const favouriteForm = (e,user_id,article_id) => {
    e.preventDefault();
    axios.post(`${backendHost}/data/create  `, {
        // "hospitalid": parseInt(hospitalId),
        "iemi" :122,
        "user_id": 2,
        "search" : 'ffff'
    })
    .then(res => {
        setHospitalAlert(true)
        setTimeout(() => {
            setHospitalAlert(false)
        }, 4000);
    })
    .catch(res => console.log(res))
}

const specialtiesForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}/video/add/failure/reason `, {
        // "splid": parseInt(spl),
        "Reasons": splName,
        "Refund":parseInt(spl),
        "Penalty":parseInt(emaill),
        "CreatedBy":parseInt(userId),
    })
    .then(res => {
        setSpecialtiesAlert(true)
        setTimeout(() => {
            setSpecialtiesAlert(false)
        }, 4000);
    })
    .catch(res => console.log(res))
}

const cityForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}/admin/create/city  `, {
        // "citycode": parseInt(cityCode),
        "cityname": cityName,
        "state_code":parseInt(state),
        "country_code":parseInt(country),
        "pincode":parseInt(pinCode)
    })
    .then(res => {
        setCityAlert(true)
        setTimeout(() => {
            setCityAlert(false)
        }, 4000);
    })
    .catch(res => console.log(res))
}

const statesForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}/admin/create/states  `, {
        // "codeid": parseInt(state),
        "statename":stateName,
        "country_code":parseInt(country),
    })
    .then(res => {
        setStateAlert(true)
        setTimeout(() => {
            setStateAlert(false)
        }, 4000);
    })
    .catch(res => console.log(res))
}

const countriesForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}/admin/create/countries  `, {
        // "countrycodeid": parseInt(country),
        "countryname":countryName,
       
    })
    .then(res => {
        setCountryAlert(true)
        setTimeout(() => {
            setCountryAlert(false)
        }, 4000);
    })
    .catch(res => console.log(res))
}
 


const getState = () => {
    axios.get(`${backendHost}/article/all/table/states`)
    .then(res => {
        
        setStateList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}

const getSpecialties = () => {
    axios.get(`${backendHost}/article/all/table/specialties`)
    .then(res => {
        
        setSplId(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}
const getCountries = () => {
    axios.get(`${backendHost}/article/all/table/countries`)
    .then(res => {
        
        setCountriesList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}


useEffect(() => {
     getState()
     getCountries()   
     getSpecialties()
 
}, []) 
  return (
      
  
          
          <div className="promo-page">
                <div className="container">
                <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom"><b> (Create Sponsored Services )</b></div>
                        <form onSubmit={submitForm}>
                            <div className="row m-4">
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Sponsored Service Name</Form.Label>
                            <Form.Control value={first} onChange={(e) => setFirst(e.target.value)}  type="text" name=""
                            placeholder="Enter Sponsored Service Name..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-12 float-left"  style={{zIndex: 2}}>
                            <Form.Label>Enter Sponored Service Description</Form.Label>
                          
                            <Form.Control
        Value={middle}
        onChange={(e) => setMiddle(e.target.value)}
        as="textarea"
        placeholder="Enter Sponored Service Description" 
        style={{ height: '100px' } }
        required />
                             
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
  <Form.Label>Payment Require ?</Form.Label>
  <div>
    <Form.Check
      inline
      label="Yes"
      name="whatsapp"
      type="radio"
     
      value="1"
      onChange={(e) => setLast(e.target.value)}
      style={{ marginRight: "20px" }}
    />
    <Form.Check
      inline
      label="No"
      name="whatsapp"
      type="radio"
     
      value="0"
      onChange={(e) => setLast(e.target.value)}
      style={{ marginLeft: "20px" }}
    />
  </div>
</Form.Group>
                   
<Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
  <Form.Label>Contract Require ?</Form.Label>
  <div>
    <Form.Check
      inline
      label="Yes"
      name="whatsappss"
      type="radio"
     
      value="1"
      onChange={(e) => setType(e.target.value)}
      style={{ marginRight: "20px" }}
    />
    <Form.Check
      inline
      label="No"
      name="whatsappss"
      type="radio"
     
      value="0"
      onChange={(e) => setType(e.target.value)}
      style={{ marginLeft: "20px" }}
    />
  </div>
</Form.Group>

<Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
  <Form.Label>Status ?</Form.Label>
  <div>
    <Form.Check
      inline
      label="Active"
      name="whatsapps"
      type="radio"
     
      value="1"
      onChange={(e) => setStatus(e.target.value)}
      style={{ marginRight: "20px" }}
    />
    <Form.Check
      inline
      label="InActive"
      name="whatsapps"
      type="radio"
     
      value="0"
      onChange={(e) => setStatus(e.target.value)}
      style={{ marginLeft: "20px" }}
    />
  </div>
</Form.Group>
                      
                        {
                            alert?
                                <Alert variant="success" className="h6 mx-3">Sponsored service Create successfully!!</Alert>
                                : null
                        }
                     
                        </div>
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>


                    <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom"><b>Service Payment Master </b></div>
                        <form onSubmit={hospitalForm}>
                            <div className="row m-4">
                    
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Payment Gateway Name</Form.Label>
                            <Form.Control value={hospital} onChange={(e) => setHospital(e.target.value)}  type="text" name=""
                            placeholder="Enter Payment Gateway Name..." required/>
                        </Form.Group>

                        <Form.Group className="col-md-12 float-left"  style={{zIndex: 2}}>
                            <Form.Label>Enter Payment Gateway Description</Form.Label>
                          
                            <Form.Control
        Value={others}
        onChange={(e) => setOthers(e.target.value)}
        as="textarea"
        placeholder="Enter Payment Gateway Description" 
        style={{ height: '100px' } }
        required />
                             
                        </Form.Group>

                        {
                            hospitalAlert?
                                <Alert variant="success" className="h6 mx-3">Paymnet Gateway Create successfully!!</Alert>
                                : null
                        }
                   
                     
                        </div>
                     
                      
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>

                   

                    <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom">Failure Master Table</div>
                        <form onSubmit={specialtiesForm}>
                            <div className="row m-4">
                     
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Failure Reasons</Form.Label>
                            <Form.Control value={splName} onChange={(e) => setSplName(e.target.value)}  type="text" name=""
                            placeholder="Enter Failure Reasons..." required/>
                        </Form.Group>

                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Refund (IF ANY)</Form.Label>
                            <Form.Control value={spl} onChange={(e) => setSpl(e.target.value)}  type="text" name=""
                            placeholder="Enter Refund (IF ANY)..." />
                        </Form.Group>

                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Penalty (IF ANY)</Form.Label>
                            <Form.Control value={emaill} onChange={(e) => setEmail(e.target.value)}  type="text" name=""
                            placeholder="Enter Penalty (IF ANY)..." />
                        </Form.Group>
                    
                        {
                            specialtiesAlert?
                                <Alert variant="success" className="h6 mx-3"> Created successfully!!</Alert>
                                : null
                        }
                        
                        </div>
                     
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>

                 
                </div>
            </div>
   
   
       
       
        

  );
}

export default App;
