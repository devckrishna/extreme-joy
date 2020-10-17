import React, { useState, useEffect, useContext } from "react";
import ProductCard from "../Components/ProductCard";
import { ProductContext } from "../context/context";
import { Link } from "react-router-dom";

export default function Kids() {
  const context = useContext(ProductContext);
  let {
    filterProducts,
    handleChange,
    tshirt,
    trousers,
    jeans,
    maxPrice,
    minPrice,
    price,
    loading
  } = context;
  filterProducts = filterProducts.filter((el) => el.gender === "Kids");

  return (
    <div className="Men">
      <div className="Filter">
        <h2>Filters</h2>
        <div className="Filter__options">
          <h3 className="Filter__title">Categories</h3>
          <div className="Filter__options--jeans">
            <h4>Jeans</h4>
            <input
              type="checkbox"
              name="jeans"
              checked={jeans}
              onChange={handleChange}
            />
          </div>
          <div className="Filter__options--tshirt">
            <h4>T-shirts</h4>
            <input
              type="checkbox"
              name="tshirt"
              checked={tshirt}
              onChange={handleChange}
            />
          </div>
          <div className="Filter__options--trousers">
            <h4>Trousers</h4>
            <input
              type="checkbox"
              name="trousers"
              checked={trousers}
              onChange={handleChange}
            />
          </div>

          <h3 className="Filter__title">Price</h3>
          <div className="Filter__options--price">
            <h4>Price: Rs.{price}</h4>
            <input
              type="range"
              name="price"
              min={minPrice}
              max={maxPrice}
              value={price}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      {loading === true ? (
        <div className="CatLoading"><img src="Loading.gif" /></div>
      ) : (
        <div className="ProductsList">
          {filterProducts.map((item) => {
            return (
              <Link
                to={`/${item._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <ProductCard product={item} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
