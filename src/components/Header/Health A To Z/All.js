import React, {useEffect,useState, useRef} from 'react';
import Header from '../Header';
import Footer from '../../Footer/Footer';
import { Alert, Form } from 'react-bootstrap';


import { Link } from 'react-router-dom'

function Disease() {

    const[diseaseList,setDiseaseList] = useState([])


   

   return(
    <div>
        <Header/>

                                      {/* <h1>DISEASEE STARTING FROM  A</h1> */}


                                      <div >
                <div className="container">
                <div >
                <div className="card-title h3 mt-5 py-2 border-bottom" id='dis'> All Diseases </div> </div>
                       
    <div class="grid-container mt-5 ">
  <div class="grid-item">
      <Link to="/searchcategory/disease/1">
         Arthritis
         </Link></div>
         <div class="grid-item">
      <Link to="/searchcategory/disease/12">
      Blood Disorders
         </Link></div>

         <div class="grid-item">
      <Link to="/searchcategory/disease/14">
      Bones and Joints
         </Link></div>

         <div class="grid-item">
      <Link to="/searchcategory/disease/16">
      Brain and Nervous System
         </Link></div>
         <div class="grid-item">
      <Link to="/searchcategory/disease/25">
      Cancer
         </Link></div>

         <div class="grid-item">
      <Link to="/searchcategory/disease/43">
      Cardiovascular
         </Link></div>
         <div class="grid-item">
      <Link to="/searchcategory/disease/56">
      Digestive Disorders
         </Link></div>

         <div class="grid-item">
      <Link to="/searchcategory/disease/73">
      Endocrine and metabolic Diseases
         </Link></div>
         <div class="grid-item">
      <Link to="/searchcategory/disease/88">
      Eye Health
         </Link></div>

         <div class="grid-item">
      <Link to="/searchcategory/disease/93">
      Foot Problems
         </Link></div>
         <div class="grid-item">
      <Link to="/searchcategory/disease/95">
      Infections
         </Link></div>
         <div class="grid-item">
      <Link to="/searchcategory/disease/97">
      Infectious Diseases
         </Link></div>
         <div class="grid-item">
      <Link to="/searchcategory/disease/108">
      Injuries
         </Link></div>

         <div class="grid-item">
      <Link to="/searchcategory/disease/110">
      Lung and Respiratory Health
         </Link></div>

         <div class="grid-item">
      <Link to="/searchcategory/disease/117">
      Mental Health
         </Link></div>
         <div class="grid-item">
      <Link to="/searchcategory/disease/131">
      Pain Management
         </Link></div>
         <div class="grid-item">
      <Link to="/searchcategory/disease/138">
      Sensitive topics
         </Link></div>

        
         <div class="grid-item">
      <Link to="/searchcategory/disease/145">
      Sexual Health
         </Link></div>
         <div class="grid-item">
      <Link to="/searchcategory/disease/155">
      Skin Problems
         </Link></div>
         <div class="grid-item">
      <Link to="/searchcategory/disease/163">
      Sleep Disorders
         </Link></div>
         <div class="grid-item">
      <Link to="/searchcategory/disease/168">
      Urinary Disorders
         </Link></div>
        


         <div class="grid-item">
      <Link to="/searchcategory/disease/156">
      Acne
         </Link></div>
         <div class="grid-item">
      <Link to="/searchcategory/disease/126">
      Oral Diseases
         </Link></div>
         <div class="grid-item">
      <Link to="/searchcategory/disease/69">
      Ear Disorders
         </Link></div>
      


         <div class="grid-item">
      <Link to="/searchcategory/disease/164">
      Insomnia
         </Link></div>
      

       

         <div class="grid-item">
      <Link to="/searchcategory/disease/176">
      Healthy Lifestyle
         </Link></div>

       

         <div class="grid-item">
      <Link to="/searchcategory/disease/74">
      Diabetes
         </Link></div>

      

         <div class="grid-item">
      <Link to="/searchcategory/disease/50">
      Hypertension
         </Link></div>

     

      

         <div class="grid-item">
      <Link to="/searchcategory/disease/160">
      Psoriasis
         </Link></div>

         <div class="grid-item">
      <Link to="/searchcategory/disease/137">
      Migraines Headaches
         </Link></div>

         <div class="grid-item">
      <Link to="/searchcategory/disease/87">
      Thyroid Disorders
         </Link></div>

     
</div>
                          </div></div>


                    
                   
               
{/* 
                <h1>END OF A</h1>

                <h1>sTART OF B</h1> */}
                

          
              
<Footer/>

    </div>
   );


}
export default Disease;
