import React from 'react'
import { useEffect } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Avatar from "@mui/material/Avatar";
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';

const ResponsePage = () => {
  const response = localStorage.getItem('apiResponse');
  const responseObject = JSON.parse(response);

  useEffect(() => {
    const sendMessageAndRedirect = async () => {
      try {
        if (window.ReactNativeWebView && typeof window.ReactNativeWebView.postMessage === 'function') {
          await window.ReactNativeWebView.postMessage("Payment Successful");
        } else {
          console.warn("ReactNativeWebView is not available");
        }
      } catch (error) {
        console.error("Error occurred:", error);
      } finally {
        const redirectURL = "https://www.all-cures.com/statusPayment";
        window.location.href = redirectURL;
      }
    };

    sendMessageAndRedirect();
  }, []);

  return (
    <>
      <Header />
      <div>
        {/* Add any content you want to display here */}
      </div>
      <Footer />
    </>
  );
};

export default ResponsePage;
