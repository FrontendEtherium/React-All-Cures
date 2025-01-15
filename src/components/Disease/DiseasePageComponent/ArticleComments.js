import React, { useState, useEffect } from "react";
import { userAccess } from "../../UserAccess";
import { backendHost } from "../../../api-config";
import ArticleComment from "../../ArticleComment";
function ArticleComments({ id }) {
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const articleId = id.split("-")[0];

  useEffect(() => {
    // Fetch comments when the component mounts
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${backendHost}/rating/target/${articleId}/targettype/2`
        );
        const data = await response.json();
        const filteredComments = data.filter(
          (item) => item.reviewed === 1 && item.comments !== "null"
        );
        setComments(filteredComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [articleId]);

  const renderComment = (item) => (
    <div className="col-12" key={item.id}>
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

  return (
    <div>
      {userAccess ? (
        <div className="ml-3 mb-3">
          <ArticleComment article_id={articleId} />
        </div>
      ) : null}
      <div id="comments-column">
        {/* Show comments */}
        <div className="main-hero">
          {showMore
            ? comments.map((item) => renderComment(item))
            : comments.slice(0, 1).map((item) => renderComment(item))}
        </div>
        {/* Toggle Show More / Show Less */}
        {comments.length > 1 && (
          <button
            id="show-hide-comments"
            className="white-button-shadow btn w-75 mb-4 ml-3"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Hide" : "Show more"}
          </button>
        )}
      </div>
    </div>
  );
}

export default React.memo(ArticleComments);
