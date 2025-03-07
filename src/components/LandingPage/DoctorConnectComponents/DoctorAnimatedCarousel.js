// import React, { useState, useEffect } from "react";
// import Carousel from "react-bootstrap/Carousel";
// import { imgKitImagePath } from "../../../image-path";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./DoctorCarousel.css"; 
// import { backendHost } from "../../../api-config";

// const DoctorCarousel = () => {
//   const [doctors, setDoctors] = useState([]);
//   const fallbackImg = "https://via.placeholder.com/200x200?text=No+Image";

//   useEffect(() => {
//     fetch(`${backendHost}/video/get/doctors/list?offset=1`)
//       .then((res) => res.json())
//       .then((data) => setDoctors(data))
//       .catch((err) => console.error("Error fetching doctor data:", err));
//   }, []);

//   return (
//     <div className="doctor-carousel-wrapper">
//       <h2 className="carousel-title">Meet Our Panel of Doctors</h2>
//       <Carousel fade interval={3000} pause={false}>
//         {doctors.map((doctor) => (
//           <Carousel.Item key={doctor.docID}>
//             <div className="doctor-card">
//               <div className="doctor-image-wrapper">
//                 <img
//                   src={
//                     doctor.imgLoc
//                       ? `${imgKitImagePath}/${doctor.imgLoc}`
//                       : fallbackImg
//                   }
//                   alt={`${doctor.prefix} ${doctor.firstName} ${doctor.lastName || ""}`}
//                   className="doctor-image"
//                 />
//               </div>
//               <div className="doctor-info">
//                 <h3 className="doctor-name">
//                   {doctor.prefix} {doctor.firstName} {doctor.lastName || ""}
//                 </h3>
//                 {doctor.specialtyName && (
//                   <p className="doctor-specialty">{doctor.specialtyName}</p>
//                 )}
//                 {doctor.about && (
//                   <p className="doctor-about">
//                     {doctor.about.length > 100
//                       ? doctor.about.slice(0, 100) + "..."
//                       : doctor.about}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </Carousel.Item>
//         ))}
//       </Carousel>
//     </div>
//   );
// };

// export default DoctorCarousel;
