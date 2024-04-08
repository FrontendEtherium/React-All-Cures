import React,{useEffect} from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const PaymentRedirect = () => {

    useEffect(()=>{

    // const enc=localStorage.getItem('encKey')
    // console.log("enc",enc)
      

    const params = new URLSearchParams(window.location.search);
    const enc = params.get('encRequest');
    const accessCode = params.get('accessCode');

    // console.log(enc)
    // console.log(accessCode)
        
      const form = document.createElement('form');
      form.setAttribute('method', 'post');
      form.setAttribute('action', 'https://secure.ccavenue.com/transaction.do?command=initiateTransaction');
      form.style.display = 'none'; // Hide the form
    
      // Create and append hidden input fields for encRequest and accessCode
      const encRequestInput = document.createElement('input');
      encRequestInput.setAttribute('type', 'hidden');
      encRequestInput.setAttribute('name', 'encRequest');
      encRequestInput.setAttribute('value',enc);
      
      const accessCodeInput = document.createElement('input');
      accessCodeInput.setAttribute('type', 'hidden');
      accessCodeInput.setAttribute('name', 'access_code');
    //   accessCodeInput.setAttribute('value', 'AVNH05LB56CF25HNFC');
      accessCodeInput.setAttribute('value', ' accessCode');
    
      // Append input fields to the form
      form.appendChild(encRequestInput);
      form.appendChild(accessCodeInput);
    
      // Append the form to the document body
      document.body.appendChild(form);
    
      // Submit the form
      form.submit();



    },[])
  return (
    <div>
        <Header/>
        <div style={{height:"80vh"}}></div>
        <Footer/>
    </div>
  )
}

export default PaymentRedirect
