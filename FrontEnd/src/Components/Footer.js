import React from 'react'

export default function Footer() {
    return (
        <footer className="mainFooter">
            <div className="mainFooter__item--1">
                <img src="logo.png" />
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore.</p>
            </div>
            <div className="mainFooter__item--2">
                <h1>Quick Links</h1>
                <h3>Discounts</h3>
                <h3>Get Couponds</h3>
                <h3>About</h3>
                <h3>Contact us</h3>
            </div>
            <div className="mainFooter__item--3">
            <h1>New Products</h1>
                <h3>Men</h3>
                <h3>Women</h3>
                <h3>Kids</h3>
                <h3>Accesories</h3>
            </div>
            <div className="mainFooter__item--4">
            <h1>Support</h1>
                <h3>FAQ</h3>
                <h3>Terms & Conditions</h3>
                <h3>Privacy Policy</h3>
                <h3>Report Payment issue</h3>
            </div>
            <h3 className="footerCopyright">Copyright ©2020 All rights reserved</h3>
        </footer>
    )
}
