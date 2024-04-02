import React, { useState, useEffect } from 'react';
import { Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import history from '../../history';
import { userId } from '../../UserId';
import { backendHost } from '../../../api-config';
import { Description } from '@material-ui/icons';
import axiosInstance from '../../../axiosInstance'
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
  const[serviceName,setServiceName]=useState()
  const[firstName,setFirstName]=useState()
  const[lastName,setLastName]=useState()
  const[image,setImage]=useState()

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
    serviceName:'',
    firstName:'',
    lastName:''
  });

  const fetchPromo = (e) => {
    axios
      .get(`${backendHost}/sponsored/get/contract/${id}`)
      .then((res) => {
        setPromo(res.data);
        const promoData = res.data[0];
        setInitialState({
          code: promoData.serviceId,
          startDate: promoData.startDate.split('T')[0],
          endDate: promoData.endDate.split('T')[0],
          maxLimit: promoData.userId,
          active: promoData.fee,
          title: promoData.currency,
          review: promoData.status,
          count: promoData.userId,
          serviceName:promoData.serviceName,
          firstName:promoData.contactFirstName,
          lastName:promoData.contactLastName,

        //   review: promoData.ReviewStatus.toString(), 
        //   count: promoData.AdCount.toString(),
        });
        setCode(promoData.serviceId);
        setStart(promoData.startDate.split('T')[0]);
        setEnd(promoData.endDate.split('T')[0]);
        setMax(promoData.userId);
        setActive(promoData.fee);
        setTitle(promoData.currency);
        setReview(promoData.status.toString());
          setCount(promoData.userId);
          setServiceName(promoData.serviceName)
          setLastName(promoData.contactLastName);
          setFirstName(promoData.contactFirstName);
        // setReview(promoData.ReviewStatus.toString());
        // setCount(promoData.AdCount.toString());
      })
      .catch((err) => {
        return;
      });
  };


  console.log('code',code)
  console.log('max',maxLimit)

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);

    console.log('Image selected:', {
      image: file.name,
    });
  }
  const getHospital = () => {
    axiosInstance.get(`/article/all/table/registration`).then((res) => {
      setCompanyList(res.data);
    })
    
  };

  const getAds = () => {
    axiosInstance.get(`/article/all/table/AdsTypes`).then((res) => {
      setAdsList(res.data);
    }).catch((err) => {
      console.log(err);
    });
  };

  const getCampaign = () => {
    axiosInstance.get(`/article/all/table/SponsoredServicesMaster`).then((res) => {
      console.log('spon',res.data)
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

    
    const formData = new FormData();

    // Append Contract_Map data as JSON string
    formData.append('Contract_Map', JSON.stringify({
      ServiceID: parseInt(code),
      UserID: parseInt(maxLimit),
      ContactFirstName: firstName,
      ContactLastName: lastName,
      Fee: parseInt(active),
      Currency: title,
      Status: parseInt(review),
      StartDate: startDate,
      EndDate: endDate,
      UpdatedBy:parseInt(userId)
    }));
  
    // Append the image to FormData
    if (image) {
      formData.append('document', image);
    }
  
    // Send the complete FormData to the backend
    axios
      .post(`${backendHost}/sponsored/update/contract/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        history.back()
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
      });

  };

  return (
    <div className="container">
      <div className="card my-3">
        <div className="card-title h3 text-center py-2 border-bottom">Update Contract Details</div>
        <form onSubmit={submitForm}>
          <div className="row m-4">


          <Form.Group className="col-md-6 float-left">
              <Form.Label>Enter Contact First Name</Form.Label>
              <Form.Control
                type="text"
                name=""
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="col-md-6 float-left">
              <Form.Label>Enter Contact Last Name</Form.Label>
              <Form.Control
                type="text"
                name=""
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>


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
                    {c[1]}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="col-md-6 float-left">
              <Form.Label>Enter User Name</Form.Label>
              <Form.Control
                as="select"
                value={maxLimit}
                onChange={(e) => setMax(e.target.value)}
              >
                <option value="">{maxLimit}</option>
                {companyList.map((c) => (
                  <option key={c[0]} value={c[0]}>
                    {`${c[1]} ${c[2]}`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="col-md-6 float-left">
              <Form.Label> Start Date</Form.Label>
              <Form.Control
                type="Date"
                defaultValue={startDate}
                onChange={(e) => setStart(e.target.value)}
                name=""
                placeholder="Start Date here..."
              
              />
            </Form.Group>

            <Form.Group className="col-md-6 float-left">
              <Form.Label> End Date</Form.Label>
              <Form.Control
                type="Date"
                defaultValue={endDate}
                onChange={(e) => setEnd(e.target.value)}
                name=""
                placeholder="End Date here..."
                
              />
            </Form.Group>

           

            
            <Form.Group className="col-md-6 float-left">
              <Form.Label>Enter Fee</Form.Label>
              <Form.Control
                type="number"
                name=""
                value={active}
                onChange={(e) => setActive(e.target.value)}
              
              />
            </Form.Group>

            <Form.Group className="col-md-6 float-left">
              <Form.Label>Enter Currency</Form.Label>
              <Form.Control
                type="text"
                name=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                
              />
            </Form.Group>

           
            <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                <Form.Label>Upload Image</Form.Label>
                <Form.Control type="file" accept=".pdf, .doc, .docx" onChange={handleImageChange}  />
              </Form.Group>

          

            <div className="col-lg-6 form-group">
              <label htmlFor="">Review Status</label>
              <select
                multiple
                name="featured"
                placeholder="Review"
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
