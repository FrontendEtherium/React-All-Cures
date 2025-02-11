import React from "react";
import "./ValuesSection.css";

import Ayurveda from "../../../assets/icon/Ayurveda.png";
import GlobalTeleConsult from "../../../assets/icon/GlobalTeleconsultation.png";
import OnlineConsultation from "../../../assets/icon/OnlineConsultation.png";
import TrustednVerified from "../../../assets/icon/TrustednVerified.png";

const valuesData = [
  {
    title: "Global Teleconsultation",
    description: "We continuously improve to deliver the highest quality care.",
    icon: GlobalTeleConsult,
  },
  {
    title: "Ayurveda, Unani & More",
    description:
      "We provide a warm, supportive environment to ease the stress of medical care.",
    icon: Ayurveda,
  },
  {
    title: "Trusted & Verified Practitioners",
    description: "We treat everyone with respect, dignity, and kindness.",
    icon: TrustednVerified,
  },

  {
    title: "Easy Online Doctor Consultation",
    description:
      "We practice transparent, honest medicine that always puts patients first.",
    icon: OnlineConsultation,
  },
];

const ValuesSection = () => {
  return (
    <section className="values-section">
      <div className="values-section__container">
        <h2 className="values-section__title">Our Values</h2>
        <div className="values-section__grid">
          {valuesData.map((value, index) => (
            <div key={index} className="values-section__card">
              {/* ✅ Fixed: Using img instead of FontAwesomeIcon */}
              <img
                src={value.icon}
                alt={value.title}
                className="values-section__image"
              />
              <div className="values-section__card-title">{value.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
