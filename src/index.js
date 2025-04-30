import React from 'react';
import './index.css';
import App from './App';
import './assets/healthcare/css/mobile.css'
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { hydrate, render } from "react-dom";
 
const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(  
    <>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </>, 
    rootElement
  );
} else {
  render( 
    <> 
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </>, 
    rootElement
  );
}


