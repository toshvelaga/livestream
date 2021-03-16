import React from "react";
import "./Card.css";

function Card() {
  return (
    <div className="card-styles">
      {console.log("re-render")}
      <p>Card Title</p>
    </div>
  );
}

export default React.memo(Card);
