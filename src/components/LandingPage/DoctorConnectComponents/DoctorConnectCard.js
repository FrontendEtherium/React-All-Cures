import React from "react";
import { imgKitImagePath } from "../../../image-path";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VerifiedIcon from "@mui/icons-material/Verified";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import DummyDoc from "../../../assets/healthcare/img/images/defaultDoc1.png";
function DoctorConnectCard({ doc }) {
  const imgLoc = doc.imgLoc ? `${imgKitImagePath}/${doc.imgLoc}` : DummyDoc;
  return (
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
          <div className="tw-font-light tw-text-xs">{doc.medicineTypeName}</div>
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
        <div className=" tw-text-center tw-self-center tw-font-bold tw-text-sm tw-text-green-600 tw-mb-1">
          Available
        </div>
        <button className="tw-bg-primary tw-text-white  tw-py-1 md:tw-px-10 tw-rounded tw-shadow-md hover:tw-bg-primary-dark tw-px-2 tw-flex tw-flex-row">
          <LocalPharmacyIcon className="tw-text-base " />
          <span className=" tw-text-white tw-text-sm tw-ml-1">Consult Now</span>
        </button>
      </div>
    </div>
  );
}

export default DoctorConnectCard;
