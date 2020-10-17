import React,{useState,useEffect,useContext} from 'react'
import {Link } from "react-router-dom";
import {ProductContext} from "../context/context";

export default function NavBar() {
    const context=useContext(ProductContext);
    const {loggedin,logoutHandler} =context;
    const [open,setOpen]=useState(false);
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            const isTop=window.scrollY<150;
            if(!isTop){
                setOpen(true);
            }else{
                setOpen(false);
            }
        })
    },[])

    return (
        <header className={open===false?"main-header":"main-header__sticky"}>
            <div className="nav__logo">
                <img src="logo.png"/>
            </div>
            <div className="nav__options">
                <Link to="/" style={{textDecoration:"none"}}><h2>Home</h2></Link>
                <Link to="/men" style={{textDecoration:"none"}} > <h2>Men</h2></Link>
                <Link to="/women" style={{textDecoration:"none"}} > <h2>Women</h2></Link>
                <Link to="/kids" style={{textDecoration:"none"}} > <h2>Kids</h2></Link>
            </div>
            <div className="nav__utils">
                <input className="nav__util--search"></input>
                <img src="heart.png" />
                <Link to="/cart" style={{textDecoration:"none"}} ><img src="bag.png" /> </Link>
                <Link to="/login" style={{textDecoration:"none"}} >
                    {
                        loggedin===true? <button className="LogOutIcon" onClick={logoutHandler}>Logout</button> :
                        <div className="LogIcon">
                            Login
                        </div>
                    }
                   
                </Link>
                
            </div>
        </header>
    )

}
