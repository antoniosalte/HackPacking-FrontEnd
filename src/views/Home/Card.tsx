import "./scss/index.scss";
import * as React from "react";
const Card = props => {
  return (
    <div className="card-step">
      <div className="card-step__image">
        <img src={props.card.image} />
      </div>
      <p>{props.card.title}</p>
      <span>{props.card.description}</span>
    </div>
  );
};
export default Card;
