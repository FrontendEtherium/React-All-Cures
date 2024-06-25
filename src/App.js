import React, { useEffect, useState } from "react";
import Main from './components/MainComponent';
import CookieConsent from "react-cookie-consent";
import AppBanner from "./components/LandingPage/AppBanner";
import { Link } from 'react-router-dom';
  
const App = () => {
    
    // useEffect(() => {
    //   const canonicalLink = document.createElement('link');
    //   canonicalLink.rel = 'canonical';
    //   canonicalLink.href = window.location.href;
    //   document.head.appendChild(canonicalLink);

    //   console.log('Canonical link:', canonicalLink);

  
    //   return () => {
    //     document.head.removeChild(canonicalLink);
    //   };


    // }, []);
  
  return (
    <div>
      <Main/>
      <CookieConsent style={{ background: "#022a3c"}}>
        <div className="container m-3">
        We use cookies to ensure you have the best browsing experience on our website. By using our site, you acknowledge that you have read and understood our <Link className="text-underline text-white" to="/">Cookie Policy</Link> & <Link className="text-underline text-white" to="/privacy" target="_blank" rel="noreferrer">Privacy Policy</Link> </div>
      </CookieConsent>
  <AppBanner/>
    </div>
  );
}

export default App;
