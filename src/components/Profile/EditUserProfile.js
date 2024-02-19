import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { backendHost } from "../../api-config";

const EditUserProfile = (props) => {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };
  const item = props.items;
  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [primarySpl, setPrimary] = useState('');
  const [secondarySpl, setSecondary] = useState('');
  const [otherSpl, setOther] = useState('');
  const [education, setEducation] = useState('');
  const [awards, setAwards] = useState('');
  const [num, setNum] = useState('');
  const [hospital, setHospital] = useState('');
  const [acceptInsurance, setInsurance] = useState('');
  const [gender, setGender] = useState('');
  const [about, setAbout] = useState('');
  const [diseaseList, setDiseaseList] = useState([]);
  const [hospitalList, setHospitalList] = useState([]);
  const [submitAlert, setSubmitAlert] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(true);

  const [afterSubmitLoad, setafterSubmitLoad] = useState(false);
  const [website, setWebsite] = useState('');
  const [medicine, setMedicine] = useState();
  const [selectedMedicine, setSelectedMedicine] = useState();
  const [countries, setCountries] = useState();
  const [states, setStates] = useState();
  const [city, setCity] = useState();
  const [countriesList, setCountriesList] = useState();
  const [statesList, setStatesList] = useState();
  const [cityList, setCityList] = useState();
  
  



  function Alert(msg) {
    setShowAlert(true);
    setAlertMsg(msg);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  }

  const formSubmit = (e) => {
    setafterSubmitLoad(true);
    e.preventDefault();
    axios
      .post(`${backendHost}/doctors/updateprofile`, {
       
        docID: props.docid,
        firstName: firstName,
        lastName: lastName,
        primarySpl: parseInt(primarySpl),
        // sub_spls: secondarySpl,
        otherSpl: otherSpl,
        // degreeID: education,
        telephone_nos: num,
        hospitalAffliated: parseInt(hospital),
        insuranceAccept: parseInt(acceptInsurance),
        gender: parseInt(gender),
        about: about,
        awards: awards,
        websiteUrl: website,
        medicineTypeID: parseInt(selectedMedicine),
        city:parseInt(city),
        state:parseInt(states),
        country:parseInt(countries),
      })
      .then((res) => {
        setafterSubmitLoad(false);
        if (res.data == 0) {
          Alert("Some error occured. Try again later");
        } else {
          
          Alert("Updated your profile successfully.");
        }
        props.fetchDoctor(props.id);
      })
      .catch((res) => {
        setafterSubmitLoad(false);
        Alert(`Some error occured. Try again later ${res}`);
      });
  };
 

  const fetchTables = () => {
    Promise.all([
      fetch(`${backendHost}/article/all/table/specialties`).then((res) =>
        res.json()
      ),
      fetch(`${backendHost}/article/all/table/hospital`).then((res) =>
        res.json()
      ),
      fetch(`${backendHost}/data/medicines`).then((res) => res.json()),
     
      fetch(`${backendHost}/article/all/table/countries`).then(res => res.json()),

      fetch(`${backendHost}/article/all/table/city`).then(res => res.json()),

      fetch(`${backendHost}/article/all/table/states`).then(res => res.json()),
    ])
      .then(([diseaseData, hospitalData, medicineData,countriesData, cityData,statesData,]) => {
        setDiseaseList(diseaseData);
        setHospitalList(hospitalData);
        setMedicine(medicineData);
        setCountriesList(countriesData);
        setCityList(cityData);
        setStatesList(statesData);
       
      })
      .catch((err) => {
        return;
      });
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <>
      {/* Alert Pop Up */}
      {showAlert && (
        <div className="alert alert-success pop-up border-bottom">
          <div className="h5 mb-0 text-center">{alertMsg}</div>
          <div className="timer"></div>
        </div>
      )}
      {afterSubmitLoad && (
        <div className="loader main on-submit-loading">
          <i className="fa fa-spinner fa-spin fa-10x" />
        </div>
      )}
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <form onSubmit={formSubmit}>
          <Modal.Header
            className="p-4 mb-4"
            closeButton
            style={{ backgroundColor: "#b9daf1" }}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Profile
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-4">
            {/* <div className="h5">Centered Modal</div> */}
            <Form.Group className="col-md-6 float-left">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                value={firstName}
                onChange={(e) => setFirst(e.target.value)}
                style={{ border: "1px solid #ced4da" }}
                type="text"
                name=""
                placeholder="Enter first name"
                required
              />
            </Form.Group>
            <Form.Group className="col-md-6 float-left">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={lastName}
                onChange={(e) => setLast(e.target.value)}
                style={{ border: "1px solid #ced4da" }}
                type="text"
                name=""
                placeholder="Enter last name"
              />
            </Form.Group>
            <Form.Group className="col-md-12 float-left">
              <FormControl component="fieldset">
                <FormLabel component="legend" className="text-dark">
                  Gender
                </FormLabel>
                <RadioGroup
                  value={gender.toString()}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Form.Group>
            <Form.Group className="col-md-6 float-left">
              <Form.Label>Primary Speciality</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setPrimary(e.target.value);
                }}
                value={primarySpl}
                as="select"
                name="diseaseConditionId"
                custom
                required
              >
                <option>Select primary speciality</option>
                {diseaseList.map((i) => (
                  <option value={i[0]}>{i[1]}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="col-md-6 float-left">
              <Form.Label>Secondary Speciality</Form.Label>
              <Form.Control
                onChange={(e) => setSecondary(e.target.value)}
                value={secondarySpl}
                as="select"
                name="diseaseConditionId"
                custom
              >
                <option>Select secondary speciality</option>
                {diseaseList.map((i) => (
                  <option value={i[0]}>{i[1]}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="col-md-6 float-left">
              <Form.Label>System of Medicine </Form.Label>
              <Form.Control
                onChange={(e) => {
                  setSelectedMedicine(e.target.value);
                }}
                value={selectedMedicine}
                as="select"
                name="diseaseConditionIds"
                custom
                required
              >
                <option>Select type of medicine</option>
                {medicine?.map((i) => (
                  <option value={i.med_id}>{i.med_type}</option>
                ))}
              </Form.Control>
            </Form.Group>


            <Form.Group className="col-md-6 float-left">
              <Form.Label>Select City </Form.Label>
              <Form.Control
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                value={city}
                as="select"
                name="diseaseConditionIds"
                custom
                required
              >
                <option>Select City</option>
                {cityList?.map((i) => (
                  <option value={i[0]}>{i[1]}</option>
                ))}
              </Form.Control>
            </Form.Group>


            <Form.Group className="col-md-6 float-left">
              <Form.Label>Select State </Form.Label>
              <Form.Control
                onChange={(e) => {
                  setStates(e.target.value);
                }}
                value={states}
                as="select"
                name="diseaseConditionIds"
                custom
                required
              >
                <option>Select State</option>
                {statesList?.map((i) => (
                  <option value={i[0]}>{i[1]}</option>
                ))}
              </Form.Control>
            </Form.Group>


            <Form.Group className="col-md-6 float-left">
              <Form.Label>Select Country </Form.Label>
              <Form.Control
                onChange={(e) => {
                  setCountries(e.target.value);
                }}
                value={countries}
                as="select"
                name="diseaseConditionIds"
                custom
                required
              >
                <option>Select City</option>
                {countriesList?.map((i) => (
                  <option value={i[0]}>{i[1]}</option>
                ))}
              </Form.Control>
            </Form.Group>


            <FormControl className="col-md-12 px-3">
              <Form.Label>Additional Specialities</Form.Label>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={personName}
                onChange={handleChange}
                input={<Input id="select-multiple-chip" />}
                // MenuProps={MenuProps}
                className=""
              >
                {diseaseList.map((i) => (
                  <MenuItem key={i[1]} value={i[0]}>
                    {i[1]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Form.Group className="col-md-12 float-left">
              <Form.Label>Additional Specialities</Form.Label>
              <Form.Control
                value={otherSpl}
                onChange={(e) => setOther(e.target.value)}
                style={{ border: "1px solid #ced4da" }}
                type="text"
                name=""
                placeholder="Enter additional specialities"
              />
            </Form.Group>

            <Form.Group className="col-md-12 float-left">
              <Form.Label>Education</Form.Label>
              <Form.Control
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                style={{ border: "1px solid #ced4da" }}
                type="text"
                name=""
                placeholder="Enter education"
              />
            </Form.Group>

            <Form.Group className="col-md-12 float-left">
              <Form.Label>Awards or Accomplishments</Form.Label>
              <Form.Control
                value={awards}
                onChange={(e) => setAwards(e.target.value)}
                style={{ border: "1px solid #ced4da" }}
                type="text"
                name=""
                placeholder="Enter education"
              />
            </Form.Group>

            <Form.Group className="col-md-12 float-left">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                value={num}
                onChange={(e) => setNum(e.target.value)}
                style={{ border: "1px solid #ced4da" }}
                type="text"
                name=""
                placeholder="Enter contact number"
              />
            </Form.Group>
            <Form.Group className="col-md-12 float-left">
              <Form.Label>Doctor Website URL</Form.Label>
              <Form.Control
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                style={{ border: "1px solid #ced4da" }}
                type="text"
                name=""
                placeholder="Enter Doctor Website URL"
              />
            </Form.Group>

            <Form.Group className="col-md-12 float-left">
              <Form.Label>Hospital Affliated</Form.Label>
              <Form.Control
                onChange={(e) => setHospital(e.target.value)}
                as="select"
                name="hospital_affliated"
                custom
                value={hospital}
              >
                <option>Select hospital</option>
                {hospitalList.map((i) => (
                  <option value={i[0]}>{i[1]}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="col-md-12 float-left">
              <FormControl component="fieldset">
                <FormLabel component="legend" className="text-dark">
                  Do you accept insurance
                </FormLabel>
                <RadioGroup
                  value={parseInt(acceptInsurance)}
                  onChange={(e) => {
                    setInsurance(e.target.value);
                  }}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <FormControlLabel value={1} control={<Radio />} label="Yes" />
                  <FormControlLabel value={0} control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Form.Group>
            <Form.Group className="col-md-12 float-left" style={{ zIndex: 1 }}>
              <Form.Label>Tell us about yourself</Form.Label>
              <Form.Control
                defaultValue={about}
                onChange={(e) => setAbout(e.target.value)}
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
              />
            </Form.Group>
            <p className="text-center">
              We never share your details without your consent.
            </p>
          </Modal.Body>
          {submitAlert === true ? (
            <div className="h5 submit-popup alert alert-success pb-2">
              Profile Updated Successfully!
              <button
                onClick={() => setSubmitAlert(false)}
                className="btn pr-0"
              >
                <i className="fa-2x fas fa-times-circle"></i>
              </button>
            </div>
          ) : null}
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditUserProfile;
