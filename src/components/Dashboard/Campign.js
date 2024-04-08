
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendHost } from '../../api-config';
import { Alert, Form } from 'react-bootstrap';
import axiosInstance from '../../axiosInstance';
function App() {
  const [first, setFirst] = useState();
  const [middle, setMiddle] = useState();
  const [startDate, setStart] = useState(Date);
  const [endDate, setEnd] = useState(Date);
  const [alert, setAlert] = useState();
  const [companyList, setCompanyList] = useState([]);

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${backendHost}/sponsored/create/campaign  `, {
        CompanyID: first,
        CampaignName: middle,
        StartDate: startDate,
        EndDate: endDate,
      })
      .then((res) => {
        if (res.data === 1) {
          setAlert('Campaign created successfully!!');
        } else if (res.data === 0) {
          setAlert('Campaign not created. Please check all fields and try again.');
        } else {
          setAlert('An error occurred. Please contact the development team.');
        }

        setTimeout(() => {
          setAlert('');
        }, 3000); // Hide alert after 3 seconds
      })
      .catch((error) => {
        console.error('Error creating campaign:', error);
        setAlert('An error occurred. Please contact the development team.');
        setTimeout(() => {
          setAlert('');
        }, 3000); // Hide alert after 3 seconds
      });
  };

  const getCompanies = () => {
    axiosInstance.get(`/article/all/table/Companies`)
      .then((res) => {
        setCompanyList(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div className="promo-page">
      <div className="container">
        <div className="card my-3">
          <div className="card-title h3 text-center py-2 border-bottom">
            <b> (Create Campaign)</b>
          </div>
          <form onSubmit={submitForm}>
            <div className="row m-4">
              <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                <label htmlFor="">Enter Company <b>(Required)</b></label>
                <select
                  name="hospital"
                  value={first}
                  onChange={(e) => setFirst(e.target.value)}
                  placeholder=" Enter Company"
                  required
                  className="form-control"
                >
                  <option>Select Company</option>
                  {companyList.map((c) => {
                    return <option value={c[0]}>{c[1]}</option>;
                  })}
                </select>
              </Form.Group>

              <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                <Form.Label>Enter Campaign Name <b> (Required)</b></Form.Label>
                <Form.Control
                  value={middle}
                  onChange={(e) => setMiddle(e.target.value)}
                  type="text"
                  name=""
                  placeholder="Enter Campaign Name..."
                  required
                />
              </Form.Group>

              <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                <Form.Label>Campaign Start Date</Form.Label>
                <Form.Control
                  type="Date"
                  value={startDate}
                  onChange={(e) => setStart(e.target.value)}
                  name=""
                  placeholder="Start Date here..."
                  required
                />
              </Form.Group>

              <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                <Form.Label>Campaign End Date</Form.Label>
                <Form.Control
                  value={endDate}
                  onChange={(e) => setEnd(e.target.value)}
                  type="Date"
                  name=""
                  placeholder="Start Date here..."
                  required
                />
              </Form.Group>

              {alert && (
                <Alert variant="success" className="h6 mx-3">
                  {alert}
                </Alert>
              )}
            </div>
            <div className="col-md-12 text-center">
              <button type="submit" className="btn btn-dark col-md-12 mb-4">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
