import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useEffect } from 'react'
import {useLocation} from "react-router-dom";

const DoctorLink = () => {

    // const search = useLocation().search;  
    // const id = new URLSearchParams(search).get('linkid');

    const { pathname } = useLocation();
    const id = pathname.substring(1) ;
  
  

    useEffect(() => {

      console.log(id.split('notification/')[0])
    
        // window.location.href = 'https://uat.daily.co/qLxOzn6ZKVyqkQ6YByzL';
      
        // window.location.href = `https://${id.split('notification/')[0]}`;

        const newURL = `https://${id.replace('notification/', '')}`;
    window.location.replace(newURL);
      }, []);
  return (
    <div style={{height:"100vh"}}>


        <Header/>
        <Footer/>
    </div>

  )
}

export default DoctorLink