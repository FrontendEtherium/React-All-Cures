import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";
import instance from "../../../axiosInstance";
import { Container } from "react-bootstrap";
import Heart from "../../../assets/img/heart.png"; // Replace with the correct path to your loader image

function Disease() {
  const [diseaseList, setDiseaseList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // Track loading state

  useEffect(() => {
    const getDisease = async () => {
      try {
        const res = await instance.get(`/data/all/categories`);
        setDiseaseList(res.data);
        setIsLoaded(true); // Data is loaded
      } catch (err) {
        console.error("Error fetching diseases:", err);
        // Stop the loader even if there’s an error
      }
    };
    getDisease();
  }, []);

  if (!isLoaded) {
    // Show loader until data is loaded
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
      <Header />
      <div className="container">
        <div className="card-title h3 mt-5 py-2 border-bottom" id="dis">
          All Diseases
        </div>
        <div className="grid-container mt-5">
          {diseaseList.map((item) => (
            <div className="grid-item" key={item.dc_id}>
              <Link to={`/searchcategory/disease/${item.dc_id}`}>
                {item.category}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Disease;
