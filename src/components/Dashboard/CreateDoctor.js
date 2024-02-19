
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { backendHost } from '../../api-config';
import { Link } from 'react-router-dom';
import AllPost from './Allpost';
import { Alert, Form } from 'react-bootstrap';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { userId } from '../UserId';



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
  const[docIdList,setDocIdList]=useState()
  const[docId,setDocId]=useState()
  const[addressType,setAddressType]=useState("")
  const[add,setAdd]=useState()
  const[addrss,setAddrss]=useState()
  const[cityList,setCityList]=useState()
  const [degree,setDegree]=useState()
  const[degreeStatus,setDegreeStatus]=useState()

  const[univName,setUnivName]=useState()
  const[univCity,setUnivCity]=useState()
  const [univState,setUnivState]=useState()
  const[univStatus,setUnivStatus]=useState()
  const[univCountry,setUnivCountry]=useState()
  const[univList,setUnivList]=useState()
  const[degreeList,setDegreeList]=useState()

  const[doctorName,setDoctorName]=useState()
  const[degreeName,setDegreeName]=useState()
  const[year,setYear]=useState()
  const[university,setUniversity]=useState()

  const [docAddressAlert,setDocAddressAlert] = useState()
  const [docDegreesAlert,setDocDegreesAlert] = useState()
  const [masterAddressTypeAlert,setMasterAddressTypeAlert] = useState()
  const [masterDocDegreesAlert,setMasterDocDegreesAlert] = useState()
  const [masterUniversityAlert,setMasterUniversityAlert] = useState()



  
  const submitForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}/admin/create/author  `, {
        "author_firstname": first,
        "author_middlename": middle,
        "author_lastname": last,
        "author_status": 1,
        "reg_type": 1,
        "author_email": emaill,
        "reg_doc_pat_id":parseInt(id),
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
    axios.post(`${backendHost}/admin/create/hospital  `, {
        // "hospitalid": parseInt(hospitalId),
        "hospital_affliated": hospital,
        "others": others,
    })
    .then(res => {
        setHospitalAlert(true)
        setTimeout(() => {
            setHospitalAlert(false)
        }, 4000);
    })
    .catch(res => console.log(res))
}

const favouriteForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}/admin/create/masteraddresstype  `, {
        // "hospitalid": parseInt(hospitalId),
        "AddressType" :user,
        "CreatedBy": parseInt(userId),
        "UpdatedBy" : parseInt(userId)
    })
    .then(res => {
        setMasterAddressTypeAlert(true)
        setTimeout(() => {
            setHospitalAlert(false)
        }, 4000);
    })
    .catch(res => console.log(res))
}

const degreeForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}/admin/create/masterdocdegrees `, {
        // "hospitalid": parseInt(hospitalId),
        "DegDesc" :degree,
        "CreatedBy": parseInt(userId),
        "UpdatedBy" : parseInt(userId),
        "status":parseInt(degreeStatus)
    })
    .then(res => {
        setMasterDocDegreesAlert(true)
        setTimeout(() => {
            setHospitalAlert(false)
        }, 4000);
    })
    .catch(res => console.log(res))
}
const universtyForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}/admin/create/masteruniversities  `, {
        // "hospitalid": parseInt(hospitalId),
        "UnivName" :univName,
        "UnivCity":univCity,
        "UnivState":univState,
        "Status":parseInt(univStatus),
        "UnivCountry":univCountry,
        "CreatedBy": parseInt(userId),
        "UpdatedBy" : parseInt(userId)
    })
    .then(res => {
        setMasterUniversityAlert(true)
        setTimeout(() => {
            setMasterUniversityAlert(false)
        }, 4000);
    })
    .catch(res => console.log(res))
}
const specialtiesForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}/admin/create/specialties  `, {
        // "splid": parseInt(spl),
        "spl_name": splName,
    })
    .then(res => {
        setSpecialtiesAlert(true)
        setTimeout(() => {
            setSpecialtiesAlert(false)
        }, 4000);
    })
    .catch(res => console.log(res))
}

const doctorDegreeForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}/admin/create/DoctorDegrees  `, {
        // "splid": parseInt(spl),
        "DocID": parseInt(doctorName),
        "DegreeID":parseInt(degreeName),
        "YearOfGrad":parseInt(year),
        "UnivID":parseInt(university)

    })
    .then(res => {
        setDocDegreesAlert(true)
        setTimeout(() => {
            setDocDegreesAlert(false)
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

const docAddressForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}/admin/create/DoctorAddresses`, {
        // "citycode": parseInt(cityCode),
        "DocID": parseInt(docId),
        "AddressTypeID":parseInt(addressType),
        "Country":parseInt(country),
        "City":parseInt(cityName),
        "State":parseInt(state),
        "Address1":add,
        "Address2":addrss

    })
    .then(res => {
        setDocAddressAlert(true)
        setTimeout(() => {
            setDocAddressAlert(false)
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

const getCity = () => {
    axios.get(`${backendHost}/article/all/table/city`)
    .then(res => {
        
        setCityList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}

const getDocID = () => {
    axios.get(`${backendHost}/article/all/table/Doctors_New`)
    .then(res => {
        
    
        setDocIdList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}

const getDegreeID = () => {
    axios.get(`${backendHost}/article/all/table/masterdocdegrees`)
    .then(res => {
        
    
        setDegreeList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}

const getUnivID = () => {
    axios.get(`${backendHost}/article/all/table/masteruniversities`)
    .then(res => {
        
    
        setUnivList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}
useEffect(() => {
     getState()
     getCountries()   
     getSpecialties()
     getDocID()
     getCity()
     getDegreeID()
     getUnivID()
}, []) 
  return (
      
  
          
          <div className="promo-page">
                <div className="container">
                <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom">Author Table  <b> (Please Create Doctor First)</b></div>
                        <form onSubmit={submitForm}>
                            <div className="row m-4">
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Author First Name  <b> (Required)</b></Form.Label>
                            <Form.Control value={first} onChange={(e) => setFirst(e.target.value)}  type="text" name=""
                            placeholder="Enter Author First Name..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Author Middle Name  <b> (Optional)</b></Form.Label>
                            <Form.Control  value={middle} onChange={(e) => setMiddle(e.target.value)} type="text" name=""
                            placeholder="Enter Author Middle Name..." />
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Author Last Name  <b> (Required)</b></Form.Label>
                            <Form.Control value={last} onChange={(e) => setLast(e.target.value)}  type="text" name=""
                            placeholder="Enter Author Last Name..." required/>
                        </Form.Group>
                   
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Author Status  <b> (Already Selected)</b></Form.Label>
                            <Form.Control value={1} onChange={(e) => setStatus(e.target.value)}   type="text" name=""
                            placeholder="Enter Author Status..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Author Email  <b> (Required)</b></Form.Label>
                            <Form.Control value={emaill} onChange={(e) => setEmail(e.target.value)}  type="text" name=""
                            placeholder="Enter Author Email..."
                            />
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Author Type  <b> (Already Selected)</b></Form.Label>
                            <Form.Control value={1} onChange={(e) => setType(e.target.value)}  type="text" name=""
                            placeholder="Enter Author Type..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Doctor ID  <b> (Required)</b></Form.Label>
                            <Form.Control value={id} onChange={(e) => setId(e.target.value)}  type="text" name=""
                            placeholder="Enter Doctor ID..." required/>
                        </Form.Group>
                        {
                            alert?
                                <Alert variant="success" className="h6 mx-3">Author Create successfully!!</Alert>
                                : null
                        }
                     
                        </div>
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>


                    <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom">Hospital Table</div>
                        <form onSubmit={hospitalForm}>
                            <div className="row m-4">
                    
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Hospital Name</Form.Label>
                            <Form.Control value={hospital} onChange={(e) => setHospital(e.target.value)}  type="text" name=""
                            placeholder="Enter Hospital Name..." required/>
                        </Form.Group>

                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Others</Form.Label>
                            <Form.Control value={others} onChange={(e) => setOthers(e.target.value)}  type="text" name=""
                            placeholder="Enter Others..." />
                        </Form.Group>

                        {
                            hospitalAlert?
                                <Alert variant="success" className="h6 mx-3">Hospital Create successfully!!</Alert>
                                : null
                        }
                   
                     
                        </div>
                     
                      
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>

                    <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom"> Master Address Type Table</div>
                        <form onSubmit={favouriteForm}>
                            <div className="row m-4">
                    
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Address type</Form.Label>
                            <Form.Control value={user} onChange={(e) => setUser(e.target.value)}  type="text" name=""
                            placeholder="Enter Address type..." required/>
                        </Form.Group>

                        <FormLabel component="legend" className="text-dark">Status <b>(Required)</b></FormLabel>
      <RadioGroup value={search} onChange={(e) => {setSearch(e.target.value)}}
      style={{display: 'flex', flexDirection:'row'}}>
        <FormControlLabel value="0" control={<Radio />} label="No" />
        <FormControlLabel value="1" control={<Radio />} label="Yes" />
        
      </RadioGroup>

                        {
                            masterAddressTypeAlert?
                                <Alert variant="success" className="h6 mx-3">Master Addess Type Create successfully!!</Alert>
                                : null
                        }
                   
                     
                        </div>
                     
                      
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>

                    
                    <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom"> Master Doc Degrees Table</div>
                        <form onSubmit={degreeForm}>
                            <div className="row m-4">
                    
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Degree Description</Form.Label>
                            <Form.Control value={degree} onChange={(e) => setDegree(e.target.value)}  type="text" name=""
                            placeholder="Enter Degree Description..." required/>
                        </Form.Group>

                        <FormLabel component="legend" className="text-dark">Status <b>(Required)</b></FormLabel>
      <RadioGroup value={degreeStatus} onChange={(e) => {setDegreeStatus(e.target.value)}}
      style={{display: 'flex', flexDirection:'row'}}>
        <FormControlLabel value="0" control={<Radio />} label="No" />
        <FormControlLabel value="1" control={<Radio />} label="Yes" />
        
      </RadioGroup>

                        {
                            masterDocDegreesAlert?
                                <Alert variant="success" className="h6 mx-3">Master Doc Degrees Create successfully!!</Alert>
                                : null
                        }
                   
                     
                        </div>
                     
                      
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>

                    <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom"> Master Universitry Table</div>
                        <form onSubmit={universtyForm}>
                            <div className="row m-4">
                    
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter UnivName</Form.Label>
                            <Form.Control value={univName} onChange={(e) => setUnivName(e.target.value)}  type="text" name=""
                            placeholder="Enter UnivName..." required/>
                        </Form.Group>
                        

                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            {/* <Form.Label>Enter Country</Form.Label> */}

                            <label htmlFor="">Enter City</label>
<select name="country" value={univCity} onChange={(e) => setUnivCity(e.target.value)} placeholder=" Enter Country" required="" className="form-control">
<option>Select City</option>
    {cityList && cityList.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
</select>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="">Enter State</label>
<select name="state" value={univState} onChange={(e) => setUnivState(e.target.value)}  placeholder="Enter State" required="" className="form-control">
<option>Select State</option>
    {stateList.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
</select>
                        </Form.Group>
                   
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            {/* <Form.Label>Enter Country</Form.Label> */}

                            <label htmlFor="">Enter Country</label>
<select name="country" value={univCountry} onChange={(e) => setUnivCountry(e.target.value)}  placeholder=" Enter Country" required="" className="form-control">
<option>Select Country</option>
    {countriesList.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
</select>
                        </Form.Group>

                        <FormLabel component="legend" className="text-dark">Status <b>(Required)</b></FormLabel>
      <RadioGroup value={univStatus} onChange={(e) => {setUnivStatus(e.target.value)}}
      style={{display: 'flex', flexDirection:'row'}}>
        <FormControlLabel value="0" control={<Radio />} label="No" />
        <FormControlLabel value="1" control={<Radio />} label="Yes" />
        
      </RadioGroup>

                        {
                            masterUniversityAlert?
                                <Alert variant="success" className="h6 mx-3">Master University Created successfully!!</Alert>
                                : null
                        }
                   
                     
                        </div>
                     
                      
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>




                    <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom">Speciality Table</div>
                        <form onSubmit={specialtiesForm}>
                            <div className="row m-4">
                     
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Speciality Name</Form.Label>
                            <Form.Control value={splName} onChange={(e) => setSplName(e.target.value)}  type="text" name=""
                            placeholder="Enter Speciality Name..." required/>
                        </Form.Group>
                    
                        {
                            specialtiesAlert?
                                <Alert variant="success" className="h6 mx-3">Speciality Created successfully!!</Alert>
                                : null
                        }
                        
                        </div>
                     
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>

                
                    <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom">City Table</div>
                        <form onSubmit={cityForm}>
                            <div className="row m-4">
                     
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter City Name</Form.Label>
                            <Form.Control value={cityName} onChange={(e) => setCityName(e.target.value)}  type="text" name=""
                            placeholder="Enter City Name..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="">Enter State</label>
<select name="state" value={state} onChange={(e) => setState(e.target.value)} placeholder="Enter State" required="" className="form-control">
<option>Select State</option>
    {stateList.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
</select>
                        </Form.Group>
                   
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            {/* <Form.Label>Enter Country</Form.Label> */}

                            <label htmlFor="">Enter Country</label>
<select name="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder=" Enter Country" required="" className="form-control">
<option>Select Country</option>
    {countriesList.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
</select>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter City Pincode</Form.Label>
                            <Form.Control value={pinCode} onChange={(e) => setPinCode(e.target.value)}  type="text" name=""
                            placeholder="Enter City Pincode..." required/>
                        </Form.Group>
                        {
                            cityAlert?
                                <Alert variant="success" className="h6 mx-3">City Create successfully!!</Alert>
                                : null
                        }
                        </div>
                     
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>

                    
                    <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom">State Table</div>
                        <form onSubmit={statesForm}>
                            <div className="row m-4">
                       
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter State Name</Form.Label>
                            <Form.Control value={stateName} onChange={(e) => setStateName(e.target.value)}  type="text" name=""
                            placeholder="Enter State Name..." required/>
                        </Form.Group>
                   
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                         

                            <label htmlFor="">Enter Country</label>
<select name="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder=" Enter Country" required="" className="form-control">
<option>Select Country</option>
    {countriesList.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
</select>
                        </Form.Group>
                     
                        {
                            stateAlert?
                                <Alert variant="success" className="h6 mx-3">State Create successfully!!</Alert>
                                : null
                        }
                        </div>
                     
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>
                     
                    <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom">Country Table</div>
                        <form onSubmit={countriesForm}>
                            <div className="row m-4">
                       
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Country Name</Form.Label>
                            <Form.Control value={countryName} onChange={(e) => setCountryName(e.target.value)}  type="text" name=""
                            placeholder="Enter Country Name..." required/>
                        </Form.Group>
                   
                   
                     
                        {
                            countryAlert?
                                <Alert variant="success" className="h6 mx-3">Country Create successfully!!</Alert>
                                : null
                        }
                        </div>
                     
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>   






                       
                    <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom">Doctor Addresses</div>
                        <form onSubmit={docAddressForm}>
                            <div className="row m-4">
                     


                            <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                         

                            <label htmlFor="">Enter Doctor</label>
<select name="country" value={docId} onChange={(e) => setDocId(e.target.value)} placeholder=" Enter Doctor" required="" className="form-control">
<option>Select Doctor</option>
   { docIdList && docIdList.map((c) => {
        
        return (
            <option value={c[0]}>{`${c[10]}  ${c[11]}  ${c[12]}`}</option>
        )
    })}
</select>
                        </Form.Group>
                     
                        {/* <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter City Name</Form.Label>
                            <Form.Control value={cityName} onChange={(e) => setCityName(e.target.value)}  type="text" name=""
                            placeholder="Enter City Name..." required/>
                        </Form.Group> */}


                        
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            {/* <Form.Label>Enter Country</Form.Label> */}

                            <label htmlFor="">Enter City</label>
<select name="country" value={cityName} onChange={(e) => setCityName(e.target.value)} placeholder=" Enter Country" required="" className="form-control">
<option>Select City</option>
    {cityList && cityList.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
</select>
                        </Form.Group>

                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Address 1</Form.Label>
                            <Form.Control value={add} onChange={(e) => setAdd(e.target.value)}  type="text" name=""
                            placeholder="Enter Address 1" required/>
                        </Form.Group>

                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control value={addrss} onChange={(e) => setAddrss(e.target.value)}  type="text" name=""
                            placeholder="Enter Address 2" required/>
                        </Form.Group>



                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="">Address Type</label>
<select name="addrs" value={addressType} onChange={(e) => setAddressType(e.target.value)} placeholder="Enter Address Type" required="" className="form-control">
<option>Select Address Type</option>
    
        
        
            <option value="1">Correspondence</option>
            <option value="2">Permanent</option>
        

</select>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="">Enter State</label>
<select name="state" value={state} onChange={(e) => setState(e.target.value)} placeholder="Enter State" required="" className="form-control">
<option>Select State</option>
    {stateList.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
</select>
                        </Form.Group>
                   
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            {/* <Form.Label>Enter Country</Form.Label> */}

                            <label htmlFor="">Enter Country</label>
<select name="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder=" Enter Country" required="" className="form-control">
<option>Select Country</option>
    {countriesList.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
</select>
                        </Form.Group>
                     
                        {
                            docAddressAlert?
                                <Alert variant="success" className="h6 mx-3">Doctor Addresses Created successfully!!</Alert>
                                : null
                        }
                        </div>
                     
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>






       
                    <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom">Doctor Degrees</div>
                        <form onSubmit={doctorDegreeForm}>
                            <div className="row m-4">
                     


                            <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                         

                            <label htmlFor="">Enter Doctor</label>
<select name="country" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} placeholder=" Enter Doctor" required="" className="form-control">
<option>Select Doctor</option>
   { docIdList && docIdList.map((c) => {
        
        return (
            <option value={c[0]}>{`${c[10]}  ${c[11]}  ${c[12]}`}</option>
        )
    })}
</select>
                        </Form.Group>
                     


                        
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            {/* <Form.Label>Enter Country</Form.Label> */}

                            <label htmlFor="">Enter Degree</label>
<select name="country" value={degreeName} onChange={(e) => setDegreeName(e.target.value)} placeholder=" Enter Degree" required="" className="form-control">
<option>Select Degree</option>
    {degreeList && degreeList.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
</select>
                        </Form.Group>

                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Year Of Graduation</Form.Label>
                            <Form.Control value={year} onChange={(e) => setYear(e.target.value)}  type="text" name=""
                            placeholder="Enter Year Of Graduation" required/>
                        </Form.Group>

      
                               <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            {/* <Form.Label>Enter Country</Form.Label> */}

                            <label htmlFor="">Enter Universitry</label>
<select name="country" value={university} onChange={(e) => setUniversity(e.target.value)} placeholder=" Enter Degree" required="" className="form-control">
<option>Select University</option>
    {univList && univList.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
</select>
                        </Form.Group>
                 
                     
                        {
                            docDegreesAlert?
                                <Alert variant="success" className="h6 mx-3">Doc Degress Create successfully!!</Alert>
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
