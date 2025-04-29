import React from "react";
import OwlCarousel from "react-owl-carousel";

import { Link } from "react-router-dom";
import { backendHost } from "../../api-config";

const options = {
  margin: 30,
  responsiveClass: true,
  nav: true,
  loop: false,
  dots: true,
  smartSpeed: 1000,
  singleItem: true,
  items: 1,
  responsive: {
    0: {
      items: 1,
    },
    400: {
      items: 1,
    },
    600: {
      items: 2,
    },
    700: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  },
};

const TrendingArticles = () => {
  return (
    <>
      <div className="trending-articles">
        <OwlCarousel
          {...options}
          nav="true"
          id="trending"
          height={550}
          items={1}
          singleItem={true}
          margin={10}
        >
          <div className=" my-3">
            <Link to="/searchmedicine/medicinetype/1">
              <div className="card d-flex justify-content-between">
                <div className="h5 text-dark col-md-6 text-center">
                  Ayurveda
                </div>
                <div className="col-md-6 rounded" id="ayurveda"></div>
              </div>
            </Link>
          </div>
          <div className=" my-3">
            <Link to="/searchmedicine/medicinetype/4">
              <div className="card d-flex justify-content-between">
                <div className="h5 text-dark col-md-6 text-center">
                  Chinese
                  <br /> Medicine
                </div>
                <div className="col-md-6 rounded" id="chinese"></div>
              </div>
            </Link>
          </div>

          <div className=" my-3">
            <Link to="/searchmedicine/medicinetype/12">
              <div className="card d-flex justify-content-between">
                <div className="h5 text-dark col-md-6 text-center">Arabic</div>
                <div className="col-md-6 rounded" id="arabic"></div>
              </div>
            </Link>
          </div>

          <div className=" my-3">
            <Link to="/searchmedicine/medicinetype/3">
              <div className="card d-flex justify-content-between">
                <div className="h5 text-dark col-md-6 text-center">Persian</div>
                <div className="col-md-6 rounded" id="naturopathy"></div>
              </div>
            </Link>
          </div>

          <div className=" my-3">
            <Link to="/searchmedicine/medicinetype/2">
              <div className="card d-flex justify-content-between">
                <div className="h5 text-dark col-md-6 text-center">Unani</div>
                <div className="col-md-6 rounded" id="unani"></div>
              </div>
            </Link>
          </div>

          <div className=" my-3">
            <Link to="/searchmedicine/medicinetype/8">
              <div className="card d-flex justify-content-between rounded">
                <div className="h5 text-dark col-md-6 text-center">
                  Homeopathy
                </div>
                <div className="col-md-6 rounded" id="homepathies"></div>
              </div>
            </Link>
          </div>

          <div className=" my-3">
            <Link to="/searchmedicine/medicinetype/6">
              <div className="card d-flex justify-content-between">
                <div className="h5 text-dark col-md-6 text-center">
                  Japanese
                </div>
                <div className="col-md-6 rounded" id="homeopathy"></div>
              </div>
            </Link>
          </div>

          <div className=" my-3">
            <Link to="/searchmedicine/medicinetype/5">
              <div className="card d-flex justify-content-between rounded">
                <div className="h5 text-dark col-md-6 text-center">
                  Scandinavian
                </div>
                <div className="col-md-6 rounded" id="yoga"></div>
              </div>
            </Link>
          </div>
        </OwlCarousel>
      </div>
    </>
  );
};

export default TrendingArticles;
