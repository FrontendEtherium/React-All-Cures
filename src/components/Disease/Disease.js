import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { Breadcrumb, Col, Container, Dropdown, Row } from "react-bootstrap";

import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CenterWell from "./CenterWell";
import Sidebar from "./leftMenu";
import SidebarRight from "./RightMenu";
import { backendHost } from "../../api-config";
import PhoneInput from "react-phone-number-input";
import Heart from "../../assets/img/heart.png";
import "react-phone-number-input/style.css";
import ArticleRating from "../ArticleRating";
import Favourite from "../favourite";
import Favourites from "../UpdateFavourite";
import ArticleComment from "../ArticleComment";
import HelmetMetaData from "../HelmetMetaData";
import headers from "../../api-fetch";
import { userAccess } from "../UserAccess";
import { userId } from "../UserId";
import { imagePath, imgKitImagePath } from "../../image-path";
import CarouselPreview from "./CarouselPreview";
import SubscriberBtn from "./DiseasePageComponent/SubscriberBtn";
import CarouselArticle from "./DiseasePageComponent/CarouselArticle";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
const Disease = () => {
  const [state, setState] = useState({
    images: [],
    currentIndexx: 0,
    items: [],
    carouselItems: [],
    comment: [],
    isLoaded: false,
    ratingValue: "",
    rating: [],
    favourite: [],
    regions: [],
    regionalPost: [],
    showMore: false,
    value: "",
    type: [],
    diseaseList: [],
    cures: [],
    showAlert: false,
    alertMsg: "",
    showCuresCards: false,
    modalState: false,
    adId: "",
    likeClicked: null,
    dislikeClicked: null,
    showSource: false,
    alertShown: false,
    isModalOpen: false,
    currentIndex: 0,
  });

  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const containerRef = useRef(null);
  const [parsedContent, setParsedContent] = useState();
  const [diseaseConditionId, setDiseaseConditionId] = useState();
  useEffect(() => {
    fetchBlog();
    setTimeout(() => {
      if (adSpacRef.current) {
        adSpacRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  }, [id]);

  const handleClick = (ad) => {
    // console.log('Image clicked!',ad);
    axios.put(`${backendHost}/sponsored/ads/clicks/${ad}`);
  };
  const fetchBlog = async () => {
    const articleId = id.split("-")[0];

    if (/^[0-9]+$/.test(articleId)) {
      // If the URL contains article_id
      try {
        const [json] = await Promise.all([
          fetch(`${backendHost}/article/${articleId}`, {
            method: "GET",
            headers,
          }).then((res) => res.json()),
        ]);
        const content = json.content;
        const parsedContent = JSON.parse(decodeURIComponent(content));
        setParsedContent(parsedContent);
        setState((prev) => ({
          ...prev,
          isLoaded: true,
          items: json,
        }));
        setDiseaseConditionId(json.disease_condition_id);

        // Perform subsequent calls and updates
        await Promise.all([
          diseasePosts(json.dc_name),
          getDisease(),
          regionalPosts(json.disease_condition_id),

          comments(articleId),
          getRating(articleId),
          getRate(articleId),
          userAccess ? getFavourite(articleId) : null,
          fetchParentDiseaseId(articleId),
          loadFloater(),
        ]);

        // Update the document title
        document.title = json.title;
      } catch (error) {
        console.error("Error fetching article by ID:", error);
      }
    } else {
      // If the URL contains the title
      try {
        const [json] = await Promise.all([
          fetch(`${backendHost}/article/title/${articleId}`, {
            method: "GET",
            headers,
          }).then((res) => res.json()),
        ]);

        setState((prev) => ({
          ...prev,
          isLoaded: true,
          items: json,
        }));

        // Perform subsequent calls and updates
        await Promise.all([
          regionalPosts(json.disease_condition_id),
          diseasePosts(json.dc_name),
          getDisease(),

          comments(articleId),
          getRating(articleId),
          getRate(articleId),
          userAccess ? getFavourite(articleId) : null,
          fetchParentDiseaseId(articleId),
          loadFloater(),
        ]);

        // Update the document title
        document.title = json.title;
      } catch (error) {
        console.error("Error fetching article by title:", error);
      }
    }
  };
  function regionalPosts(id) {
    fetch(`${backendHost}/isearch/treatmentregions/${id}`) // /isearch/treatmentregions/${this.state.diseaseCondition}
      .then((res) => res.json())
      .then((json) => {
        // console.log('regional posts')
        setState((prev) => ({
          ...prev,
          regionalPost: json,
        }));
      })
      .catch((err) => null);
  }
  const diseasePosts = async (dcName) => {
    try {
      const response = await fetch(`${backendHost}/isearch/${dcName}`);
      const data = await response.json();
      setState((prev) => ({ ...prev, carouselItems: data }));
    } catch (error) {
      console.error("Error fetching disease posts:", error);
    }
  };
  const showComments = ({ item }) => {
    return (
      <div className="col-12">
        <div className="card my-4">
          <div className="card-body d-flex">
            <div className="comment-img">
              <i className="fas fa-user-md fa-4x pl-3 mb-2"></i>
              <h6 className="card-subtitle my-2 text-muted">
                {item.first_name} {item.last_name}
              </h6>
            </div>
            <div>
              <h5 className="h5 mt-3">{item.comments}</h5>
              <div className="card-info"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const getDisease = async () => {
    try {
      const response = await fetch(
        `${backendHost}/article/all/table/disease_condition`
      );
      const data = await response.json();
      setState((prev) => ({ ...prev, diseaseList: data }));
    } catch (error) {
      console.error("Error fetching diseases:", error);
    }
  };

  const comments = async (articleId) => {
    try {
      const response = await fetch(
        `${backendHost}/rating/target/${articleId}/targettype/2`
      );
      const data = await response.json();
      setState((prev) => ({
        ...prev,
        comment: data.filter(
          (item) => item.reviewed === 1 && item.comments !== "null"
        ),
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const getRating = async (articleId) => {
    try {
      const response = await fetch(
        `${backendHost}/rating/target/${articleId}/targettype/2/avg`
      );
      const data = await response.json();
      setState((prev) => ({ ...prev, ratingValue: data }));
    } catch (error) {
      console.error("Error fetching rating:", error);
    }
  };
  const fetchData = async (parent_dc_id) => {
    try {
      const response = await axios.get(
        `${backendHost}/sponsored/list/ads/url/2`,
        {
          params: { DC_Cond: parent_dc_id },
        }
      );

      if (response.data !== "All Ads are Served") {
        const id = response.data.split("/")[3];
        const ids = id.match(/\d+/);
        const adsId = ids[0];

        setState((prev) => ({ ...prev, adId: adsId }));
      }

      const newResponse = `https://all-cures.com:444${response.data}`;
      setState((prev) => ({ ...prev, ads: newResponse }));
    } catch (error) {
      setState((prev) => ({ ...prev, error: error.message }));
    }
  };
  const getRate = async (articleId) => {
    try {
      const response = await fetch(
        `${backendHost}/rating/target/${articleId}/targettype/2?userid=${
          userId || 0
        }`
      );
      const data = await response.json();
      setState((prev) => ({ ...prev, rating: data[0]?.ratingVal || [] }));
    } catch (error) {
      console.error("Error fetching rate:", error);
    }
  };

  const getFavourite = async (articleId) => {
    try {
      const response = await fetch(
        `${backendHost}/favourite/userid/${userId}/articleid/${articleId}/favourite`
      );
      const data = await response.json();
      setState((prev) => ({ ...prev, favourite: data[0]?.status || [] }));
    } catch (error) {
      console.error("Error fetching favourite status:", error);
    }
  };

  const fetchParentDiseaseId = async (articleId) => {
    try {
      const response = await fetch(
        `${backendHost}/sponsored/parent_disease_id/${articleId}`
      );
      const data = await response.json();
      if (data.parent_dc_id !== 0) {
        await fetchData(data.parent_dc_id);
      }
    } catch (error) {
      console.error("Error fetching parent disease ID:", error);
    }
  };

  const loadFloater = async () => {
    try {
      const response = await fetch(`${backendHost}/data/newsletter/get`);
      const data = await response.json();
      setState((prev) => ({ ...prev, images: data }));
    } catch (error) {
      console.error("Error loading floater:", error);
    }
  };

  const likeButton = async () => {
    setState((prev) => ({ ...prev, likeClicked: true, dislikeClicked: false }));
    const articleId = id.split("-")[0];

    try {
      await axios.post(`${backendHost}/article/like/${articleId}`);
    } catch (error) {
      console.error("Error liking article:", error);
    }
  };

  const dislikeButton = async () => {
    setState((prev) => ({ ...prev, likeClicked: false, dislikeClicked: true }));
    const articleId = id.split("-")[0];

    try {
      await axios.post(`${backendHost}/article/dislike/${articleId}`);
    } catch (error) {
      console.error("Error disliking article:", error);
    }
  };

  const handleSource = () => {
    setState((prev) => ({ ...prev, showSource: !prev.showSource }));
  };

  const toggleShowMoreComments = () => {
    setState((prev) => ({ ...prev, showMore: !prev.showMore }));
  };
  const adSpacRef = useRef();
  const handleLinkClick = (url) => {
    history.push(url);
    window.scrollTo(0, 0);
  };

  if (!state.isLoaded) {
    return (
      <>
        <Header />
        <Container className="my-5 loading">
          <div className="loader">
            <img src={Heart} alt="All Cures Logo" id="heart" />
          </div>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <div>
      <Header history={history} />
      <HelmetMetaData
        title={state.items.title}
        keywords={state.items.keywords}
        image={
          `${imagePath}` +
          state.items.content_location
            .replace("json", "png")
            .split("/webapps/")[1]
        }
      />
      <div className="ad-spac" ref={adSpacRef}>
        <button
          className="btn"
          data-toggle="modal"
          data-target=".bd-example-modal-lg"
        >
          <img
            src={`${imgKitImagePath}/tr:w-900,f-webp/assets/img/97x90_Plain.jpg`}
            alt="advertisment"
          />
        </button>
      </div>
      <Row>
        <div className="left-menu pb-3">
          <div id="sidebar-wrapper">
            {state.regionalPost.length !== 0 && (
              <Sidebar
                diseaseId={state.items.disease_condition_id}
                id={id}
                regionalPosts={
                  state.regionPostsLoaded ? state.regionalPost : null
                }
                name={state.items.dc_name}
              />
            )}
          </div>

          {/* 
                    <button className="btn pl-4 mt-2 " id="left-menu-ad" data-toggle="modal"data-target=".bd-example-modal-lg">
                                 <img className="pl-4" src={PersianAd} alt="ad"/>
                                 </button> */}

          {
            state.ads ? (
              state.ads !== "https://all-cures.com:444All Ads are Served" ? (
                <div className="d-flex justify-content-center">
                  <img
                    className="mt-5"
                    id="left-menu-ad"
                    src={state.ads}
                    alt="adjjjj"
                    onClick={() => handleClick(state.adId)}
                  />
                </div>
              ) : (
                <button
                  className="btn pl-4 mt-2 "
                  id="left-menu-ad"
                  data-toggle="modal"
                  data-target=".bd-example-modal-lg"
                >
                  {/* <img className="pl-4" src={PersianAd} alt="adhhh"
                                 /> */}
                  <img
                    className="pl-4"
                    src={`${imgKitImagePath}/tr:w-180,f-webp/assets/img/Persian.jpg`}
                    alt="adhhh"
                  />
                </button>
              )
            ) : null

            // : <button className="btn pl-4 mt-2 " id="left-menu-ad" data-toggle="modal"data-target=".bd-example-modal-lg">
            //  <img className="pl-4" src={PersianAd} alt="adhhh"/>
            //  </button>
          }
        </div>
        <Col md={7} id="page-content-wrapper" className="col-xs-12 pb-5">
          <div id="center-well" ref={containerRef}>
            <Breadcrumb>
              <Breadcrumb.Item className="mt-1 pb-2" href="/" id="s1">
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item className="mt-1" id="s1">
                <Link to={`/searchcures/${state.items.dc_name}`}>
                  {state.items.dc_name}
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item className="mt-1" id="s1">
                {state.items.type.includes(1) &&
                !this.props.match.params.cureType ? (
                  <Link to="#">Overview</Link>
                ) : (
                  <Link to="#">Cures</Link>
                )}
              </Breadcrumb.Item>

              {state.items.parent_Medicine_type != null && (
                <Breadcrumb.Item className="mt-1 pb-2" id="s1">
                  {state.items.parent_Medicine_type}
                </Breadcrumb.Item>
              )}

              <Breadcrumb.Item className="mt-1 pb-2" id="s1">
                {state.items.medicine_type_name}
              </Breadcrumb.Item>
            </Breadcrumb>
            <CarouselArticle
              diseaseConditionId={diseaseConditionId}
              carouselItems={state.carouselItems}
              id={id}
            />
            <Row className="align-items-center justify-content-between mx-2">
              <Col md={6}>
                {userAccess ? (
                  <>
                    {state.rating.length === 0 ? (
                      <span className="text-muted medium">
                        You have not rated yet. Please rate.
                      </span>
                    ) : (
                      <p
                        className="small font-weight-bold"
                        style={{ color: "#00415e" }}
                      >
                        Your previous rating: {state.rating}{" "}
                        <span className="icon-star-1"></span>
                        <br />
                        Rate again below:
                      </p>
                    )}
                  </>
                ) : (
                  <div className="text-muted small">Rate here:</div>
                )}
                <div id="docRate" className="">
                  <ArticleRating article_id={id.split("-")[0]} />
                </div>
              </Col>

              <Col
                md={6}
                className="d-flex align-items-center justify-content-end"
              >
                <span className="small text-muted">
                  Was this article helpful?
                </span>
                <button
                  className="btn btn-link p-1 mx-2"
                  onClick={likeButton}
                  aria-label="Like"
                >
                  {state.likeClicked ? (
                    <ThumbUpIcon
                      style={{ fontSize: "20px", color: "#00415e" }}
                    />
                  ) : (
                    <ThumbUpOutlinedIcon
                      style={{ fontSize: "20px", color: "#6c757d" }}
                    />
                  )}
                </button>
                <button
                  className="btn btn-link p-1"
                  onClick={dislikeButton}
                  aria-label="Dislike"
                >
                  {state.dislikeClicked ? (
                    <ThumbDownIcon
                      style={{ fontSize: "20px", color: "#00415e" }}
                    />
                  ) : (
                    <ThumbDownOutlinedIcon
                      style={{ fontSize: "20px", color: "#6c757d" }}
                    />
                  )}
                </button>
              </Col>
            </Row>
            <>
              <div className="article-title-container">
                <h1 className="font-weight-bold text-decoration-underline">
                  {state.items.title}
                </h1>

                {state.ratingValue && (
                  <div
                    className="average-rating mb-4 ml-3 mt-2"
                    id="avg-rating"
                  >
                    {[...Array(5)].map((_, index) => (
                      <span key={index} className="fa fa-star opacity-7"></span>
                    ))}
                  </div>
                )}
              </div>

              <div id="article-main-content">
                {parsedContent.blocks?.map((block, idx) => {
                  const fileUrl = block.data.file?.url || null;
                  const imageUrl = fileUrl
                    ? `https://ik.imagekit.io/hg4fpytvry/product-images/tr:w-1000,f-webp/cures_articleimages/${fileUrl.replace(
                        /^.*[\\/]/,
                        ""
                      )}`
                    : null;

                  return (
                    <CenterWell
                      key={idx}
                      pageTitle={state.items.title}
                      level={block.data.level}
                      content={block.data.content}
                      type={block.type}
                      text={block.data.text}
                      title={block.data.title}
                      message={block.data.message}
                      source={block.data.source}
                      embed={block.data.embed}
                      caption={block.data.caption}
                      alignment={block.data.alignment}
                      imageUrl={imageUrl}
                      link={block.data.link}
                      url={block.data.url}
                      item={block.data.items}
                    />
                  );
                })}

                {state.carouselItems?.length > 0 && (
                  <div className="d-flex justify-content-center mt-2 mb-2">
                    <div>
                      <Link
                        to={`/cure/${
                          state.carouselItems[state.currentIndex]?.article_id
                        }-${state.carouselItems[state.currentIndex]?.title}`}
                        className="fs-08"
                        onClick={() =>
                          handleLinkClick(
                            `/cure/${
                              state.carouselItems[state.currentIndex]
                                ?.article_id
                            }-${state.carouselItems[state.currentIndex]?.title}`
                          )
                        }
                      >
                        <div className="mb-2">
                          <h4>Click here to read the next article.</h4>
                        </div>
                      </Link>

                      {state.carouselItems[state.currentIndex]
                        ?.content_location && (
                        <div className="d-flex justify-content-center">
                          <div>
                            <img
                              src={
                                state.carouselItems[
                                  state.currentIndex
                                ]?.content_location.includes(
                                  "cures_articleimages"
                                )
                                  ? `https://ik.imagekit.io/hg4fpytvry/product-images/tr:w-300,h-250,f-webp/${
                                      state.carouselItems[
                                        state.currentIndex
                                      ]?.content_location
                                        .replace("json", "png")
                                        .split("/webapps/")[1]
                                    }`
                                  : "https://ik.imagekit.io/hg4fpytvry/product-images/tr:w-300,f-webp/cures_articleimages//299/default.png"
                              }
                              alt="Article Image"
                            />
                            <p className="mt-2 fs-5">
                              {state.carouselItems[state.currentIndex]?.title}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <hr />

              {state.items.authors_name && (
                <div className="h5 text-left ml-3 mb-2">
                  <span>Author: </span>
                  {state.items.authored_by?.includes(7) ? (
                    state.items.authors_name
                  ) : (
                    <Link to={`/doctor/${state.items.reg_doc_pat_id}`}>
                      {state.items.authors_name}
                    </Link>
                  )}
                </div>
              )}

              <div className="h6 text-muted text-left ml-3 mb-4">
                <span>Published on: </span>
                {state.items.published_date || "Unknown"}
              </div>
            </>
            {userAccess ? (
              <div id="favbutton">
                {state.favourite.length === 0 ? (
                  <Favourite article_id={id.split("-")[0]} />
                ) : (
                  <Favourites article_id={id.split("-")[0]} />
                )}
              </div>
            ) : null}
          </div>
          <div className="ml-3 mt-3">
            <button className="btn  btn-primary" onClick={handleSource}>
              Source
            </button>
          </div>

          <div>
            <h5 className=" ml-3 mt-3 ">
              {" "}
              {state.showSource && state.items.window_title}{" "}
            </h5>
          </div>

          {/* Review Button (Rating + Comment) */}
          {userAccess ? (
            <div className="ml-3 mb-3">
              <ArticleComment
                refreshComments={comments}
                article_id={id.split("-")[0]}
              />
            </div>
          ) : null}
          <div id="comments-column">
            {/* SHOW ALL COMMENTS */}
            <div className="main-hero">
              {!state.showMore
                ? state.comment
                    .slice(0, 1)
                    .map((item, i) => showComments(item, i))
                : state.comment.map((item, i) => showComments(item, i))}
            </div>
            {state.comment
              ? state.comment.length > 1 && (
                  <button
                    id="show-hide-comments"
                    className="white-button-shadow btn w-75 mb-4 ml-3"
                    onClick={() => {
                      this.state.showMore
                        ? this.setState({
                            showMore: false,
                          })
                        : this.setState({
                            showMore: true,
                          });
                    }}
                  >
                    {!state.showMore ? "Show more" : "Hide"}
                  </button>
                )
              : null}
          </div>
        </Col>
        <Col id="right-sidebar-wrapper">
          <SidebarRight
            title={state.items.title}
            history={history}
            dcName={state.items.dc_name}
            id={state.items.article_id}
          />
        </Col>
      </Row>
      <SubscriberBtn />
      <Footer />
    </div>
  );
};

export default Disease;
