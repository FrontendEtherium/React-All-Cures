import React from "react";
import "./ValuesSection.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsHelping, // Compassion
  faStar, // Excellence
  faBalanceScale, // Integrity
  faHandHoldingHeart, // Respect
  faUsers, // Teamwork
} from "@fortawesome/free-solid-svg-icons";

const valuesData = [
  {
    title: "Compassion",
    description:
      "We understand that seeking medical care can be a stressful and emotional experience, and we strive to create a welcoming and supportive environment that puts our patients at ease.",
    icon: faHandsHelping,
  },
  {
    title: "Excellence",
    description:
      "We are committed to providing excellent medical care and services to our patients. We believe in continuously improving our skills, knowledge, and resources to ensure that we deliver the highest quality care possible.",
    icon: faStar,
  },
  {
    title: "Integrity",
    description:
      "We believe in practicing medicine with integrity and honesty. We are transparent in our communication and decision-making processes, always putting our patient’s interests first.",
    icon: faBalanceScale,
  },
  {
    title: "Respect",
    description:
      "We treat all individuals with respect and dignity, regardless of their background, beliefs, or circumstances. We believe that every person deserves to be treated with compassion and kindness.",
    icon: faHandHoldingHeart,
  },
  {
    title: "Teamwork",
    description:
      "We believe in working collaboratively with our team members and healthcare professionals to provide comprehensive and effective care to our patients.",
    icon: faUsers,
  },
];

const ValuesSection = () => {
  return (
    <section className="values-section">
      <h2 className="values-title">Our Values</h2>
      <div className="values-container">
        {valuesData.map((value, index) => (
          <div key={index} className="value-card">
            <FontAwesomeIcon icon={value.icon} />
            <h3 className="value-title">{value.title}</h3>
            <p className="value-description">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValuesSection;
