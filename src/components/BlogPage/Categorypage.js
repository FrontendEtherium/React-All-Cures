import React, { Component } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AllPost from "./Allpost.js";
import { backendHost } from "../../api-config";
import { Link } from "react-router-dom";
import Heart from "../../assets/img/heart.png";
import Subscribe from "../Subscribe";
import headers from "../../api-fetch.js";
export default class Categorypage extends Component {
  constructor(props) {
    super(props);
    const params = props.match.params;
    this.state = {
      limit: 15,
      offset: 0,
      dc: props.location.search.split("&")[1],
      noMoreArticles: false,
      param: params,
      items: [],
      isLoaded: false,
      LoadMore: false,
      regionPostsLoaded: false,
      country: new URLSearchParams(this.props.location.search).get("c"),
      diseaseCondition: new URLSearchParams(this.props.location.search).get(
        "dc"
      ),
      articleFilter: "recent",
    };
  }
  allPosts(loadMore) {
    // For all available blogs "/blogs"

    const headers = new Headers({
      Authorization: "Bearer local@7KpRq3XvF9",
    });
    if (loadMore === "loadMore") {
      this.setState({ LoadMore: false });
    }
    if (this.state.noMoreArticles) {
      return;
    } else {
      fetch(
        `${backendHost}/article/allkv?limit=${this.state.limit}&offset=${this.state.offset}`,
        {
          method: "GET",
          headers: headers,
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((json) => {
          if (json.length === 0) {
            this.setState({ noMoreArticles: true });
            return null;
          }
          var temp = [];
          if (this.state.articleFilter === "recent") {
            json.forEach((i) => {
              if (i.pubstatus_id === 3) {
                temp.push(i);
              }
            });
            this.setState({
              isLoaded: true,
              items: [...this.state.items, ...temp],
            });
          } else if (this.state.articleFilter === "earliest") {
            json.forEach((i) => {
              if (i.pubstatus_id === 3) {
                temp.push(i);
              }
            });
            this.setState({ isLoaded: true, items: temp.reverse() });
          }
          this.setState({ LoadMore: true });
        })
        .catch((err) => {
          return;
        });
    }
  }
  categoryPosts(disease_condition_id) {
    // For specific blogs like "/blogs/diabetes"

    fetch(`${backendHost}/isearch/diseases/${disease_condition_id}`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      })
      .catch((err) => {
        return;
      });
    // }
  }
  componentDidMount() {
    // if(this.props.match.params.type === undefined){
    //   this.allPosts()
    // }
    if (this.props.match.params.disease_condition_id !== undefined) {
      this.categoryPosts(this.props.match.params.disease_condition_id);
    } else if (this.props.location.search) {
      this.regionalPosts();
    } else {
      this.allPosts();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.match.params.disease_condition_id !==
      this.props.match.params.disease_condition_id
    ) {
      if (this.props.match.params.disease_condition_id) {
        this.categoryPosts(this.props.match.params.disease_condition_id);
      } else {
        this.allPosts();
      }
    }
  }
  regionalPosts() {
    fetch(
      `${backendHost}/isearch/treatmentregions/${this.state.dc.split("=")[1]}`
    ) // /isearch/treatmentregions/${this.state.diseaseCondition}
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          regionPostsLoaded: true,
          items: json.reverse(),
        });
      })
      .catch((err) => {
        return;
      });
  }
  render() {
    var { isLoaded, items, regionPostsLoaded, LoadMore } = this.state;

    return (
      <>
        <Header history={this.props.history} />

        <div className="container my-4">
          {/* {
                this.state.param.medicine_type?
                <h1 className="h2 text-center">Cures related to "{this.state.param.medicine_type}"</h1>
                :<h1 className="h2 text-center">All Cures</h1>
              } */}
          <div className="row" id="posts-container">
            {items.map((i) => (
              <AllPost
                docID={i.docID}
                id={i.article_id}
                title={i.title}
                f_title={i.friendly_name}
                w_title={i.window_title}
                country={i.country_id}
                content={decodeURIComponent(i.content)}
                type={i.type}
                imgLocation={i.content_location}
                published_date={i.published_date}
                key={i.article_id}
                over_allrating={i.over_allrating}
                authorName={i.authors_name}
                allPostsContent={() => this.allPosts()}
              />
            ))}
          </div>
        </div>
        <div>
          <button
            id="mobile-subscribe-fixed-btn"
            className="btn newsletter-icon rounded subscribe-btn newsletter_float"
            data-toggle="modal"
            data-target=".bd-example-modal-lg"
          >
            Subscribe
          </button>
          <Link to="/feedback">
            <button
              id="mobile-feedback-fixed-btn"
              className="btn newsletter-icon rounded subscribe-btn newsletter_float"
            >
              Feedback
            </button>
          </Link>
          <Subscribe />
        </div>
        <Footer />
      </>
    );
  }
}
