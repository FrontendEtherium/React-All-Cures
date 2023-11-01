import React from 'react';
import { Link } from 'react-router-dom';

const DoctorsCard = ({rowno, firstName, lastName, primary_spl, hospital_affliated, state, country_code}) => {

   const onError = (e) => {
      e.target.parentElement.innerHTML = `<i class="fas fa-user-md fa-10x"></i>`
   }
   
    return(
        <>
         <div className="item" key={rowno}>
    <div className="item-img">
    {/* <object data="avatar.jpg" type="image/jpg"> */}
      <img src={`https://all-cures.com:444/cures_articleimages/doctors/${rowno}.png`} 
      onError={(e) => onError(e)}/>
      {/* </object> */}
    </div>
    <div className="sider-contain">
       <div className="slider-heading">
          <h2>Dr. {firstName} {lastName}</h2>
          <p>{primary_spl}</p>
          <h5 className="text-center">{hospital_affliated} {state} {country_code}</h5>
       </div>
       <Link to={ `/profile/${rowno}-${firstName}-${lastName}` } className="appointmentBtn allBtn" id="visitDoc">Visit Profile</Link>
    </div>
 </div>
        </>
    )
}

export default DoctorsCard;
