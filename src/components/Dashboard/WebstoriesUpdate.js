import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendHost } from '../../api-config';
import { Link } from 'react-router-dom';
import { Alert, Form } from 'react-bootstrap';
import {useLocation} from "react-router-dom";


const WebstoriesUpdate = () => {

    const [link, setLink] = useState('');
   
    
    const [alertMessage, setAlertMessage] = useState('');
    const [image, setImage] = useState(null);
    const[title,setTitle]=useState('');
    const[description,setDescription]=useState('');
    const[alt,setAlt]=useState('')
    
   

       
    const search = useLocation().search;  
    const id = new URLSearchParams(search).get('webstoriesUpdate');



    useEffect(()=>{

     axios.get(`${backendHost}/data/webStories/get/${id}`)
     .then( res =>{
        setTitle(res.data[0].title)
        setDescription(res.data[0].description)
        setLink(res.data[0].link)
        setAlt(res.data[0].ImageAltText)
        
     }  
        
    )

    },[])


    const submitForm = async (event) => {
        event.preventDefault();
      
       
      
      
          const webData = {
           link:link,
           title:title,
           description:description,
            ImageAltText: alt,
            // webID:parseInt(id)
           
          };
        
          // Log AdMap data before sending
          console.log('webData:', webData);
        
          const formData = new FormData();
          formData.append('webData', JSON.stringify(webData)); // Convert AdMap object to JSON and append it to formData
          if (image) {
            formData.append('image', image);
          }
      
         
        
          console.log(formData)
          axios.post(`${backendHost}/data/webStories/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
          })
        
      
          .then((response) => {
            if (response.data === 1) {
              setAlertMessage('Web stories updated successfully!!');
            } else if (response.data === 0) {
              setAlertMessage('Web stories not updated. Please check all fields and try again.');
            } else {
              setAlertMessage('An error occurred. Please contact the development team.');
            }
      
            setTimeout(() => {
              setAlertMessage('');
            }, 5000); // Hide alert after 3 seconds
          })
          .catch((error) => {
            console.error('Error creating ad:', error);
            setAlertMessage('An error occurred. Please contact the development team.');
            setTimeout(() => {
              setAlertMessage('');
            }, 3000); // Hide alert after 3 seconds
          });
      
        };
        
        
const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);
  
    console.log('Image selected:', {
      image: file.name,
    });
}


  return (
    <div>
      
      <div>
           <div className="promo-page">
                <div className="container">
                <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom"> <b> (Update Web Stories)</b></div>
                        <Form onSubmit={submitForm}  >
                            <div className="row m-4">
                       
                       
    

                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Web story Title </Form.Label>
                            <Form.Control  value={title} onChange={(e) => setTitle(e.target.value)} type="text" name=""
                            placeholder="Enter Title..." required />
                        </Form.Group>

                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Web story Description </Form.Label>
                            <Form.Control  value={description} onChange={(e) => setDescription(e.target.value)} type="text" name=""
                            placeholder="Enter Description..." required />
                        </Form.Group>



                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Web story Link </Form.Label>
                            <Form.Control  value={link} onChange={(e) => setLink(e.target.value)} type="text" name=""
                            placeholder="Enter Description..." required />
                        </Form.Group>

                        
                        
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter ImageAltText  <b> (Optional)</b></Form.Label>
                            <Form.Control  value={alt} onChange={(e) => setAlt(e.target.value)} type="text" name=""
                            placeholder="Enter ImageAltText..."required />
                        </Form.Group>
                       
              <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                <Form.Label>Upload Image </Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageChange} />


{/* 
                {image && (
  <div className="col-md-6 float-left" style={{ zIndex: 2 }}>
    <img src={`https://ik.imagekit.io/qi0xxmh2w/productimages/tr:w-300,f-webp/${image}`} alt="Uploaded" width="200" />
  </div>
)} */}
              </Form.Group>


                    
                      
                    
                     
                        </div>
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </Form>
                    </div>

                    {alertMessage && (
          <Alert variant="danger" className="h6 mx-3">
            {alertMessage}
          </Alert>
        )}

               
                </div>
            </div>

    </div>

    </div>
  )
}

export default WebstoriesUpdate