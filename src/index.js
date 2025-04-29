import React from 'react';
import './index.css';
import App from './App';
import './assets/healthcare/css/mobile.css'
import reportWebVitals from './reportWebVitals';
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

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
