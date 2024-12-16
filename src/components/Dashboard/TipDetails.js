import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { backendHost } from "../../api-config";
import { userId } from "../UserId";
import axios from "axios";
function GetSubscription({ subscription_id }) {
  const [subscription, setSubscription] = useState([]);
  const [deleteAlert, setAlert] = useState(false);

  const fetchTip = (e) => {
    axios
      .get(`${backendHost}/tip/get`)
      .then((res) => {
        setSubscription(res.data);
      })
      .catch((res) => {
        return;
      });
  };
  useEffect(() => {
    document.title = "All Cures | Dashboard | Tip";
    fetchTip();
  }, []);

  const SubscriptionDelete = (id) => {
    axios
      .delete(`${backendHost}/tip/delete/${id}`)
      .then((res) => {
        fetchTip();
      })
      .catch((err) => {
        console.log("errrrrrrorrrrrrrrrrrrrrrrrr", err);
        return;
      });
  };

  return (
    <>
      <div className="container mb-4">
        <div className="row">
          {subscription
            ? subscription.map((i) => {
                return (
                  <div className="card col-md-5 mt-5 mx-3 border p-3 h6">
                    <div className="card-title h4">
                      <span className="font-weight-bold">Tip Title: </span>
                      {i.tip_title}
                    </div>
                    {/* <div className="card-body"> */}
                    <div className="pb-2">
                      <span className="font-weight-bold">Tip Date:</span>{" "}
                      {i.tip_date.split("T")[0]}
                    </div>

                    <div>
                      <span className="font-weight-bold">Tip Status:</span>
                      {i.tip_status === 1 ? (
                        <span> Active</span>
                      ) : (
                        <span> Not Active</span>
                      )}
                    </div>

                    {/* <div><span className="font-weight-bold">Tip Status:</span> 
                                {
                                    i.tip_status=== 1?
                                        <span> Active</span>
                                        : <span> Not Active</span>
                                }
                                </div> */}
                    {/* </div> */}
                    {!(userId == 172) && (
                      <div className="row mx-1 my-2">
                        <Link
                          to={`/dashboard?edittip=${i.tip_id}`}
                          className="col-md-3 btn mr-2"
                          style={{ backgroundColor: "#9289be", color: "#fff" }}
                        >
                          Edit
                        </Link>

                        {i.tip_status === 1 ? (
                          <button
                            onClick={() => {
                              const confirmBox =
                                window.confirm("Are you sure?");
                              if (confirmBox === true) {
                                SubscriptionDelete(i.tip_id);
                              }
                            }}
                            className="col-md-4 btn btn-dark"
                          >
                            Delete
                          </button>
                        ) : (
                          <button className="col-md-4 btn btn-dark" disabled>
                            Deleted
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}

export default GetSubscription;
