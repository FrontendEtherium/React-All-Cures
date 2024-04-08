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

const EditProfile = (props) => {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };
  const item = props.items;
  const [firstName, setFirst] = useState(item.firstName);
  const [lastName, setLast] = useState(item.lastName);
  const [primarySpl, setPrimary] = useState(item.primarySplCode);
  const [secondarySpl, setSecondary] = useState(item.specialties);
  const [otherSpl, setOther] = useState(item.other_spls);
  const [education, setEducation] = useState(item.degDesc);
  const [awards, setAwards] = useState(item.awards);
  const [num, setNum] = useState(item.telephoneNos);
  const [hospital, setHospital] = useState(item.hospitalAffiliatedCode);
  const [acceptInsurance, setInsurance] = useState(item.insuranceAccept);
  const [gender, setGender] = useState('');
  const [about, setAbout] = useState(item.about);
  const [diseaseList, setDiseaseList] = useState([]);
  const [hospitalList, setHospitalList] = useState([]);
  const [submitAlert, setSubmitAlert] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(true);
  const [medicine, setMedicine] = useState();
import headers from "../../api-fetch";

  const [afterSubmitLoad, setafterSubmitLoad] = useState(false);
  const [website, setWebsite] = useState(item.websiteUrl);
  const [selectedMedicine, setSelectedMedicine] = useState(item.medicineTypeID);

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
       
        docID: item.docID,
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
      })
      .then((res) => {
        setafterSubmitLoad(false);
        if (res.data != 0) {
          Alert("Updated your profile successfully.");
        } else {
          Alert("Some error occured. Try again later");
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
       fetch(`${backendHost}/article/all/table/specialties`,{
        headers: headers
      }).then((res) =>
        res.json()
      ),
       fetch(`${backendHost}/article/all/table/hospital`,{
        headers: headers
      }).then((res) =>
        res.json()
      ),
      fetch(`${backendHost}/data/medicines`).then((res) => res.json()),
      // fetch('/article/all/table/countries').then(res => res.json()),
    ])
      .then(([diseaseData, hospitalData, medicineData]) => {
        setDiseaseList(diseaseData);
        setHospitalList(hospitalData);
        setMedicine(medicineData);
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

export default EditProfile;
