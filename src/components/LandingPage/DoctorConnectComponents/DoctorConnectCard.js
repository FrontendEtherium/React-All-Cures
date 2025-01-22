import React, { useState } from "react";
import { imgKitImagePath } from "../../../image-path";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VerifiedIcon from "@mui/icons-material/Verified";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import DummyDoc from "../../../assets/healthcare/img/images/defaultDoc1.png";
import { userId } from "../../UserId";
import AppointmentModal from "../../../features/BookAppointment";
import Test from "../test";
import { userAccess } from "../../UserAccess";
import axios from "axios";
import { backendHost } from "../../../api-config";
function DoctorConnectCard({ doc }) {
  const imgLoc = doc.imgLoc ? `${imgKitImagePath}/${doc.imgLoc}` : DummyDoc;
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);
  const DoctorNotAvailable = () => {
    setNotAvailable(true);
  };
  const consult = () => {
    if (doc.videoService === 1) {
      if (userAccess && userId) {
        setShowAppointmentModal(true);
      } else {
        setShowModal(true);
      }
    } else {
      DoctorNotAvailable();
    }
  };
  const handleProfileVisit = () => {
    setNotAvailable(false);
    window.location.href = `/doctor/${doc.docID}`;
    try {
    } catch (error) {}
  };
  return (
    <>
      <div
        key={doc.id}
        className="tw-flex tw-items-center tw-p-6 tw-rounded-lg tw-shadow-md tw-mb-6 tw-transition-transform tw-duration-300 hover:tw-transform hover:tw-scale-105 tw-bg-white tw-border tw-border-gray-200"
      >
        {/* Doctor Image */}
        <div className="tw-relative tw-flex-shrink-0">
          <img
            src={imgLoc}
            alt={`Dr.${doc.firstName} ${doc.lastName}`}
            className="tw-h-32 tw-w-32 tw-border-primary tw-rounded-full tw-border-4 tw-shadow-lg"
          />
  
            <div className="tw-absolute tw-bottom-2 tw-right-0 tw-rounded-full tw-p-1 tw-border-primary tw-bg-white">
              <VerifiedIcon color="success" fontSize="small" />
            </div>
       
        </div>

        {/* Doctor Details */}
        <div className="tw-flex-grow tw-ml-5">
          <div className="tw-text-primary md:tw-text-xl tw-font-semibold tw-text-lg">
            <div>
              Dr. {doc.firstName} {doc.lastName}
            </div>
            <div className="tw-font-light tw-text-xs">
              {doc.medicineTypeName}
            </div>
          </div>
          <div className="tw-text-slate-700 tw-font-light tw-text-xs tw-mt-2">
            <div className=" tw-font-bold">
              {doc.cityName},{doc.addressCountry}
            </div>
            <div>{doc.hospitalAffiliated}</div>
          </div>
          <div className="tw-my-4 tw-border-b tw-border-dotted tw-border-gray-300 tw-w-2/3"></div>
          <div className="tw-flex tw-items-center">
            <ThumbUpIcon className="tw-text-green-600 tw-mr-2 tw-text-base" />
            <span className="tw-text-xs tw-font-semibold tw-text-gray-700">
              {`${(doc.ratingValueAverage / 5) * 100}%`}
            </span>
            <button className="tw-font-bold tw-flex tw-flex-row tw-border tw-rounded-md tw-ml-3 tw-p-1 tw-border-green-600 hover:tw-bg-green-100 ">
              <WhatsAppIcon className="tw-text-base" color="success" />
              <span className=" tw-text-xs tw-ml-1"> WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Book Button */}
        <div className="tw-flex tw-flex-col tw-justify-end tw-items-end tw-h-full tw-self-end">
          {doc.videoService === 1 ? (
            <div className=" tw-text-center tw-self-center tw-font-bold tw-text-sm tw-text-green-600 tw-mb-1">
              Available
            </div>
          ) : null}

          <button
            className="tw-bg-primary tw-text-white  tw-py-1 md:tw-px-10 tw-rounded tw-shadow-md hover:tw-bg-primary-dark tw-px-2 tw-flex tw-flex-row"
            onClick={() => consult()}
          >
            <LocalPharmacyIcon className="tw-text-base " />
            <span className=" tw-text-white tw-text-sm tw-ml-1">
              Consult Now
            </span>
          </button>
        </div>
      </div>
      <Test show={showModal} onHide={() => setShowModal(false)} />
      {notAvailable && (
        <div
          className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-z-50 tw-bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="notAvailableModalTitle"
        >
          <div className="tw-bg-white tw-rounded-lg tw-overflow-hidden tw-shadow-lg tw-max-w-md tw-w-full">
            {/* Modal Header */}
            <div className="tw-flex tw-justify-between tw-items-center tw-p-4 tw-border-b tw-border-gray-200">
              <h5
                id="notAvailableModalTitle"
                className="tw-text-lg tw-font-semibold tw-text-gray-800"
              >
                Doctor Unavailable
              </h5>
              <button
                type="button"
                className="tw-text-gray-400 hover:tw-text-gray-600 tw-font-bold tw-text-xl"
                onClick={() => setNotAvailable(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="tw-p-6 tw-text-sm tw-text-gray-700 tw-leading-relaxed">
              <p className="tw-mb-4">
                <span className="tw-text-red-600 tw-font-semibold">
                  Unavailable:{" "}
                </span>
                This doctor is currently not available for consultations. Our
                team is working to update the availability status.
              </p>
              <p className="tw-mb-4">
                Meanwhile, you can explore the doctor’s profile to read
                articles, view their qualifications, and learn more about their
                expertise.
              </p>
              <p>Thank you for your patience!</p>
            </div>

            {/* Modal Footer */}
            <div className="tw-flex tw-justify-end tw-p-4 tw-border-t tw-border-gray-200">
              <button
                type="button"
                className="tw-bg-gray-100 tw-text-gray-700 tw-px-4 tw-py-2 tw-rounded-md tw-mr-2 hover:tw-bg-gray-200"
                onClick={() => setNotAvailable(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="tw-bg-primary tw-text-white tw-px-4 tw-py-2 tw-rounded-md hover:tw-bg-primary-dark"
                onClick={() => {
                  handleProfileVisit();

                  // Add navigation logic to the doctor's profile
                }}
              >
                Visit Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {showAppointmentModal && (
        <AppointmentModal
          show={showAppointmentModal}
          onHide={() => setShowAppointmentModal(false)}
          docId={doc.docID}
          userId={userId}
        />
      )}
    </>
  );
}

export default DoctorConnectCard;
