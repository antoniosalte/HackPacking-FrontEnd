import * as React from "react";
import "./styles.scss";

const Item = props => {
  const { image, text, description, position } = props.item;
  return (
    <div
      className={
        position == "left"
          ? "item-blog-container blog-left"
          : "item-blog-container blog-right"
      }
    >
      {position === "left" ? (
        <div className="item-blog-container__cont-image">
          <img src={image} alt="image" />
        </div>
      ) : null}
      <div className="item-blog-container__cont-text">
        <p>{text}</p>
        <span>{description}</span>
      </div>
      {position === "right" ? (
        <div className="item-blog-container__cont-image">
          <img src={image} alt="image" />
        </div>
      ) : null}
    </div>
  );
};
export default Item;
