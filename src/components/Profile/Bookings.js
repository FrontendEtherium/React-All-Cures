import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link, useParams } from "react-router-dom";
import { backendHost } from "../../api-config";
import { useHistory } from "react-router-dom";
import { userId } from "../UserId";
import { userAccess } from "../UserAccess";


import { Container, Button } from "react-bootstrap";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



const Bookings = () => {

    const history = useHistory();
    const [value, setValue] = React.useState(0);
    const[data,setData]=useState([])


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${backendHost}/appointments/get/user/87`); //change 87 to registration ID
          // if (!response.ok) {
          //   return;
          // }
          const json = await response.json();
          setData(json);
          console.log(json);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData(); 
    
    }, []); 
    

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
 

  return (
    <div>
          <Header history={history} />
          <div className="d-flex justify-content-center mt-5">

          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}  centered variant="scrollable"
  scrollButtons
  allowScrollButtonsMobile
  aria-label="scrollable force tabs example">
          <Tab label="Upcoming Meetings" {...a11yProps(0)} />
          <Tab label="Completed Meetings" {...a11yProps(1)} />
        
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        No Upcoming Meetings
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      {data && data.filter(d => d.status === 2).map(filteredData => (
    <div key={filteredData.id}>
      <div className="card shadow-sm mt-2 mb-4">
  
  <div className="card-body">
    <div className="d-flex align-items-center">
    <div className="mr-5"> 
   <div className="mb-2 bookings"> <p> <span  className="fw-bold">Dr. {filteredData.doctorName} </span></p> </div>
   <div className="mb-2 bookings"><p>  Booking Date: {filteredData.appointmentDate}</p> </div>
   <div className="mb-2 bookings"> <p>   Booking Time: {filteredData.startTime} - {filteredData.endTime}</p> </div>
    </div>
    <div  className="bookings-img text-center ml-auto">
    <i className="fas fa-user-md fa-6x"></i>
    </div>

    </div>
  
 
  </div>
</div>
       
    </div>
))}
      </CustomTabPanel>
      
    </Box>
          </div>

          <Footer/>


    </div>
  )
}

export default Bookings

















