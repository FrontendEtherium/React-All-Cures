import React from "react";
import "./ValuesSection.css";

// Icons for each value (replace with actual icon URLs or use an icon library)
// import CompassionIcon from "../../assets/icons/compassion.png";
// import ExcellenceIcon from "../../assets/icons/excellence.png";
// import IntegrityIcon from "../../assets/icons/integrity.png";
// import RespectIcon from "../../assets/icons/respect.png";
// import TeamworkIcon from "../../assets/icons/teamwork.png";


import CompassionIcon from "../../../assets/icon/facebook.png";
import ExcellenceIcon from "../../../assets/icon/facebook.png";
import IntegrityIcon from "../../../assets/icon/facebook.png";
import RespectIcon from "../../../assets/icon/facebook.png";
import TeamworkIcon from "../../../assets/icon/facebook.png";
const valuesData = [
  {
    title: "Compassion",
    description:
      "We understand that seeking medical care can be a stressful and emotional experience, and we strive to create a welcoming and supportive environment that puts our patients at ease.",
    icon: CompassionIcon,
  },
  {
    title: "Excellence",
    description:
      "We are committed to providing excellent medical care and services to our patients. We believe in continuously improving our skills, knowledge, and resources to ensure that we deliver the highest quality care possible.",
    icon: ExcellenceIcon,
  },
  {
    title: "Integrity",
    description:
      "We believe in practicing medicine with integrity and honesty. We are transparent in our communication and decision-making processes, always putting our patient’s interests first.",
    icon: IntegrityIcon,
  },
  {
    title: "Respect",
    description:
      "We treat all individuals with respect and dignity, regardless of their background, beliefs, or circumstances. We believe that every person deserves to be treated with compassion and kindness.",
    icon: RespectIcon,
  },
  {
    title: "Teamwork",
    description:
      "We believe in working collaboratively with our team members and healthcare professionals to provide comprehensive and effective care to our patients.",
    icon: TeamworkIcon,
  },
];

const ValuesSection = () => {
  return (
    <section className="values-section">
      <h2 className="values-title">Our Values</h2>
      <div className="values-container">
        {valuesData.map((value, index) => (
          <div key={index} className="value-card">
            <img src={value.icon} alt={value.title} className="value-icon" />
            <h3 className="value-title">{value.title}</h3>
            <p className="value-description">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValuesSection;
