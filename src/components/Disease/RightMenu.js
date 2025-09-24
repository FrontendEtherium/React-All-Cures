import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { slice } from "lodash";
import { withRouter } from "react-router";
import AllPost from "../BlogPage/Allpost";
import "./style.css";
import { Container } from "react-bootstrap";
import { backendHost } from "../../api-config";
import Heart from "../../assets/img/heart.png";
import InlineVideoPlayer from "./DiseasePageComponent/Video";
import BannerRajma from "../../../src/assets/img/allcuresrajma.jpeg";
const Side = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(5);
  const initialPosts = slice(items, 0, index);

  const fetchDiseasePosts = () => {
    fetch(
      `${backendHost}/isearch/limit/${props.dcName}?offset=0&limit=${index}&&order=published_date:desc`
    )
      .then((res) => res.json())
      .then((json) => {
        setIsLoaded(true);
        setItems(json);
        setIndex(index + 5);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchDiseasePosts();
  }, []);

  if (!isLoaded) {
    return (
      <Container className="my-5 loading">
        <div className="h3 pb-3">
          <u className="text-decoration-none">{props.dcName} Cures</u>
        </div>
        <div className="loader">
          <img src={Heart} alt="All Cures Logo" id="heart" />
        </div>
      </Container>
    );
  }

  return (
    <Nav className="col-xs-2 d-md-block sidebar">
      <img
        src={BannerRajma}
        alt="affilate-banner"
        style={{ width: "300px", height: "250px" }}
      />
      {/* Responsive Video Player */}
      <div style={{ padding: "10px", textAlign: "center", width: "100%" }}>
        {props.videoURL && <InlineVideoPlayer videoURL={props.videoURL} />}
      </div>

      <div className="sidebar-sticky"></div>
      <Nav.Item className="set-width" id="dc-right-menu">
        <div className="h4 pb-3">
          <u className="text-decoration-none">{props.dcName} Cures</u>
        </div>

        {items &&
          items.map((i) =>
            i.article_id !== props.id ? (
              <AllPost
                key={i.article_id}
                docID={i.docID}
                id={i.article_id}
                title={i.title}
                f_title={i.friendly_name}
                type={i.type}
                content={decodeURIComponent(i.content)}
                published_date={i.published_date}
                over_allrating={i.over_allrating}
                imgLocation={i.content_location}
                history={props.history}
              />
            ) : null
          )}

        <div className="d-grid mt-3 mb-5 text-center">
          <button onClick={fetchDiseasePosts} className="btn btn-danger">
            Load More
          </button>
        </div>
      </Nav.Item>
    </Nav>
  );
};

const SidebarRight = withRouter(Side);
export default SidebarRight;
