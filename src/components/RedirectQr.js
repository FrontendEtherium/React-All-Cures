import React, { useEffect } from 'react';

const RedirectQr = () => {
  useEffect(() => {
    // Redirect to www.all-cures.com
    window.location.href = 'https://www.all-cures.com';
  }, []);

  return (
    <div style={{height:"100vh"}}>
      
    </div>
  );
};

export default RedirectQr;
