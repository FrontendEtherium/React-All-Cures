import React, { useState, useEffect } from 'react';
import { Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import history from '../../history';
import { userId } from '../../UserId';
import { backendHost } from '../../../api-config';
import { Description } from '@material-ui/icons';

export default function UpdatePromo(props) {
  const [code, setCode] = useState('');
  const [startDate, setStart] = useState('');
  const [endDate, setEnd] = useState('');
  const [maxLimit, setMax] = useState('');
  const [active, setActive] = useState('');
  const [title, setTitle] = useState('');
  const [campaignList, setCampaignList] = useState([]);
  const [adsList, setAdsList] = useState([]);
  const [description, setDescription] = useState('');
  const [review, setReview] = useState(''); // Assuming 'review' is a string
  const [count, setCount] = useState('');
  const [companyList, setCompanyList] = useState([]);

  const [submitAlert, setAlert] = useState(false);
  const [promoData, setPromo] = useState([]);

  const search = useLocation().search;
  const id = new URLSearchParams(search).get('updatecontract');

  const [initialState, setInitialState] = useState({
    code: '',
    startDate: '',
    endDate: '',
    maxLimit: '',
    active: '',
    title: '',
    description: '',
    review: '',
    count: '',
  });

  const fetchPromo = (e) => {
    axios
      .get(`${backendHost}/sponsored/get/contract/${id}`)
      .then((res) => {
        setPromo(res.data);
        const promoData = res.data[0];
        setInitialState({
          code: promoData.contactFirstName,
          startDate: promoData.startDate.split('T')[0],
          endDate: promoData.endDate.split('T')[0],
          maxLimit: promoData.contactLastName,
          active: promoData.fee,
          title: promoData.currency,
          description: promoData.status,
          review: promoData.serviceId,
          count: promoData.userId,
        //   review: promoData.ReviewStatus.toString(), 
        //   count: promoData.AdCount.toString(),
        });
        setCode(promoData.contactFirstName);
        setStart(promoData.startDate.split('T')[0]);
        setEnd(promoData.endDate.split('T')[0]);
        setMax(promoData.contactLastName);
        setActive(promoData.fee);
        setTitle(promoData.currency);
        setDescription(promoData.status);
        setReview(promoData.serviceId);
          setCount(promoData.userId);
        // setReview(promoData.ReviewStatus.toString());
        // setCount(promoData.AdCount.toString());
      })
      .catch((err) => {
        return;
      });
  };

  const getHospital = () => {
    axios.get(`${backendHost}/article/all/table/registration`).then((res) => {
      setCompanyList(res.data);
    })
    
  };

  const getAds = () => {
    axios.get(`${backendHost}/article/all/table/AdsTypes`).then((res) => {
      setAdsList(res.data);
    }).catch((err) => {
      console.log(err);
    });
  };

  const getCampaign = () => {
    axios.get(`${backendHost}/article/all/table/SponsoredServicesMaster`).then((res) => {
      setCampaignList(res.data);
    }).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    document.title = "All Cures | Dashboard | Update Promo";
    fetchPromo();
    getHospital();
    getAds();
    getCampaign();
    // eslint-disable-next-line
  }, []);

  const submitForm = (e) => {
    e.preventDefault();

    // Create an object to store the fields that have changed
    const updatedFields = {};

    // Compare each field with the initial state
    if (code !== initialState.code) {
      updatedFields.CampaignID = parseInt(code);
    }
    if (startDate !== initialState.startDate) {
      updatedFields.StartDate = startDate;
    }
    if (endDate !== initialState.endDate) {
      updatedFields.EndDate = endDate;
    }
    if (maxLimit !== initialState.maxLimit) {
      updatedFields.DiseaseCondition = parseInt(maxLimit);
    }
    if (active !== initialState.active) {
      updatedFields.AdTypeID = parseInt(active);
    }
    if (title !== initialState.title) {
      updatedFields.AdTitle = title;
    }
    if (description !== initialState.description) {
      updatedFields.AdDescription = description;
    }
    if (review !== initialState.review) {
      updatedFields.ReviewStatus = parseInt(review);
    }
    if (count !== initialState.count) {
      updatedFields.AdCount = parseInt(count);
    }

    // Check if any fields have changed before making the PUT request
    if (Object.keys(updatedFields).length > 0) {
      axios
        .put(`${backendHost}/sponsored/update/ad/${id}`, updatedFields)
        .then((res) => {
          history.back();
        })
        .catch((res) => {
          return;
        });
    }
  };

  return (
    <div className="container">
      <div className="card my-3">
        <div className="card-title h3 text-center py-2 border-bottom">Update Contract Details</div>
        <form onSubmit={submitForm}>
          <div className="row m-4">
            <Form.Group className="col-md-6 float-left">
              <Form.Label>Enter Service Name</Form.Label>
              <Form.Control
                as="select"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type="text"
                placeholder="Campaign here..."
              >
                <option value="">{code}</option>
                {campaignList.map((c) => (
                  <option key={c[0]} value={c[0]}>
                    {c[2]}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="col-md-6 float-left">
              <Form.Label>AD Start Date</Form.Label>
              <Form.Control
                type="Date"
                defaultValue={startDate}
                onChange={(e) => setStart(e.target.value)}
                name=""
                placeholder="Start Date here..."
              />
            </Form.Group>

            <Form.Group className="col-md-6 float-left">
              <Form.Label>AD End Date</Form.Label>
              <Form.Control
                type="Date"
                defaultValue={endDate}
                onChange={(e) => setEnd(e.target.value)}
                name=""
                placeholder="End Date here..."
              />
            </Form.Group>

            <Form.Group className="col-md-6 float-left">
              <Form.Label>Enter Disease Condition</Form.Label>
              <Form.Control
                as="select"
                value={maxLimit}
                onChange={(e) => setMax(e.target.value)}
              >
                <option value="">{maxLimit}</option>
                {companyList.map((c) => (
                  <option key={c[0]} value={c[0]}>
                    {c[1]}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="col-md-6 float-left">
              <Form.Label>Enter Ad Type</Form.Label>
              <Form.Control
                as="select"
                value={active}
                onChange={(e) => setActive(e.target.value)}
              >
                <option value="">{active}</option>
                {adsList.map((c) => (
                  <option key={c[0]} value={c[0]}>
                    {c[1]}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="col-md-6 float-left">
              <Form.Label>Enter Ad Title</Form.Label>
              <Form.Control
                type="text"
                name=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="col-md-6 float-left">
              <Form.Label>Enter Ad Description</Form.Label>
              <Form.Control
                type="text"
                name=""
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="col-md-6 float-left">
              <Form.Label>Enter Ad Impression</Form.Label>
              <Form.Control
                type="text"
                name=""
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
            </Form.Group>

            <div className="col-lg-6 form-group">
              <label htmlFor="">Review Status</label>
              <select
                multiple
                name="featured"
                placeholder="Featured"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="form-control"
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
          </div>
         

   
          {submitAlert ? (
            <Alert variant="success" className="h6 mx-3">
              Updated Successfully!!
            </Alert>
          ) : null}
          <div className="col-md-12 text-center">
            <button type="submit" className="btn btn-dark col-md-12 mb-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
