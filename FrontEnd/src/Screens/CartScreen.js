import React, { useContext } from "react";
import { ProductContext } from "../context/context";
import CartItem from "../utils/CartItem";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import axios from "axios";

const handleToken=async (token, addresses)=>{
  const response = await axios.post(
    "/checkout",
    { token  }
  );
  const { status } = response.data;
  console.log("Response:", response.data);
  if (status === "success") {
    toast("Success! Check email for details", { type: "success" });
  } else {
    toast("Something went wrong", { type: "error" });
  }
}

export default function CartScreen() {
  const context = useContext(ProductContext);
  const { cart } = context;

  let CartTotal=0;
  for(let i=0;i<cart.length;i++){
      CartTotal+=cart[i].price;
  }
  return (
    <div className="Cart">
      <h1>Your Cart</h1>
      {cart.length==0?<div className="EmptyCart">
          <h1>Cart Is Empty, Start adding</h1>
          <img src="shopping-bag.svg" />
      </div>:
      cart.map((el) => {
        return <CartItem product={el} />;
      })}
      <div className="Cart__checkout">
        <h4>MRP: Rs.{CartTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
        <h4>Discount: Rs. 0 </h4>
        <h4>Total: Rs.{(CartTotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>

        {/* <button className="Order-btn">Order Now</button> */}
        <StripeCheckout
        stripeKey="pk_test_4TbuO6qAW2XPuce1Q6ywrGP200NrDZ2233"
        token={handleToken}
        amount={ CartTotal/79 *100}
        name="items"
        billingAddress
        shippingAddress
      />
      </div>
    </div>
  );
}
