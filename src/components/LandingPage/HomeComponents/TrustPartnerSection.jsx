import React from "react";
import "./TrustPartnerSection.css";

// Import your SVGs or PNGs—these will be code-split and lazy-loaded by default
import { ReactComponent as PersonalizedIcon } from "../../../assets/icon/personalized-care.svg";
import { ReactComponent as ExpertsIcon } from "../../../assets/icon/trusted-experts.svg";
import { ReactComponent as TeleconIcon } from "../../../assets/icon/global-teleconsultation.svg";
import { ReactComponent as AccessIcon } from "../../../assets/icon/accessible-24x7.svg";

const FEATURES = [
  {
    Icon: PersonalizedIcon,
    title: "Personalized Care",
    description:
      "Get expert healthcare advice tailored to your needs with seamless Online Doctor Consultation.",
  },
  {
    Icon: ExpertsIcon,
    title: "Trusted Experts",
    description:
      "Rely on certified professionals specializing in Ayurveda, Unani & natural healing.",
  },
  {
    Icon: TeleconIcon,
    title: "Global Teleconsultation",
    description:
      "See what our satisfied customers have to say about their journey to better health with All-Cures.",
  },
  {
    Icon: AccessIcon,
    title: "Accessible 24×7",
    description:
      "Access holistic wellness without financial stress—our services are designed to be affordable and convenient.",
  },
];

const TrustPartnerSection = () => (
  <section
    className="trust-partner container"
    aria-labelledby="trust-partner-title"
  >
    <h2 id="trust-partner-title" className="trust-partner__heading">
      Why all-cures.com Is Your Trusted Partner in Holistic Health
    </h2>
    <div
      style={{
        backgroundColor: "#f8f9fd",
        padding: "15px",
        borderRadius: "12px",
      }}
    >
      <div className="trust-partner__grid">
        {FEATURES.map(({ Icon, title, description }) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Icon
              className="trust-partner__icon"
              aria-hidden="true"
              focusable="false"
            />
            <article key={title} className="trust-partner__card">
              <h3 className="trust-partner__card-title">{title}</h3>
              <p className="trust-partner__card-desc">{description}</p>
            </article>
          </div>
        ))}
      </div>
      <p className="trust-partner__footer">
        For years, we’ve been a trusted holistic health platform, blending
        alternative medicine with expert care for your well-being.
      </p>
    </div>
  </section>
);

export default React.memo(TrustPartnerSection);
