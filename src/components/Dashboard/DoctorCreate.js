
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
import  axiosInstance from '../../axiosInstance';




function App() {
  const[prefix,setPrefix] = useState()  
  const[first,setFirst] = useState('')
  const[middle,setMiddle] = useState('')
  const[last,setLast] = useState('')
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
  const[website,setWebsite] = useState('')
  const[awards,setAwards] = useState('')
  const[phone,setPhone] = useState('')
  const[rating,setRating] = useState()
  const[email,setEmail] = useState()
  const[verified,setVerified] = useState()
  const[waitingTime,setWaitingTime] = useState()
  const[about,setAbout] = useState()
  const[docActive,setDocActive] = useState()
  const[featuredDoc,setFeaturedDoc] = useState()
  const[image,setImage] = useState()
  const[regDate,setRegDate] = useState()
  const[regId,setRegId] = useState(0)
  const[regNo,setRegNo] = useState()
  const[medTypeId,setMedTypeId] = useState()
  const[other,setOther] = useState()
const[medicinelist,setMedicineList] = useState()
  

  const submitForm = (e) => {
    e.preventDefault();
    axiosInstance.post(`/admin/create/Doctors_New`,{
        "prefix":'Dr.',
        "docname_first": first,
        "docname_middle": middle,
        "docname_last": last,
        "gender":parseInt(gender),
        "insurance_accept":1,
        "hospital_affliated":parseInt(hospital),
        "primary_spl":parseInt(disease),
        "website_url":website,
        "awards":awards,
        "telephone_nos":phone,
         "email":email,
         "verified":parseInt(verified),
         "about":about,
         "docactive":parseInt(docActive),
         "featured_doctor_date":featuredDoc,
         "Natl_Reg_Date":regDate,
         "RegWithStateBoardID":parseInt(regId),
         "NatlRegNo":regNo,
         "MedicineTypeID":parseInt(medTypeId),
         "CreatedBy":parseInt(userId),
         
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
    axiosInstance.get(`/article/all/table/countries`)
    .then(res => {
        
        setCountriesList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}

const getCity = () => {
    axiosInstance.get(`/article/all/table/city`)
    .then(res => {
        
        setCityList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}

const getState = () => {
    axiosInstance.get(`/article/all/table/states`)
    .then(res => {
        
        setStateList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}

const getDisease = () => {
    axiosInstance.get(`/article/all/table/specialties`)
    .then(res => {
        
        setDiseaseList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}

const getHospital = () => {
    axiosInstance.get(`/article/all/table/hospital`)
    .then(res => {
        
        setHospitalList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}

const getMedicine = () => {
    axiosInstance.get(`/article/all/table/medicinetype`)
    .then(res => {
        
        setMedicineList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}

const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);

    console.log('Image selected:', {
      image: file.name,
    });
  }
  
 

useEffect(() => {
    
  
    getCountries()
    getCity()
   getState()
   getDisease()
   getHospital()
   getMedicine()
 
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
                            <Form.Label>Awards <b> (Required)</b></Form.Label>
                            <Form.Control value={awards} onChange={(e) => setAwards(e.target.value)}  type="text" name=""
                            placeholder="Enter Doctor Awards..."  />
                        </Form.Group>
                        
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Contact Number <b> (Required)</b></Form.Label>
                            <Form.Control value={phone} onChange={(e) => setPhone(e.target.value)}  type="number" name=""
                            placeholder="Enter Contact Number..."  />
                        </Form.Group>


                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Email <b> (Required)</b></Form.Label>
                            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)}  type="email" name=""
                            placeholder="Enter Doctor Email Address..."  />
                        </Form.Group>
                        
                       
                        

                        {/* <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Waiting Time<b> (Required)</b></Form.Label>
                            <Form.Control value={waitingTime} onChange={(e) => setWaitingTime(e.target.value)}  type="text" name=""
                            placeholder="Waiting Time"  />
                        </Form.Group> */}
                        

                    
                       
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
                            <Form.Label>Enter Other Speciality <b>(Required)</b> </Form.Label>
                            <Form.Control value={other} onChange={(e) => setOther(e.target.value)}  type="text" name=""
                            placeholder="Other Specialities" required/>
                        </Form.Group>
                      
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Doctor Website URL <b>(Optional)</b></Form.Label>
                            <Form.Control value={website} onChange={(e) => setWebsite(e.target.value)}  type="text" name=""
                            placeholder="Enter Doctor URL..." />
                        </Form.Group>


                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Featured Doctor Date <b>(required)</b></Form.Label>
                            <Form.Control value={featuredDoc} onChange={(e) => setFeaturedDoc(e.target.value)}  type="date" name=""
                            placeholder="Enter Date." />
                        </Form.Group>



                        
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Registeration Date<b>(required)</b></Form.Label>
                            <Form.Control value={regDate} onChange={(e) => setRegDate(e.target.value)}  type="date" name=""
                            placeholder="Enter Date." />
                        </Form.Group>

                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Registeration ID<b>(required)</b></Form.Label>
                            <Form.Control value={regId} onChange={(e) => setRegId(e.target.value)}  type="number" name=""
                            placeholder="Enter Registeration ID." />
                        </Form.Group>

                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Registeration No.<b>(required)</b></Form.Label>
                            <Form.Control value={regNo} onChange={(e) => setRegNo(e.target.value)}  type="text" name=""
                            placeholder="Enter Registeration No." />
                        </Form.Group>

                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Medicine Type ID<b>(required)</b></Form.Label>
                         
                            <select name="hospital" value={medTypeId} onChange={(e) => setMedTypeId(e.target.value)} placeholder=" Select Medicine Type" required="" className="form-control">
<option>Select Medicine Type Id</option>
    { medicinelist &&medicinelist.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
</select>
                        </Form.Group>





                        <Form.Group className="col-md-6 float-left" controlId="exampleForm.ControlTextarea1">
        <Form.Label>About Doctor</Form.Label>
        <Form.Control  value={about} onChange={(e) => setAbout(e.target.value)} as="textarea"  />
      </Form.Group>

                               
      <FormLabel component="legend" className="text-dark ">Gender <b>(Required)</b></FormLabel>
      <RadioGroup value={gender.toString()} onChange={(e) => {setGender(e.target.value)}}
      style={{display: 'flex', flexDirection:'row'}}>
        <FormControlLabel value="1" control={<Radio />} label="Female" />
        <FormControlLabel value="2" control={<Radio />} label="Male" />
        <FormControlLabel value="3" control={<Radio />} label="Other" />
      </RadioGroup>
      

      <FormLabel component="legend" className="text-dark ">Is Verified <b>(Required)</b></FormLabel>
      <RadioGroup value={verified} onChange={(e) => {setVerified(e.target.value)}}
      style={{display: 'flex', flexDirection:'row'}}>
        <FormControlLabel value="0" control={<Radio />} label="No" />
        <FormControlLabel value="1" control={<Radio />} label="Yes" />
        
      </RadioGroup>

      <FormLabel component="legend" className="text-dark">Is Doctor Active <b>(Required)</b></FormLabel>
      <RadioGroup value={docActive} onChange={(e) => {setDocActive(e.target.value)}}
      style={{display: 'flex', flexDirection:'row'}}>
        <FormControlLabel value="0" control={<Radio />} label="No" />
        <FormControlLabel value="1" control={<Radio />} label="Yes" />
        
      </RadioGroup>





                        {/* <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Location <b>(Required)</b></Form.Label>
                            <Form.Control value={location} onChange={(e) => setLocation(e.target.value)}  type="text" name=""
                            placeholder="Enter Location..." required/>
                        </Form.Group> */}
                        {/* <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Pincode <b>(Required)</b></Form.Label>
                            <Form.Control value={pincode} onChange={(e) => setPincode(e.target.value)}  type="text" name=""
                            placeholder="Enter Pincode..." required/>
                        </Form.Group> */}

                     
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
