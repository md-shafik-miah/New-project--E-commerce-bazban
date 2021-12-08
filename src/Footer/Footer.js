import React from "react";
import { Link } from "react-router-dom";
import Styles from "../Footer/FooterStyle.module.css";

function Footer() {
  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.column}>
          <Link style={{ color: " black", textDecoration: "none" }} to='/'>
            <h1 style={{ fontSize: "50px" }}>Bazban</h1>
          </Link>
          <h4>Comfort Shopping</h4>
          <br />
          <br />
          <h4>
            Our mission is to give freedom and exitemen in shopping.We are
            promised, we are dedicated and we belive in truth.
          </h4>
        </div>

        <div className={Styles.column}>
          <Link className={Styles.link} to='/'>
            Home
          </Link>
          <Link className={Styles.link} to='/interests'>
            Interests
          </Link>
          <Link className={Styles.link} to='/orders'>
            Orders
          </Link>
          <Link className={Styles.link} to='/categories'>
            Categories
          </Link>
        </div>

        <div className={Styles.column}>
          <a href="#" className={Styles.link}>About</a>
          <a href="#" className={Styles.link}>Privecy Policy</a>
          <a href="#" className={Styles.link}>Term amd Condition</a>
          <a href="#" className={Styles.link}>Contact</a>
        </div>

        <div className={Styles.column}>
          <h4 style={{ color: "black", fontSize: "large" }}>Contact</h4>
          <br />
          <p>
            <a href='mailto:bazbanhelps@gmail.com'>Send Email</a>
          </p>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#4D4A4A",
          display: "flex",
          justifyContent: "space-between",
          color: "white",
          height: "100px",
        }}>
        <div>
          <h3 style={{ fontSize: "25px" }}>
            bazban 2021 - All rights reserved
          </h3>
        </div>
      </div>
    </>
  );
}

export default Footer;
