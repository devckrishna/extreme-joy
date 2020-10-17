import React, { useState, useEffect, useContext } from "react";
import items from "../data";
import ProductCard from "../Components/ProductCard";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/context";

export default function LatestProducts() {
//   const [state, setState] = useState([]);

//   useEffect(() => {
//     const tempArr = [];
//     for (let i = 0; i < 8; i++) {
//       tempArr.push(items[i]);
//     }
//     setState(tempArr);
//     // console.log(tempArr[0].price);
//   }, []);

  const context = useContext(ProductContext);
  const { products, loading } = context;

  const latestproducts = [];
  for (let i = 0; i < 8; i++) {
    latestproducts.push(products[i]);
  }

  return (
    <React.Fragment>
      {loading === true ? (
        <div className="LatLoading"><img src="Loading.gif" /> </div>
      ) : (
        <div className="latestProducts">
          {latestproducts.map((prod) => {
            return (
              <Link
                to={`/${prod._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <ProductCard product={prod} />
              </Link>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
}
