import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf, // Ayurveda
  faFlask, // Homeopathy
  faMortarPestle, // Persian
  faSpa, // Naturopathy
  faCapsules, // Unani
  faYinYang, // Chinese
} from "@fortawesome/free-solid-svg-icons";

const fields = [
  { title: "Ayurveda", icon: faLeaf },
  { title: "Homeopathy", icon: faFlask },
  { title: "Persian", icon: faMortarPestle },
  { title: "Naturopathy", icon: faSpa },
  { title: "Unani", icon: faCapsules },
  { title: "Chinese", icon: faYinYang },
];

function DoctorByMedicineType() {
  const handleCardClick = (title) => {
    // Encode the title to ensure special characters don't break the URL
    window.location.href = `/doctor-connect?title=${encodeURIComponent(title)}`;
  };

  return (
    <section className="medicine-doc-container">
      <div className="medicine-doc-container-upper">
        <div>
          <h2 className="medicine-doc-container-upper-text-heading">
            Consult Top Doctors Online for Any Health Concern
          </h2>
          <p className="medicine-doc-container-upper-text-subHeading">
            Video and Chat consultations with verified doctors in all specialties
          </p>
        </div>
        <button className="medicine-doc-button" aria-label="View all doctors">
          <span className="medicine-doc-button-heading">View all Types</span>
        </button>
      </div>

      <div className="medicine-types-container">
        {fields.map((field, index) => (
          <div
            key={index}
            className="medicine-type-card"
            onClick={() => handleCardClick(field.title)}
          >
            <FontAwesomeIcon
              icon={field.icon}
              className="medicine-icon"
              size="3x"
            />
            <h3 className="medicine-type-title">{field.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DoctorByMedicineType;
