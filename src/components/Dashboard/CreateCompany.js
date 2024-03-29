import React, { useState } from 'react';
import axios from 'axios';
import { backendHost } from '../../api-config';
import { Alert, Form } from 'react-bootstrap';

function App() {
  const [first, setFirst] = useState('');
  const [middle, setMiddle] = useState('');
  const [last, setLast] = useState('');
  const [emaill, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [alert, setAlert] = useState('');
  const [isError,setIsError]=useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${backendHost}/sponsored/create/company`, {
        CompanyName: first,
        CompanyWebsite: middle,
        ContactPerson: last,
        Phone: phone,
        Email: emaill,
      })
      .then((res) => {
        if (res.data === 1) {
          setAlert('Company created successfully!!');
        } else if (res.data === 0) {
          setAlert('Company not created. Please check all fields and try again.');
        } else {
          setAlert('An error occurred. Please contact the development team.');
        }

        setTimeout(() => {
          setAlert('');
        }, 3000); // Hide alert after 3 seconds
      })
      .catch((error) => {
        console.error('Error creating company:', error);
        setAlert('An error occurred. Please contact the development team.');
        setTimeout(() => {
          setAlert('');
        }, 3000); // Hide alert after 3 seconds
      });
  };

  return (
    <div className="promo-page">
      <div className="container">
        <div className="card my-3">
          <div className="card-title h3 text-center py-2 border-bottom">
            <b> (Create Company)</b>
          </div>
          <form onSubmit={submitForm}>
            <div className="row m-4">
              <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                <Form.Label>Enter Company Name <b> (Required)</b></Form.Label>
                <Form.Control
                  value={first}
                  onChange={(e) => setFirst(e.target.value)}
                  type="text"
                  name=""
                  placeholder="Enter Company Name..."
                  required
                />
              </Form.Group>

              <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                <Form.Label>Enter Company Website Name <b> (Optional)</b></Form.Label>
                <Form.Control
                  value={middle}
                  onChange={(e) => setMiddle(e.target.value)}
                  type="text"
                  name=""
                  placeholder="Enter Company Website Name..."
                />
              </Form.Group>

              <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                <Form.Label>Enter Contact Person <b> (Required)</b></Form.Label>
                <Form.Control
                  value={last}
                  onChange={(e) => setLast(e.target.value)}
                  type="text"
                  name=""
                  placeholder="Enter Contact Person..."
                  required
                />
              </Form.Group>

              <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                <Form.Label>Enter Company Email <b> (Required)</b></Form.Label>
                <Form.Control
                  value={emaill}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  name=""
                  placeholder="Enter Company Email..."
                  required
                  
                />
              </Form.Group>

              <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                <Form.Label>Enter Phone Number <b> (Required)</b></Form.Label>
                {/* <Form.Control
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                  name=""
                  placeholder="Enter Phone Number..."
                  required
                /> */}



<Form.Control
                              value={phone}
                              error={isError}
                              type="number" 
                                  name=""
                             placeholder="Enter Phone Number..."
                               required
                               onChange={(e) => {
                             setPhone(e.target.value);
                         if (e.target.value.length > 10) {
                          setIsError(true);
                            } else {
                         setIsError(false);
                                  }
                                          }}
                                              />
<<<<<<< HEAD
            {isError && <p className="text-danger">Please enter a valid 10-digit phone number.</p>}
                            

                            
                            
                            
                        </Form.Group>
                          
                    
                        {
                            alert?
                                <Alert variant="success" className="h6 mx-3">Company Create successfully!!</Alert>
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
   
   
       
       
        

=======
            {isError && <p className="text-danger">Please enter a valid 10-digit phone number.</p>}
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
>>>>>>> fb6a7866c4c0e5439616594c06fa375c83ca7c7f
  );
}

export default App;
