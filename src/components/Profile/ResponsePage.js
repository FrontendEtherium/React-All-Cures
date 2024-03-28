import React from 'react'
import {useState,useEffect} from 'react'
import { backendHost } from "../../api-config";
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const ResponsePage = () => {

    const response=localStorage.getItem('apiResponse')
    console.log('responsepage',response)
    const responseObject = JSON.parse(response);
    console.log('res',responseObject.orderID)

    const[getResponse,setGetResponse]=useState('')


    useEffect(()=>{

      fetch(`${backendHost}/payment/get/payment-udpates/${responseObject.orderID}`)
      .then(res=>res.json())
      .then(json=>{
        console.log("res",json)
        setGetResponse(json)
      })
    },[])
  return (
   <>
<Header/>
<div  style={{height:"100px",marginTop:"4rem"}}>

  {!getResponse &&
  (
<>

<div className="container d-flex justify-content-center mb-2" > 
  <h4> Please wait while we complete your Payment...</h4>
  </div>

  <div className="container d-flex justify-content-center mt-2 mb-5">
 
  <h2> Do not refresh the page...</h2>
  </div>

  </>
 ) }
  {getResponse&&
  
  <h3>Payment Status:{getResponse}</h3>
  }

</div>

<Footer/>

    </>
  )
}

export default ResponsePage