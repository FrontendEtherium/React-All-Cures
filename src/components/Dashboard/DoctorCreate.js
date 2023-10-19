
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





function App() {
  const[prefix,setPrefix] = useState()  
  const[first,setFirst] = useState()
  const[middle,setMiddle] = useState()
  const[last,setLast] = useState()
  const[gender,setGender] = useState('')
  const[edu,setEdu] = useState('')
  const[insurance,setInsurance] = useState('')
  const[location,setLocation] = useState('')
  const[pincode,setPincode] = useState('')
  const [countriesList,setCountriesList] = useState([])
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [cityList,setCityList] = useState([])
  const[state, setState] = useState('')
  const[stateList,setStateList] = useState([])
  const[disease,setDisease] = useState('')
  const[diseaseList,setDiseaseList] = useState([])
  const[hospital,setHospital] = useState('')
  const[hospitalList,setHospitalList] = useState([])
  const [alert,setAlert] = useState()
  const[website,setWebsite] = useState()



  

  const submitForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}/admin/create/doctors  `, {
        "prefix":'Dr.',
        "docname_first": first,
        "docname_middle": middle,
        "docname_last": last,
        "gender":parseInt(gender),
        "edu_training":edu,
        "insurance_accept":1,
        "hospital_affliated":parseInt(hospital),
        "primary_spl":parseInt(disease),
        "city":parseInt(city),
        "state":parseInt(state),
        "country_code":parseInt(country),
        "location":location,
        "pincode":parseInt(pincode),
        "website_url":website
    
    })
    .then(res => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 4000);
    })
    .catch(res => console.log(res))
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

const getState = () => {
    axios.get(`${backendHost}/article/all/table/states`)
    .then(res => {
        
        setStateList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}

const getDisease = () => {
    axios.get(`${backendHost}/article/all/table/specialties`)
    .then(res => {
        
        setDiseaseList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}

const getHospital = () => {
    axios.get(`${backendHost}/article/all/table/hospital`)
    .then(res => {
        
        setHospitalList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}
 

useEffect(() => {
    
  
    getCountries()
    getCity()
   getState()
   getDisease()
   getHospital()
 
}, []) 



  return (
      
  
          
          <div className="promo-page">
                <div className="container">
                    <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom">Doctors Table</div>
                        <form onSubmit={submitForm}>
                            <div className="row m-4">
                            <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Doctor Prefix   <span><b>(Already Selected)</b></span></Form.Label>
                            <Form.Control value={'Dr.'} onChange={(e) => setPrefix(e.target.value)}   type="text" name=""
                            placeholder="Enter Doctor Prefix..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Doctor First Name  <b> (Required)</b></Form.Label>
                            <Form.Control value={first} onChange={(e) => setFirst(e.target.value)}  type="text" name=""
                            placeholder="Enter Doctor First Name..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Doctor Middle Name  <b>(Optional) </b></Form.Label>
                            <Form.Control value={middle} onChange={(e) => setMiddle(e.target.value)}  type="text" name=""
                            placeholder="Enter Doctor Middle Name..." />
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Doctor Last Name  <b> (Required)</b></Form.Label>
                            <Form.Control value={last} onChange={(e) => setLast(e.target.value)}  type="text" name=""
                            placeholder="Enter Doctor Last Name..." />
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                           
                            <FormLabel component="legend" className="text-dark">Gender <b>(Required)</b></FormLabel>
      <RadioGroup value={gender.toString()} onChange={(e) => {setGender(e.target.value)}}
      style={{display: 'flex', flexDirection:'row'}}>
        <FormControlLabel value="1" control={<Radio />} label="Female" />
        <FormControlLabel value="2" control={<Radio />} label="Male" />
        <FormControlLabel value="3" control={<Radio />} label="Other" />
      </RadioGroup>
      

                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Edu Training  <b>(Required)</b> </Form.Label>
                            <Form.Control value={edu} onChange={(e) => setEdu(e.target.value)}  type="text" name=""
                            placeholder="Enter Edu Training..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Insurance Accept Value <b>(Already Selected)</b><b>1</b></Form.Label>
                            <Form.Control value={1}  type="text" name=""
                            placeholder="Enter Insurance Accept Value 1..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="">Enter Hospital <b>(Required)</b></label>
<select name="hospital" value={hospital} onChange={(e) => setHospital(e.target.value)} placeholder=" Enter Hospital" required="" className="form-control">
<option>Select Hospital</option>
    {hospitalList.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
</select>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="">Enter Speciality <b>(Required)</b></label>
<select name="speciality" value={disease} onChange={(e) => setDisease(e.target.value)} placeholder=" Enter Speciality" required="" className="form-control">
<option>Select speciality</option>
    {diseaseList.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
</select>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="">Enter City <b>(Required)</b></label>
<select name="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder=" Enter City" required="" className="form-control">
<option>Select City</option>
    {cityList.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
</select>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="">Enter State <b>(Required)</b></label>
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

                            <label htmlFor="">Enter Country <b>(Required)</b></label>
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
                            <Form.Label>Enter Doctor Website URL <b>(Optional)</b></Form.Label>
                            <Form.Control value={website} onChange={(e) => setWebsite(e.target.value)}  type="text" name=""
                            placeholder="Enter Doctor URL..." />
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Location <b>(Required)</b></Form.Label>
                            <Form.Control value={location} onChange={(e) => setLocation(e.target.value)}  type="text" name=""
                            placeholder="Enter Location..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Pincode <b>(Required)</b></Form.Label>
                            <Form.Control value={pincode} onChange={(e) => setPincode(e.target.value)}  type="text" name=""
                            placeholder="Enter Pincode..." required/>
                        </Form.Group>

                     
                        {
                            alert?
                                <Alert variant="success" className="h6 mx-3">Doctor Create successfully!!</Alert>
                                : null
                        }
                        </div>
                     
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit Doctor</button>
                        </div>

                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            
                        <a href='http://all-cures.com:8983/solr/#/new_core/dataimport//dataimport'> <button type="button" className="btn btn-dark col-md-12 mb-4">Update SOLR</button></a>

                        </Form.Group>
                        </form>
                    </div>

                   

                
                   

                    
                   
                     
                     
                </div>
            </div>
   
   
       
       
        

  );
}

export default App;
