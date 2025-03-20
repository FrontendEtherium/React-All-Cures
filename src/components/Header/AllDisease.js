import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import axios from 'axios';
import { backendHost } from '../../api-config';
import { Link } from 'react-router-dom'
import A from './Health A To Z/A'

function Disease() {

    
   return(
    <div>
        <Header/>

                                      {/* <h1>DISEASEE STARTING FROM  A</h1> */}


        <div className="">
                <div className="container">
                    <h3>All Disease From A To Z</h3>
                    <div class="container mt-3">
  
 <br/>
  
</div>


                <div className="container">
                   
               
                        <div className="card-title h3  py-2 border-bottom" id='dis'> 
                        
                        <div class="container mt-3" >
                        <div class="btn-group btn-group-lg" >
                        
                        <Link to="/alldisease"><button type="button" class=" btn-lg" id='dis1'>ALL</button></Link>

  <Link to="/alldisease-A">  <button type="button" class=" btn-lg" id='dis1'>A</button></Link>
  <Link to="/alldisease-B">  <button type="button" class=" btn-lg" id='dis1'>B</button></Link>
  <Link to="/alldisease-C"> <button type="button" class=" btn-lg" id='dis1'>C</button></Link>
  <Link to="/alldisease-D"> <button type="button" class=" btn-lg" id='dis1'>D</button></Link>
  <Link to="/alldisease-E"> <button type="button" class=" btn-lg" id='dis1'>E</button></Link>
  <Link to="/alldisease-F"> <button type="button" class=" btn-lg" id='dis1'>F</button></Link>
  <Link to="/alldisease-G"><button type="button" class=" btn-lg" id='dis1'>G</button></Link>
  <Link to="/alldisease-H"><button type="button" class=" btn-lg" id='dis1'>H</button></Link>
  <Link to="/alldisease-I"><button type="button" class=" btn-lg" id='dis1'>I</button></Link>
  <Link to="/alldisease-J"><button type="button" class=" btn-lg" id='dis1'>J</button></Link>
  <Link to="/alldisease-K"><button type="button" class=" btn-lg" id='dis1'>K</button></Link>
  <Link to="/alldisease-L"><button type="button" class=" btn-lg" id='dis1'>L</button></Link>
    
  </div><br/>
  <div class="btn-group btn-group-lg">

    
  <Link to="/alldisease-M"><button type="button" class=" btn-lg" id='dis1'>M</button></Link>
  <Link to="/alldisease-N"><button type="button" class=" btn-lg" id='dis1'>N</button></Link>
  <Link to="/alldisease-O"><button type="button" class=" btn-lg" id='dis1'>O</button></Link>
  <Link to="/alldisease-P"><button type="button" class=" btn-lg" id='dis1'>P</button></Link>
  <Link to="/alldisease-Q"><button type="button" class=" btn-lg" id='dis1'>Q</button></Link>
  <Link to="/alldisease-R"><button type="button" class=" btn-lg" id='dis1'>R</button></Link>
  <Link to="/alldisease-S"><button type="button" class=" btn-lg" id='dis1'>S</button></Link>
  <Link to="/alldisease-T"><button type="button" class=" btn-lg" id='dis1'>T</button></Link>
  <Link to="/alldisease-U"><button type="button" class=" btn-lg" id='dis1'>U</button></Link>
  <Link to="/alldisease-V"><button type="button" class=" btn-lg" id='dis1'>V</button></Link>
  <Link to="/alldisease-X"><button type="button" class=" btn-lg" id='dis1'>X</button></Link>
  <Link to="/alldisease-Y"><button type="button" class=" btn-lg" id='dis1'>Y</button></Link>
  <Link to="/alldisease-Z"><button type="button" class=" btn-lg" id='dis1'>Z</button></Link>
  </div>
  
  
  </div>
                        
                        
                        </div>
                    
                             </div>  
                

              
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='disA'> Disease Starting From <b>"A"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/1">
                        <div className="h5  col-md-6 text-right">Arthritis</div>
                        
 </Link>
                        </div>
                        
                        <div className="col-md-6 float-left">
                      
                        <div className="h5  col-md-6 text-left">Ankylosing Spondylitis</div>
                        
                  
                        </div>

                        <div className="col-md-6 float-left">
                           
                        <div className="h5 col-md-6 text-right">Anemia</div>
                        
                        
                        </div>

                        <div className="col-md-6 float-left">
                     
                        <div className="h5  col-md-6 text-left">Alzheimer's Disease</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Autism</div>
                        
                   
                  
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Atrial Fibrillation</div>
                        
                   
                  
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right"> Allergies</div>
                        
                   
                    
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left"> Addictions Substance</div>
                        
                   
                    
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right"> Asthma</div>
                        
                   
                    
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Athlete's Foot</div>
                        
                   
                    
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Anaphylaxis</div>
                        
                   
                    
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">ADHD - ADD</div>
                        
                   
                    
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/disease/156">
                        <div className="h5 col-md-6 text-right">Acne</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Abdominal Pain</div>
                        
                   
                    
                        </div>

                        
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Abuse topics</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left"> Anxiety - Panic Disorder</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Abortion</div>
                        
                  
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Acute Renal Failure</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right"> Appendicitis
                        
                        </div>
                        
                   
                  
                        </div>


                    </div>
                   
                       
                    </div>


                    </div>
                   
                </div>
{/* 
                <h1>END OF A</h1>

                <h1>sTART OF B</h1> */}
                

                

        <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='disB'> Disease Starting From <b>"B"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/12">
                        <div className="h5 col-md-6 text-right">Blood Disorders</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Bones and Joints</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right"> Bladder Cancer</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Brain and Nervous</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Brain Cancer</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Brain Tumors</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Breast Cancer</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left"> Bipolar Disorder</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Back Pain</div>
                        
                   
                   
                        </div>
                      
                    </div>  </div> </div>  
                </div>

                {/* <h1>END OF LIST B</h1>
                <h1>START OF LIST C</h1> */}

                        

        <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"C"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Cancer</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Chronic Fatigue </div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Carcinoid Tumors</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Cervical Cancer</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Colorectal Cancer</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Cardiovascular</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Celiac Disease</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left"> Cholesterol Management</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Constipation</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left"> Crohn's Disease </div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Cataracts</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left"> Chicken Pox </div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Cold and Flu</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left"> Cold </div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">COPD</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Cystic Fibrosis</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Canker Sores</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left"> Carpal Tunnel Syndrome </div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Chronic Female Pelvic Pain</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left"> Chronic Kidney Disease </div>
                        
                   
                   
                        </div>
                      
                    </div>  </div> </div>  
                </div>
            {/* END OF LIST C */}

            <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"D"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/74">
                        <div className="h5 col-md-6 text-right">Diabetes</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Diabetic Neuropathy</div>
                        
                   
                        </div>

                        <div className="col-md-6 float-left">
                      
                        <div className="h5 col-md-6 text-right">Depression</div>
                        
                  
                        </div>

                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Depression Treatment-Resistant</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Dry Mouth</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Digestive Disorders</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Dupuytren's</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left"> DVT</div>
                        
                   
                   
                        </div>
                      
                      
                    </div>  </div> </div>  
                </div>

                {/* END OF D */}

                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"E"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Ear Disorders</div>
                        
                   
                    
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Eating Disorders</div>
                        
                   
                    
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Eczema</div>
                        
                   
                    
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Endocrine and metabolic Diseases</div>
                        
                   
                    
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Endometriosis</div>
                        
                   
                    
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Epilepsy</div>
                        
                   
                    
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Erectile Dysfunction</div>
                        
                   
                    
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left"> Essential Tremors</div>
                        
                   
                    
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Estrogen Replacement Therapy</div>
                        
                   
                    
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left"> Eye Health</div>
                        
                   
                    
                        </div>
                      
                    </div>  </div> </div>  
                </div>

                {/* END OF LIST E */}

                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"F"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Fibromyalgia</div>
                        
                   
                    
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">First Aid</div>
                        
                   
                    
                        </div>

                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Flu</div>
                        
                   
                    
                        </div>

                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Foot Problems</div>
                        
                   
                    
                        </div>
                        
                      
                    </div>  </div> </div>  
                </div>

                {/* END OF LIST F  */}
                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"G"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Gallstones</div>
                        
                   
                    
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Genital Herpes</div>
                        
                   
                    
                        </div>

                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Gestational Diabetes</div>
                        
                   
                    
                        </div>

                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Gingivitis</div>
                        
                   
                    
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Gout</div>
                        
                   
                    
                        </div>
                        
                      
                    </div>  </div> </div>  
                </div>

                {/* END OF LIST G */}

                <div className="">
                <div className="container">
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"H"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Hair Loss</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/disease/176">
                        <div className="h5  col-md-6 text-left">Healthy Lifestyle</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Hearing Loss</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Heart Failure</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Heart Health</div>
                        
                   
                   
                        </div>
                        
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Heartburn - GERD</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Hemorrhoids</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left"> Hep A</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Hep B</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Hep C</div>
                        
                   
                   
                        </div>
                        
  <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Hepatitis</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Hernia</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Herpes Cold Sores</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">HIV-AIDS</div>
                        
                   
                   
                        </div>
                        
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Hodgkin's Disease</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Hormonal Disorders</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">HPV-Genital Warts</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/disease/50">
                        <div className="h5  col-md-6 text-left">Hypertension</div>
                        
                   
                        </Link >
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Hypotension
                        
                        </div>
                        
                   
                   
                        </div>


                    </div>
                   
                       
                    </div>


                    </div>
                   
                </div>

                    {/* END OF LIST H */}


                    <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"I"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">  IBD</div>
                        
                   
                 
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Incontinence / OAB</div>
                        
                   
                 
                        </div>
                    
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">IBS</div>
                        
                   
                 
                        </div>

                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Infection</div>
                        
                   
                 
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Infectious Diseases</div>
                        
                   
                 
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Infertility</div>
                        
                   
                 
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Injuries</div>
                        
                   
                 
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/disease/164">
                        <div className="h5  col-md-6 text-left"> Insomnia</div>
                        
                   
                    </Link>
                        </div>
                      
                      
                    </div>  </div> </div>  
                </div>

                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"J"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                      <h5>There Are No Diseases Beginning With This Letter</h5>
                
        </div>
                       
                    </div>  </div> </div>  
                </div>

                {/* END OF LIST I  */}
                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"K"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">  Kidney Cancer</div>
                        
                   
                   
                   



        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Kidney Disorders</div>
                        
                   
                   
                        </div>
                    
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Kidney Stones</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Knee Pain</div>
                        
                   
                   
                        </div>
                    
                    
                      
                      
                    </div>  </div> </div>  
                </div>

                {/* END OF LIST K */}

                
                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"L"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Lactose intolerance</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Leukemia</div>
                        
                   
                   
                        </div>
                    
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Liver Disease</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Low Testerone</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Lung&Respiratory Health</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Lung Cancer</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Lupus</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left"> Lyme Disease</div>
                        
                   
                   
                        </div>
                      
                      
                    </div>  </div> </div>  
                </div>
                {/* END OF LIST L */}

                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"M"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Macular Degeneration</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Melanoma - Skin Cancer</div>
                        
                   
                   
                        </div>
                    
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Menopause</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Mental Health</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Metabolic Syndrome</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/disease/137">
                        <div className="h5  col-md-6 text-left">Migraines - Headaches</div>
                        
                   
                    </Link >
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Miscarriage</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left"> Multiple Sclerosis</div>
                        
                   
                   
                        </div>
                      
                      
                    </div>  </div> </div>  
                </div>
                {/* END OF LIST M */}

                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"N"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Narcolepsy</div>
                        
                   
                    
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Non-Hodgkin's Lymphoma</div>
                        
                   
                    
                        </div>
                    
                      
                      
                    </div>  </div> </div>  
                </div>
                {/* END OF LIST N */}

                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"O"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Oral Cancer</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Oral Diseases</div>
                        
                   
                   
                        </div>
                    
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Osteoarthritis</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Osteoporosis</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Ovarian Cancer</div>
                        
                   
                   
                        </div>
                       
                    </div>  </div> </div>  
                </div>
{/* 
                END OF LIST O  */}

                


                    <div className="">
                <div className="container">
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"P"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right"> Pain Management</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Pancreatic Cancer</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Parkinson's Disease</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Pelvic Inflammatory Disease</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Pink Eye - Conjunctivitis</div>
                        
                   
                   
                        </div>
                        
                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">PMS</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Pneumonia</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left"> Polycystic Ovary Syndrome</div>
                        
                   
               
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Postpartum Depression</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Pregnancy Complications</div>
                        
                   
                   
                        </div>
                        
  <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Prostate Cancer</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Prostate Enlargement/BPH</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/disease/160">
                        <div className="h5 col-md-6 text-right">Psoriasis</div>
                        
                   
                    </Link >
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Psoriatic Arthritis</div>
                        
                   
                   
                        </div>


                    </div>
                   
                       
                    </div>


                    </div>
                   
                </div>
                {/* END OF LIST P */}
                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"Q"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                      <h5>There Are No Diseases Beginning With This Letter</h5>
                   



        </div>
                       
                    </div>  </div> </div>  
                </div>

                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"R"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right"> Reproduction</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                  
                        <div className="h5  col-md-6 text-left">Rheumatoid Arthritis</div>
                        
                   
                   
                        </div>
                    
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Restless Leg Syndrome (RLS)</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">
Rosacea</div>
                        
                   
                   
                        </div>
                       
                       
                    </div>  </div> </div>  
                </div>
                {/* END OF LIST R */}

                    
                <div className="">
                <div className="container">
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"S"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">  Schizophrenia</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Sensitive topics</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Sexual Conditions</div>
                        <div className="col-md-6 rounded" id="ayurveda">
  </div>
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Sexual Health</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Shingles</div>
                        
                   
                   
                        </div>
                        
                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Sinusitis</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Sjogren's Syndrome</div>
                        
                   
     
             
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/disease/155">
                        <div className="h5  col-md-6 text-left">Skin Problems</div>
                        
                   
                </Link >
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Sleep Apnea</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Sleep Disorders</div>
                        
                   
                   
                        </div>
                        
  <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Smoking Cessation</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Spinal Cord Disorders</div>
                        
                   
                   
                        </div>                                                                                
                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">STDs</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Strep Throat</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5 col-md-6 text-right">Stroke</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                        
                        <div className="h5  col-md-6 text-left">Swine Flu </div>
                        
                   
                   
                        </div>


                    </div>
                   
                       
                    </div>


                    </div>
                   
                </div>

                {/* END OF LIST S */}

                
                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"T"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Thrush
                        </div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/disease/87">
                        <div className="h5  col-md-6 text-left">Thyroid Disorders</div>
                        
                   </Link>
                   
                        </div>
                    
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Triglycerides</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Type 1 Diabetes</div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Type 2 Diabetes</div>
                        
                   
                   
                        </div>
                       
                    </div>  </div> </div>  
                </div>

                {/* END OF LIST T */}

                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"U"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Ulcerative Colitis
                        </div>
                        
                   
                   
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Urinary Disorders</div>
                        
                   
                   
                        </div>
                    
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Urinary Tract Infection</div>
                        
                   
                   
                        </div>

                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Uterine Fibroids</div>
                        
                   
                   
                        </div>
                   
                       
                    </div>  </div> </div>  
                </div>
                {/* END OF LIST U  */}
                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"V"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Varicose Veins
                        </div>
                        
                   
                    
                        </div>
                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Vascular Disease</div>
                        
                   
                    
                        </div>
                    
                        <div className="col-md-6 float-left">
                       
                        <div className="h5 col-md-6 text-right">Vertigo</div>
                        
                   
                    
                        </div>

                        <div className="col-md-6 float-left">
                       
                        <div className="h5  col-md-6 text-left">Vision Correction</div>
                        
                   
                    
                        </div>
                  
                       
                    </div>  </div> </div>  
                </div>
                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"X"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                      <h5>There Are No Diseases Beginning With This Letter</h5>
                   



        </div>
                       
                    </div>  </div> </div>  
                </div>
                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"Y"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                      <h5>There Are No Diseases Beginning With This Letter</h5>
                   



        </div>
                       
                    </div>  </div> </div>  
                </div>
                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"Z"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                      <h5>There Are No Diseases Beginning With This Letter</h5>
                   



        </div>
                       
                    </div>  </div> </div>  
                </div>
<Footer/>

    </div>
   );


}
export default Disease