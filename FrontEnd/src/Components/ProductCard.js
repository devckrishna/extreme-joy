import React from "react";

const productCard = (props) => {
  return (
    <div className="ProductCard">
      <img
        src={props.product.photos}
        alt="photot"
        className="ProductCard__img"
      />
      <h3 className="ProductCard__text">{props.product.title}</h3>
      <h4 className="ProductCard__subtext">
        {props.product.subtitle.substring(0, 28) + " ..."}
      </h4>
      <h4 className="ProductCard__price">
        Rs.{" "}
        {props.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </h4>
    </div>
  );
};

export default productCard;