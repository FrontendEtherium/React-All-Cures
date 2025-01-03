import React from "react";
import { Link } from "react-router-dom";
import CenterWell from "../CenterWell";

const ArticleDetails = React.memo(
  ({
    title,
    ratingValue,
    parsedContent,
    carouselItems,
    currentIndex,
    handleLinkClick,
    authorsName,
    authoredBy,
    regDocPatId,
    publishedDate,
  }) => {

    console.log("Article details re renderd");
    
    return (
      <div>
        <div className="article-title-container">
          <h1 className="font-weight-bold text-decoration-underline">
            {title}
          </h1>

          {ratingValue && (
            <div className="average-rating mb-4 ml-3 mt-2" id="avg-rating">
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
                pageTitle={title}
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

          {carouselItems?.length > 0 && (
            <div className="d-flex justify-content-center mt-2 mb-2">
              <div>
                <Link
                  to={`/cure/${carouselItems[currentIndex]?.article_id}-${carouselItems[currentIndex]?.title}`}
                  className="fs-08"
                  onClick={() =>
                    handleLinkClick(
                      `/cure/${carouselItems[currentIndex]?.article_id}-${carouselItems[currentIndex]?.title}`
                    )
                  }
                >
                  <div className="mb-2">
                    <h4>Click here to read the next article.</h4>
                  </div>
                </Link>

                {carouselItems[currentIndex]?.content_location && (
                  <div className="d-flex justify-content-center">
                    <div>
                      <img
                        src={
                          carouselItems[
                            currentIndex
                          ]?.content_location.includes("cures_articleimages")
                            ? `https://ik.imagekit.io/hg4fpytvry/product-images/tr:w-300,h-250,f-webp/${
                                carouselItems[currentIndex]?.content_location
                                  .replace("json", "png")
                                  .split("/webapps/")[1]
                              }`
                            : "https://ik.imagekit.io/hg4fpytvry/product-images/tr:w-300,f-webp/cures_articleimages//299/default.png"
                        }
                        alt="Article Image"
                      />
                      <p className="mt-2 fs-5">
                        {carouselItems[currentIndex]?.title}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <hr />

        {authorsName && (
          <div className="h5 text-left ml-3 mb-2">
            <span>Author: </span>
            {authoredBy?.includes(7) ? (
              authorsName
            ) : (
              <Link to={`/doctor/${regDocPatId}`}>{authorsName}</Link>
            )}
          </div>
        )}

        <div className="h6 text-muted text-left ml-3 mb-4">
          <span>Published on: </span>
          {publishedDate || "Unknown"}
        </div>
      </div>
    );
  }
);

export default ArticleDetails;
