import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import InsightsIcon from '@mui/icons-material/Insights';
import BackupIcon from '@material-ui/icons/Backup';
// import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom'
import ListItemButton from '@mui/material/ListItemButton';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import List from '@mui/material/List';
import AddCommentIcon from '@material-ui/icons/AddComment';
import Collapse from '@mui/material/Collapse';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InfoIcon from '@material-ui/icons/Info';
import ListIcon from '@material-ui/icons/List';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import HomeIcon from '@material-ui/icons/Home';
import { userId} from './../UserId';
import { userAccess } from '../UserAccess';

export default function NestedListItems() {
  const [open, setOpen] = React.useState(false);
  const [openn, setOpenn] = React.useState(false);
  const [opennn, setOpennn] = React.useState(false);
  const [opennnn, setOpennnn] = React.useState(false);
  const [opennnnn, setOpennnnn] = React.useState(false);
  const [opened, setOpened] = React.useState(false);
  const[openSpons,setOpenSpons]= React.useState(false);
  const[openList,setOpenList]= React.useState(false);
  

  const [openx, setOpenx] = React.useState(false);
  const handleClick4 = () => {
    setOpenx(!openx);
  };
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick1 = () => {
      
setOpenn(!openn);
  };
  const handleClick2 = () => {
    setOpennn(!opennn);
  };
  const handleClick3 = () => {
    setOpennnn(!opennnn);
  };
  const handleClick5 = () => {
    setOpennnnn(!opennnnn);
  };
  const handleClick6 = () => {
    setOpened(!opened);
  };

  const handleClickSpons= () => {
    setOpenSpons(!openSpons);
  };

  const handleClickList= () => {
    setOpenList(!openList);
  };


  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      
      aria-labelledby="nested-list-subheader"
    >


      { userAccess==9 ?
      <>
      <ListItem button style={{backgroundColor:'lightblue'}}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <Link to="/home">
          <ListItemText primary="Home" />

        </Link>
      </ListItem>



    

      <ListItem button style={{backgroundColor:'lightblue'}}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <Link to="/dashboard">
          <ListItemText primary="Dashboard" />
        </Link>
      </ListItem>

    


      <ListItem button onClick={handleClick4} style={{backgroundColor:'lightblue'}}>
      <ListItemIcon>
              <InsightsIcon />
            </ListItemIcon>
        <ListItemText primary="ANALYTICS" />
        {openx ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openx} timeout="auto" >
        <List component="div9" disablePadding>
          <ListItem button>
            <ListItemIcon>
              <ShowChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Customers"  /> */}
            <Link to="/dashboard?analytics">
              <ListItemText primary="DAILY" />
            </Link>
          </ListItem>

          
        
          <ListItem button>
            <ListItemIcon>
              <ShowChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Customers"  /> */}
            <Link to="/dashboard?ratinganalytics">
              <ListItemText primary="RATING" />
            </Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ShowChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Customers"  /> */}
            <Link to="/dashboard?commentsanalytics">
              <ListItemText primary="COMMENTS" />
            </Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Customers"  /> */}
            <Link to="/dashboard?baranalytics">
              <ListItemText primary="ARTICLE" />
            </Link>
          </ListItem>
       

        </List>
      </Collapse>






   { ( userId==37  || userId==50 || userId==51  || userId==43  || userId==56) && (

      <ListItem button onClick={handleClick} style={{backgroundColor:'lightblue'}}>
      <ListItemIcon>
              <ImportContactsIcon />
            </ListItemIcon>
        <ListItemText primary="ABOUT ARTICLE" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      )}
        
      <Collapse in={open} timeout="auto" >
        <List component="divw" disablePadding>
          <ListItem button>
            <ListItemIcon>
              <ImportContactsIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Customers"  /> */}
            <Link to="/dashboard?article">
              <ListItemText primary="Add Article" />
            </Link>
          </ListItem>


          <ListItem button>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <Link to="/dashboard?tip">
              <ListItemText primary="Add Tip" />
            </Link>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <Link to="/dashboard?tipdetails">
              <ListItemText primary="Tip Details" />
            </Link>
          </ListItem>

          
          <ListItem button>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Customers"  /> */}
            <Link to="/dashboard?blogs">
              <ListItemText primary="Listing Cures" />
            </Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AddCommentIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Customers"  /> */}
            <Link to="/dashboard/?comments">
              <ListItemText primary="Comments" />

            </Link>

          </ListItem>

        </List>
      </Collapse>
      <ListItem button onClick={handleClick1} style={{backgroundColor:'lightblue'}}>
        <ListItemIcon>
<SupervisorAccountIcon/>
        </ListItemIcon>
        <ListItemText primary="ABOUT USERS" />
        {openn ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openn} timeout="auto" >
        <List component="div2" disablePadding>
          <ListItem button>
            <ListItemIcon>
              <SupervisedUserCircleIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard?user">
              <ListItemText primary="Registered" />
            </Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SupervisedUserCircleIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard?subscribedusers">
              <ListItemText primary="Subscribed" />
            </Link>


          </ListItem>
        

        </List>
      </Collapse>

      <ListItem button onClick={handleClick2} style={{backgroundColor:'lightblue'}}>
        <ListItemIcon>
        <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="PROMOTIONS" />
        {opennn ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={opennn} timeout="auto" >
        <List component="div" disablePadding>

          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard/Promoadmin">
              <ListItemText primary="Promo" />
            </Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
             <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Customers"  /> */}
            <Link to="/dashboard?promotions">
              <ListItemText primary="All Promotions" />
            </Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
            <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Customers"  /> */}
            <Link to="/dashboard?create_promo">
              <ListItemText primary="Create Promo" />
            </Link>
          </ListItem>



        </List>
      </Collapse>


               { ( userId==37 || userId==50 || userId==51  || userId==43 || userId==56) && (
      <ListItem button onClick={handleClick3} style={{backgroundColor:'lightblue'}}>
      <ListItemIcon>
              <LocalHospitalIcon />
            </ListItemIcon>
        <ListItemText primary="DOCTORS" />
        {opennnn ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
          )}
                 
      <Collapse in={opennnn} timeout="auto" >
        <List component="divw" disablePadding>
        <ListItem button>
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Customers"  /> */}
    <Link to="/dashboard?doctor">
    <ListItemText primary="Create Doctors Info" />
           </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <NoteAddIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Customers"  /> */}
    <Link to="/dashboard?doctorcreate">
    <ListItemText primary="Create Doctors" />
           </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
       <BackupIcon/>
      </ListItemIcon>
      <Link to="/dashboard?upload-img">
      <ListItemText primary="Upload Image" />
      </Link>
    </ListItem>
        

        </List>
      </Collapse>
     
      <ListItem button onClick={handleClick5} style={{backgroundColor:'lightblue'}}>
        <ListItemIcon>
        <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="ADVS SECTION" />
        {opennnnn ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={opennnnn} timeout="auto" >
        <List component="div" disablePadding>

          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard?createcompany">
              <ListItemText primary="Create Company" />
            </Link>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard?companylist">
              <ListItemText primary="Company List" />
            </Link>
          </ListItem>
         
          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard?createcampaign">
              <ListItemText primary="Create Campaign" />
            </Link>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard?campaignlist">
              <ListItemText primary="Campaign List" />
            </Link>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard?createcampaignads">
              <ListItemText primary="Create Campaign Ads" />
            </Link>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard?campaignadslist">
              <ListItemText primary="Campaign Ads List" />
            </Link>
          </ListItem>

        </List>
      </Collapse>






      <ListItem button onClick={handleClickList} style={{backgroundColor:'lightblue'}}>
        <ListItemIcon>
        <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="SPONSORSHIP" />
        {openList ? <ExpandLess /> : <ExpandMore />}
      </ListItem>




      <Collapse in={openList} timeout="auto" >
        <List component="div" disablePadding>


      <ListItem button onClick={handleClickSpons} style={{backgroundColor:'lightblue'}}>
        <ListItemIcon>
        <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="LISTING" />
        {openSpons ? <ExpandLess /> : <ExpandMore />}
      </ListItem>


</List>
</Collapse>

      <Collapse in={openSpons} timeout="auto" >
        <List component="div" disablePadding>



      <ListItem button onClick={handleClick6} style={{backgroundColor:'lightblue'}}>
        <ListItemIcon>
        <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="VIDEOCHAT" />
        {opened ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
</List>

</Collapse>

      <Collapse in={opened} timeout="auto" >
        <List component="div" disablePadding>



        <ListItem button>
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Customers"  /> */}
    <Link to="/dashboard?mastertable">
    <ListItemText primary=" Create Master Table" />
           </Link>
    </ListItem>
 

    <ListItem button>
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Customers"  /> */}
    <Link to="/dashboard?createcontract">
    <ListItemText primary="Create Contract" />
           </Link>
    </ListItem>


    <ListItem button>
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Customers"  /> */}
    <Link to="/dashboard?allcontract">
    <ListItemText primary="All Contract" />
           </Link>
    </ListItem>

          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard?doctoravailibility">
              <ListItemText primary=" Create Doctor Availabilty" />
            </Link>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard?doctoravailibilitylist">
              <ListItemText primary="Doctor Availabilty List" />
            </Link>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard?allserviceslist">
              <ListItemText primary=" Sponsored Services" />
            </Link>
          </ListItem>

         

          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard?allservicespaymentlist">
              <ListItemText primary="Payment List" />
            </Link>
          </ListItem>


          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard?failurereasonlist">
              <ListItemText primary="Failure List" />
            </Link>
          </ListItem>

          
         
          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard?createservicespaymentmethod">
              <ListItemText primary="Payment Method" />
            </Link>
          </ListItem>


           
          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard?servicespaymentmethodlist">
              <ListItemText primary="Payment Method List" />
            </Link>
          </ListItem>

        </List>
      </Collapse>






                <ListItem button style={{backgroundColor:'lightblue'}}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <Link to="/dashboard?createwebstories">
          <ListItemText primary="Create Webstories" />
        </Link>
      </ListItem>
      
</>:
<>



<ListItem button style={{backgroundColor:'lightblue'}}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <Link to="/home">
          <ListItemText primary="Home" />

        </Link>
      </ListItem>



<ListItem button onClick={handleClickList} style={{backgroundColor:'lightblue'}}>
        <ListItemIcon>
        <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="SPONSORSHIP" />
        {openList ? <ExpandLess /> : <ExpandMore />}
      </ListItem>




      <Collapse in={openList} timeout="auto" >
        <List component="div" disablePadding>


      <ListItem button onClick={handleClickSpons} style={{backgroundColor:'lightblue'}}>
        <ListItemIcon>
        <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="LISTING" />
        {openSpons ? <ExpandLess /> : <ExpandMore />}
      </ListItem>


</List>
</Collapse>

      <Collapse in={openSpons} timeout="auto" >
        <List component="div" disablePadding>



      <ListItem button onClick={handleClick6} style={{backgroundColor:'lightblue'}}>
        <ListItemIcon>
        <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="VIDEOCHAT" />
        {opened ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
</List>

</Collapse>

      <Collapse in={opened} timeout="auto" >
        <List component="div" disablePadding>



        <ListItem button>
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Customers"  /> */}
    <Link to="/dashboard?mastertable">
    <ListItemText primary=" Create Master Table" />
           </Link>
    </ListItem>
 

    <ListItem button>
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Customers"  /> */}
    <Link to="/dashboard?createcontract">
    <ListItemText primary="Create Contract" />
           </Link>
    </ListItem>


    <ListItem button>
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Customers"  /> */}
    <Link to="/dashboard?allcontract">
    <ListItemText primary="All Contract" />
           </Link>
    </ListItem>

          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard?doctoravailibility">
              <ListItemText primary=" Create Doctor Availabilty" />
            </Link>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard?doctoravailibilitylist">
              <ListItemText primary="Doctor Availabilty List" />
            </Link>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard?allserviceslist">
              <ListItemText primary=" Sponsored Services" />
            </Link>
          </ListItem>

         

          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard?allservicespaymentlist">
              <ListItemText primary="Payment List" />
            </Link>
          </ListItem>


          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard?failurereasonlist">
              <ListItemText primary="Failure List" />
            </Link>
          </ListItem>

          
         
          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard?createservicespaymentmethod">
              <ListItemText primary="Payment Method" />
            </Link>
          </ListItem>


           
          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Reports" /> */}
            <Link to="/dashboard?servicespaymentmethodlist">
              <ListItemText primary="Payment Method List" />
            </Link>
          </ListItem>

        </List>
      </Collapse>

</>

               }


    </List>
  );
}
