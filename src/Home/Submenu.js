import React from "react";
import { Link } from "react-router-dom";

function Submenu({ category }) {
  const categoryList = category.map((category) => {
    return (
      <Link key={category._id} to={"/categories/" + category._id}>
        <li>
          <img
            src={category.logo}
            alt={category.logo}
            width="65px"
            height="65px"
          />
          <p >{category.name.toUpperCase()}</p>
        </li>
      </Link>
    );
  });

  return (
    <>
      <div>
        <ul
          style={{
            display: "flex",
            justifyContent: "space-around",
            textAlign: "center",
            margin: "5px 0px",
          }}
        >
          {categoryList}
        </ul>
      </div>
      
    </>
  );
}

export default Submenu;
