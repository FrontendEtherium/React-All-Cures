import React, { useState } from 'react';
import axios from 'axios';
import { Alert} from 'react-bootstrap';
import { backendHost } from '../api-config';
import { userId } from './UserId';
import { userAccess } from './UserAccess';




const Comment = ({refreshComments, docid}) => {

    const [cmtText,setCmtText] = React.useState('')
    const [succAlert, setAlert] = useState('')


    const postComment = (e) => {
        e.preventDefault()

        if(cmtText !== '') {
            axios.post(`${backendHost}/DoctorRatingActionController?comments=${cmtText}&ratedbyid=${userId}&ratedbytype=${userAccess}&targetid=${docid}&targetTypeid=1&cmd=rateAsset`)
            .then(res => {
               
                setAlert(true)
                setTimeout(() => {
                    setAlert(false)
                }, 4000);
                // window.location.reload(false);
            })
            
            .then(err => {
                return
            })
            .catch(err => {return}
            )
            
             refreshComments()
        }else {
            alert('Enter comment')
        }
        
    }

    return (
        <>
            <div>
                <form action="" onSubmit={(e) => postComment(e)} className="form-group">
                    <label htmlFor="commentField">Comment</label>
                    <textarea name="" 
                    onChange={(e) => {
                        setCmtText(e.target.value)
                    }}
                    className="form-control" id="commentField" cols="30" rows="3"></textarea>
                    
                    {
                            succAlert?
                                <Alert variant="success" className="h6 mx-3">comment  successfully!!</Alert>
                                : null
                        }
                    <div className="my-4">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}
 
      
       

export default Comment; 
