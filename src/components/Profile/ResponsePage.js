import React from 'react'
import {useState,useEffect} from 'react'
import { backendHost } from "../../api-config";
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Avatar from "@mui/material/Avatar";
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';

const ResponsePage = () => {

    const response=localStorage.getItem('apiResponse')
    // console.log('responsepage',response)
    const responseObject = JSON.parse(response);
    // console.log('res',responseObject.orderID)

    const[getResponse,setGetResponse]=useState('')


    useEffect(()=>{


      function sendMessageToApp() {
        
        // Send a message to the React Native app
        window.ReactNativeWebView.postMessage("Payment Successful");


      }

     

      sendMessageToApp()

      const redirectURL = "https://www.all-cures.com:444/cures/statusPayment" 
     

    // Redirecting to the URL
    window.location.href = redirectURL;




    },[])


    
  return (

<></>
  )
}

export default ResponsePage
