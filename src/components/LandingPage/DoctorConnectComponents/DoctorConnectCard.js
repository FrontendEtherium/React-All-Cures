import React, { useState, useMemo } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import DummyDoc from "../../../assets/healthcare/img/images/defaultDoc1.png";
import { userId } from "../../UserId";
import Test from "../test";
import { userAccess } from "../../UserAccess";
import axios from "axios";
import { backendHost } from "../../../api-config";
import "./DoctorConnectCard.css";
import { imgKitImagePath } from "../../../image-path";
import { Link } from "react-router-dom";
import RateTooltip from "../../../ui/Tooltip";

function DoctorConnectCard({ doc, onConsult }) {
  const imgLoc = doc.imgLoc ? `${imgKitImagePath}/${doc.imgLoc}` : DummyDoc;
  const [showModal, setShowModal] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);

  const {
    displayName,
    location,
    hospital,
    degreeLabel,
    feeLabel,
    ratingLabel,
    aboutSnippet,
    showEllipsis,
    availabilityText,
    availabilityClass,
  } = useMemo(() => {
    const nameParts = [doc.prefix || "Dr.", doc.firstName, doc.lastName]
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    const locationParts = [
      doc.cityName,
      doc.addressState || doc.stateName,
      doc.addressCountry,
    ].filter(Boolean);

    const hospitalName = doc.hospitalAffiliated || doc.hospitalName || "";

    const rawDegree =
      doc.degreeDescription || doc.degreeName || doc.otherSpecializations;

    const rawFee = doc.fee;

    const ratingValue =
      doc.ratingValueAverage ?? doc.overallRating ?? doc.ratingValue;
    const numericRating = Number(ratingValue);
    const formattedRating = Number.isNaN(numericRating)
      ? null
      : numericRating.toFixed(1);

    const aboutText = doc.about ? doc.about.trim() : "";
    const trimmedAbout = aboutText.slice(0, 180);
    const needsEllipsis = aboutText.length > 180;

    const isAvailable = doc.videoService === 1;

    return {
      displayName: nameParts,
      location: locationParts.join(", "),
      hospital: hospitalName,
      degreeLabel: rawDegree,
      feeLabel: rawFee,
      ratingLabel: formattedRating,
      aboutSnippet: trimmedAbout,
      showEllipsis: needsEllipsis,
      availabilityText: isAvailable ? "Available" : "Offline",
      availabilityClass: isAvailable ? "available" : "unavailable",
    };
  }, [doc]);

  const DoctorNotAvailable = async () => {
    setNotAvailable(true);
    try {
      await axios.post(
        `${backendHost}/video/post/leads?userID=${userId}&docID=${doc.docID}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const consult = () => {
    if (doc.videoService === 1) {
      onConsult(doc.docID);
    } else {
      DoctorNotAvailable();
    }
  };

  const handleProfileVisit = async () => {
    setNotAvailable(false);
    window.location.href = `/doctor/${doc.docID}`;
    try {
      await axios.post(
        `${backendHost}/video/post/leads?userID=${userId}&docID=${doc.docID}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="doctor-card doctor-card-modern">
        <Link
          to={`/doctor/${doc.docID}-${doc.firstName}-${doc.lastName}`}
          id="profile"
          className="doctor-card-main doctor-card-modern-main"
        >
          <div className="doctor-image-container doctor-card-avatar">
            <img src={imgLoc} alt={displayName} className="doctor-image" />
          </div>
          <div className="doctor-details doctor-card-details">
            <div className="doctor-card-header">
              <div>
                <div className="doctor-name">
                  {displayName}
                  {doc.verified ? (
                    <VerifiedIcon
                      color="success"
                      style={{ fontSize: "16px", marginLeft: "0.35rem" }}
                    />
                  ) : null}
                </div>
                <div className="doctor-specialty doctor-specialty-text">
                  {doc.medicineTypeName || doc.specialtyName}
                </div>
              </div>
              <div className={`doctor-availability-badge ${availabilityClass}`}>
                {availabilityText}
              </div>
            </div>

            {location && (
              <div className="doctor-location doctor-card-location">
                {location}
              </div>
            )}
            {hospital && (
              <div className="doctor-hospital doctor-card-hospital">
                {hospital}
              </div>
            )}

            <div className="doctor-card-tags">
              {degreeLabel && (
                <span className="doctor-pill">{degreeLabel}</span>
              )}
              {doc?.fee?.totalFee && (
                <span className="doctor-pill doctor-pill-fee">
                  ₹{doc?.fee?.totalFee}
                  <RateTooltip
                    title={
                      <>
                        <strong>Base Fee:</strong> ₹{doc?.fee?.baseFee} <br />
                        <strong>Platform Fee:</strong> ₹{doc?.fee?.etheriumPart}{" "}
                        <br />
                        <strong>GST:</strong> ₹{doc?.fee?.gst} <br />
                      </>
                    }
                  />
                </span>
              )}
              {ratingLabel && (
                <span className="doctor-pill doctor-pill-rating">
                  <StarRoundedIcon fontSize="small" />
                  {ratingLabel}
                </span>
              )}
            </div>

            {/* {aboutSnippet && (
              <p className="doctor-card-about">
                {aboutSnippet}
                {showEllipsis ? "..." : ""}
              </p>
            )} */}
          </div>
        </Link>
        <div className="book-button-container doctor-card-actions">
          <div className="book-button" onClick={consult}>
            <LocalPharmacyIcon className="book-button-icon" />
            Consult
          </div>
          <button
            type="button"
            className="doctor-secondary-button"
            onClick={handleProfileVisit}
          >
            View profile
          </button>
        </div>
      </div>
      <Test show={showModal} onHide={() => setShowModal(false)} />
      {notAvailable && (
        <div className="modal-backdrop-doc" role="dialog" aria-modal="true">
          <div className="modal-container-doc">
            <div className="modal-header-doc">
              <h5 className="modal-title-doc">Doctor Unavailable Right Now</h5>
              <button
                className="modal-close-button-doc"
                onClick={() => setNotAvailable(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="modal-body-doc">
              <p>
                <span className="text-highlight">Unavailable:</span> This doctor
                is currently not available for consultations. Our team is
                working to update the availability status.
              </p>
              <p>
                Meanwhile, you can explore the doctor's profile to read
                articles, view their qualifications, and learn more about their
                expertise.
              </p>
              <p>Thank you for your patience!</p>
            </div>
            <div className="modal-footer-doc">
              <button
                className="modal-footer-button-doc"
                onClick={() => setNotAvailable(false)}
              >
                Close
              </button>
              <button
                className="modal-footer-button-doc"
                onClick={handleProfileVisit}
              >
                Visit Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DoctorConnectCard;
