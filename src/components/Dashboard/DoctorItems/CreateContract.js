import React, { useState, useEffect } from 'react';
import { Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import { backendHost } from '../../../api-config';
import { userId } from '../../UserId';

function Feedback() {
  const [name, setName] = useState('');
  const [first, setFirst] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [feedback, setFeedback] = useState('');
  const [alert, setAlert] = useState(false);
  const [fee, setFee] = useState('');
  const [currency, setCurrency] = useState('');
  const [image, setImage] = useState(null);


  const [startDate, setStart] = useState(new Date());
  const [endDate, setEnd] = useState(new Date());
  const [documentFile,setDocumentFile] = useState(null);
  const [serviceList, setServiceList] = useState([]);
  const [userList, setUserList] = useState([]);




// const submitForm = (e) => {
//   e.preventDefault();

//   const formData = new FormData();
//   formData.append('ServiceID', first);
//   formData.append('UserID', name);
//   formData.append('ContactFirstName', email);
//   formData.append('ContactLastName', number);
//   formData.append('CreatedBy', userId);
//   formData.append('Fee', fee);
//   formData.append('Currency', currency);
//   formData.append('Status', feedback);

//   formData.append('StartDate', startDate);
//   formData.append('EndDate', endDate);

//   if (documentFile) {
//     formData.append('image', documentFile, documentFile.name);
//   }

//   axios
//     .post(`${backendHost}/sponsored/add/contract`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//     .then((res) => {
//       setAlert(true);
//       setTimeout(() => {
//         setAlert(false);
//       }, 4000);
//     })
//     .catch((res) => console.log(res));
// };


const submitForm = (e) => {
e.preventDefault();

const formData = new FormData();

// Append Contract_Map data as JSON string
formData.append('Contract_Map', JSON.stringify({
  ServiceID: parseInt(first),
  UserID: parseInt( name),
  ContactFirstName: email,
  ContactLastName: number,
  CreatedBy: parseInt( userId),
  Fee: fee,
  Currency: currency,
  Status: parseInt(feedback),
  StartDate: startDate,
  EndDate: endDate,
}));

// Append the image to FormData
if (image) {
  formData.append('document', image);
}

// Send the complete FormData to the backend
axios
  .post(`${backendHost}/sponsored/create/contract`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  .then((res) => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 4000);
  })
  .catch((error) => {
    console.error('Error submitting data:', error);
  });
};


  const handleFullNameChange = (selectedFullName) => {
    const [userId, firstName, lastName] = selectedFullName.split(' ');
    setName(selectedFullName);
    setFirst(first); // Keep the existing value for ServiceID
    setEmail(firstName);
    setNumber(lastName);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);

    console.log('Image selected:', {
      image: file.name,
    });
  }
  

  const getServiceList = () => {
    axios
      .get(`${backendHost}/article/all/table/SponsoredServicesMaster`)
      .then((res) => {
        setServiceList(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getServiceList();

    axios
      .get('https://uat.all-cures.com:444/cures/article/all/table/registration')
      .then((res) => {
        const userData = res.data;

        const userOptions = userData.map((user) => ({
          value: `${user[0]}`,
          label: `${user[1]} ${user[2]}`,
        }));
        

        setUserList(userOptions);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="promo-page">
        <div className="container">
          <div className="card my-3">
            <div className="card-title h3 text-center py-2 border-bottom">
              Create Contract Here !
            </div>
            <form onSubmit={submitForm}>
              <div className="row m-4">
              
                <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="">Enter Service Name</label>
<select name="state" value={first} onChange={(e) => setFirst(e.target.value)} placeholder="Enter State" required="" className="form-control">
<option>Select State</option>
    {serviceList.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
</select>
                        </Form.Group>
                <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                  <Form.Label>Enter UserID </Form.Label>
                  <Form.Control
                    as="select"
                    value={name}
                    onChange={(e) => handleFullNameChange(e.target.value)}
                  >
                    <option>Select FullName</option>
                    {userList.map((user) => (
                      <option key={user.value} value={user.value}>
                        {user.label}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                  <Form.Label>Enter Contact First Name </Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Enter Contact First Name..."
                  />
                </Form.Group>

                <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                  <Form.Label>Enter Contact Last Name </Form.Label>
                  <Form.Control
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    type="text"
                    placeholder="Enter Contact Last Name..."
                  />
                </Form.Group>

                <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                  <Form.Label>Contract Start Date</Form.Label>
                  <Form.Control
                    type="Date"
                    value={startDate}
                    onChange={(e) => setStart(e.target.value)}
                    placeholder="Start Date here..."
                    required
                  />
                </Form.Group>

                <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                  <Form.Label>Contract End Date</Form.Label>
                  <Form.Control
                    value={endDate}
                    onChange={(e) => setEnd(e.target.value)}
                    type="Date"
                    placeholder="End Date here..."
                    required
                  />
                </Form.Group>

                <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                  <Form.Label>Enter Currency </Form.Label>
                  <Form.Control
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    type="text"
                    placeholder="Enter Currency..."
                  />
                </Form.Group>

                <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                  <Form.Label>Enter Fees </Form.Label>
                  <Form.Control
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    type="text"
                    placeholder="Enter Fees..."
                  />
                </Form.Group>
                <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
  <Form.Label>Status?</Form.Label>
  <div>
    <Form.Check
      inline
      label="Active"
      name="whatsapp"
      type="radio"
    
      value="1"
      onChange={(e) => setFeedback(e.target.value)}
      style={{ marginRight: "20px" }}
    />
    <Form.Check
      inline
      label="InActive"
      name="whatsapp"
      type="radio"
    
      value="0"
      onChange={(e) => setFeedback(e.target.value)}
      style={{ marginLeft: "20px" }}
    />
  </div>
</Form.Group>

                {/* <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                  <Form.Label>Upload Document</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setDocumentFile(e.target.files[0])}
                    accept=".pdf, .doc, .docx"
                  />
                </Form.Group> */}
                 <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" accept=".pdf, .doc, .docx" onChange={handleImageChange} />
            </Form.Group>

                {alert ? (
                  <Alert variant="success" className="h6 mx-3">
                    Thanks For the contract!!
                  </Alert>
                ) : null}
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
    </div>
  );
}

export default Feedback;
