import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

const Breadcrumbs = ({
  homeLink,
  dcName,
  type,
  parentMedicineType,
  medicineTypeName,
}) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item className="mt-1 pb-2" href={homeLink} id="s1">
        Home
      </Breadcrumb.Item>
      <Breadcrumb.Item className="mt-1" id="s1">
        <Link to={`/searchcures/${dcName}`}>{dcName}</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item className="mt-1" id="s1">
        {type.includes(1) ? (
          <Link to="#">Overview</Link>
        ) : (
          <Link to="#">Cures</Link>
        )}
      </Breadcrumb.Item>

      {parentMedicineType && (
        <Breadcrumb.Item className="mt-1 pb-2" id="s1">
          {parentMedicineType}
        </Breadcrumb.Item>
      )}

      <Breadcrumb.Item className="mt-1 pb-2" id="s1">
        {medicineTypeName}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
