import React, { useContext } from "react";
import SecItem from "../Components/SecItem";
import LatestProducts from "../utils/LatestProducts";
import { ProductContext } from "../context/context";

export default function HomeScreen() {
  const context = useContext(ProductContext);
  const { modalOpen } = context;

  return (
    <main>
      <div className="mainBanner">
       
        <img src="HomeMainCro.png" alt="phpy" />
        <div className="mainBanner__content">
          <h4>60% Discount</h4>
          <h1>Winter Collection</h1>
          <h4>Best clothes of 2020!</h4>
          <button className="mainBanner__content--button"> Shop Now</button>
        </div>
      </div>
      <h1 className="secBanner__heading">Show By Category</h1>
      <div className="secBanner">
        <SecItem category="Men" />
        <SecItem category="Women" />
        <SecItem category="Kids" />
      </div>
      <h1 className="lastestProducts__heading">Lastest Products</h1>
      <LatestProducts />
    </main>
  );
}
