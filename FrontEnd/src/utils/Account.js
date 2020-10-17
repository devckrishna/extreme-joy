import React,{useContext} from 'react'
import {ProductContext} from "../context/context";

export default function Account() {
    const context=useContext(ProductContext);
    const {logoutHandler}=context;

    return (
        <div>
            <button onClick={logoutHandler} >Loggout</button>
        </div>
    )
}
