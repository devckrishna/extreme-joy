import React from 'react'

export default function CartItem(props) {
    return (
        <div className="CartItem">
            <img src={props.product.photos} /> 
            <h4>{props.product.subtitle}</h4>
            <div className="CartItem__quantity">qty: 1</div>
            <h5>Rs. {props.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h5>
        </div>
    )
}
