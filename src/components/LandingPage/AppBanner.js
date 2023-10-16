import React,{useState,useEffect} from 'react';
import './AppBanner.css'



const AppBanner = () => {
 const [showPopup, setShowPopup] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    // Check if the user is on a mobile device
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobileDevice) {
          
      setTimeout(() => {    
        setShowPopup(true);
      }, 2000); 
    }
  }, []);

  const openAppOrStore = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        if (/android/i.test(userAgent)) {
            window.location.href = 'https://www.all-cures.com/appRedirect'; 
            
        } if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            window.location.href = 'https://www.all-cures.com/appRedirect'; 
            
        } 




      }





  return (
    <div>
      {showPopup && (
        <div id="app-bnr">
           <p style={{textAlign:"center"}}>Download our app for the best experience.</p>
   <div className=" d-flex justify-content-center" > <button   onClick={openAppOrStore} className=" btn btn-secondary mb-2">Open in App</button></div>
        <div className=" d-flex justify-content-center"> <button onClick={() => setShowPopup(false)}  className=" btn btn-secondary mb-2">Stay on the Website</button></div>
          
        </div>
      )}


    </div>
  );
}

export default AppBanner;
import React,{useState,useEffect} from 'react';
import './AppBanner.css'



const AppBanner = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    // Check if the user is on a mobile device
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobileDevice) {
          
            
     setTimeout(() => {    
      setShowPopup(true);
    }, 2000); 
    }
  }, []);

  const openAppOrStore = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        if (/android/i.test(userAgent)) {
          
        
                // Redirect to Play Store if the app didn't open in a reasonable time
                window.location.href = 'https://play.google.com/store/apps/details?id=com.allcures&hl=en&gl=US';
             
        } if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          
            
                // Redirect to App Store if the app didn't open in a reasonable time
                window.location.href = 'https://apps.apple.com/in/app/all-cures/id1659590351';
            
        } 




      }

  


  return (
    <div>
      {showPopup && (
        <div id="app-bnr"className="">
         <div className=" mb-2 d-flex justify-content-center">  <p style={{textAlign:"center"}}>Download our app for the best experience.</p></div>
         <div className=" d-flex justify-content-center" > <button  onClick={openAppOrStore} className=" btn btn-secondary mb-2">Open in App</button></div>
         <div className=" d-flex justify-content-center"> <button onClick={() => setShowPopup(false)}  className=" btn btn-secondary mb-2">Stay on the Website</button></div>
        </div>
      )}


    </div>
  );
}

export default AppBanner;
