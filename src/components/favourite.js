import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { backendHost } from '../api-config';
import { Link } from 'react-router-dom';
import { Alert, Form } from 'react-bootstrap';
import { userId } from './UserId';
import { userAccess } from './UserAccess';




function  Favourite ({article_id}) {

  const [alert,setAlert] = useState()

  
const favouriteForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}/favourite/userid/${userId}/articleid/${article_id}/status/1/create  `, {
      
    })
    .then(res => {
   
     setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 4000);
    })
    .catch(res => console.log(res))
} 
  return (
      
                                    <form onSubmit={favouriteForm} className="favouriteForm">
                                     <div className="row m-4">

                                        {
                                            alert?
                                                <Alert variant="success" className="h6 mx-3 success" id="success-fav">Added To Your Favourite List successfully!!</Alert>
                                                : null
                                        }
                                
                                    
                                        </div>
                                    
                                    
                                        <div className="">
                                            <button type="submit" className="ml-5 mt-4 btn-article-search favourite" ><i className='fas fa-heart fa-1x'></i> Add To Favourite</button>
                                            
                                          
                                           
                                        </div>
                                        </form>
                         

  );
}

export default Favourite;
