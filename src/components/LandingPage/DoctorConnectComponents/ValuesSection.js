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
      "We provide a warm, supportive environment to ease the stress of medical care.",
    icon: faHandsHelping,
  },
  {
    title: "Excellence",
    description: "We continuously improve to deliver the highest quality care.",
    icon: faStar,
  },
  {
    title: "Integrity",
    description:
      "We practice transparent, honest medicine that always puts patients first.",
    icon: faBalanceScale,
  },
  {
    title: "Respect",
    description: "We treat everyone with respect, dignity, and kindness.",
    icon: faHandHoldingHeart,
  },
  {
    title: "Teamwork",
    description: "We collaborate to deliver comprehensive and effective care.",
    icon: faUsers,
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
              <FontAwesomeIcon
                icon={value.icon}
                className="values-section__icon"
              />
              <h3 className="values-section__card-title">{value.title}</h3>
              <p className="values-section__card-description">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
