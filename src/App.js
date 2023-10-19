import React from 'react';
import Main from './components/MainComponent';
import CookieConsent from "react-cookie-consent";
import AppBanner from "./components/LandingPage/AppBanner";


function App() {
  
  return (
    <div>
      <Main/>
      <CookieConsent style={{ background: "#022a3c"}}>
        <div className="container m-3">
      We use cookies to ensure you have the best browsing experience on our website. By using our site, you acknowledge that you have read and understood our <a className="text-underline text-white" href="/">Cookie Policy</a> & <a className="text-underline text-white" href="https://etheriumtech.com/privacy.html" target="_blank" rel="noreferrer">Privacy Policy</a>.
      </div>
      </CookieConsent>
     <AppBanner/>
    </div>
  );
}

export default App;
