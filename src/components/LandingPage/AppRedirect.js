import React, { useEffect } from 'react';

const AppRedirect = () => {

useEffect(()=>{

    console.log('i am available')

    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
    if (/android/i.test(userAgent)) {
      
    
            // Redirect to Play Store if the app didn't open in a reasonable time
            window.location.href = 'https://play.google.com/store/apps/details?id=com.allcures&hl=en&gl=US';
         
    } if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      
        
            // Redirect to App Store if the app didn't open in a reasonable time
            window.location.href = 'https://apps.apple.com/in/app/all-cures/id1659590351';
        
    } 

},[])

  return (
    <div>
       Redirecting to app
    </div>
  )
}

export default AppRedirect