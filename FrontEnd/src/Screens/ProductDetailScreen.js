import React, { useEffect, useContext } from "react";
import { ProductContext } from "../context/context";
// {props.match.params.slug}

export default function ProductDetailScreen(props) {
  const context = useContext(ProductContext);
  let { products, loading ,addToCart,modalOpen} = context;
  const product = products.find((el) => el._id === props.match.params.slug);

  return (
    <React.Fragment>
      {loading === true ? (
        <div className="DetLoading" ><img src="Loading.gif" /></div>
      ) : (
        <div className="ProductDetail">
          <div className="ProductDetail__image">
            <img src={product.photos} />
          </div>

          <div className="ProductDetail__content">
            <h1 className="ProductDetail__content--heading">{product.title}</h1>
            <h2 className="ProductDetail__content--subheading">
              {product.subtitle}
            </h2>
            Size:
            <div className="ProductDetail__content--size">{product.size}</div>
            <div className="ProductDetail__content--length">
              {product.length}
            </div>
            <div className="ProductDetail__content--occasion">
              Occasion: {product.occasion}
            </div>
            <div className="ProductDetail__content--gender">
              Gender: {product.gender}
            </div>
            <div className="ProductDetail__content--price">
              Rs.{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            </div>
            <p className="ProductDetail__content--description">
              {product.description}
            </p>
            <button className="ProductDetail__content--button" onClick={()=>addToCart(product)}>Add To Cart</button>
          </div>
          {
            modalOpen===true?<div className="ModalOpen">
              <div className="ModalOpen__container">
                <h4>Item Added To The Cart</h4>
              </div>
            </div>:<div></div>
          }
        </div>
      )}
    </React.Fragment>
  );
}
