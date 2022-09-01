import React from "react";
import { Card } from "react-bootstrap";
import CommentCard from "./CommentCard";

const Contents = ({ comments, setComments, fetch }) => {
  return (
    <Card.Body style={{ maxHeight: "350px", overflow: "auto" }}>
      {comments.map((comment) => (
        <CommentCard
          comment={comment}
          key={comment._id}
          setComments={setComments}
          fetch={fetch}
        />
      ))}
    </Card.Body>
  );
};

export default Contents;
