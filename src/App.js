import React from "react";
import Main from './components/MainComponent';
import CookieConsent from "react-cookie-consent";
import AppBanner from "./components/LandingPage/AppBanner";
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Main />
      <CookieConsent
        style={{
          background: "#022a3c",
          width: "50%",
          margin: "0 auto",
          borderRadius: "10px",
          padding: "10px 20px",
          position: "fixed",
          bottom: "20px",
          left: "51%",
          transform: "translateX(-50%)",
          zIndex: "1000",
          textAlign: "center"
        }}
        buttonStyle={{
          background: "#4585FF",
          color: "white",
          fontSize: "14px",
          borderRadius: "5px",
          padding: "5px 10px",
          marginLeft: "15px",
          border: "none"
        }}
      >
        <div style={{ color: "#fff", margin: "0" }}>
          We use cookies to ensure you have the best browsing experience on our website. By using our site, you acknowledge that you have read and understood our <Link className="text-underline text-white" to="/">Cookie Policy</Link> & <Link className="text-underline text-white" to="/privacy" target="_blank" rel="noreferrer">Privacy Policy</Link>.
        </div>
      </CookieConsent>
      <AppBanner />
    </div>
  );
}

export default App;
