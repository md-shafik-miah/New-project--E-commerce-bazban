import React from "react";
import { Link } from "react-router-dom";

function Recommended({ recommed }) {
  return (
    <>
      <h1>New Arrivals</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {recommed.map((recommed) => {
          return (
            <Link
              to={`/product/${recommed._id}`} 
              key={recommed._id}
              style={{
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                transition: "0.3s",
                width: "24%",
                height: "400px",
                backgroundColor: "white",
                textAlign: "center",
                margin: "6px",
                borderRadius: "8px",
                padding: "20px",
              }}>
              <img
                src={recommed.coverImage}
                alt={recommed.coverImage}
                width='100%'
                height='300px'
                padding='20px'
              />
              <div style={{ height: "100px" }}>
                <h4>{recommed.title}</h4>
                <p>
                  <b> BD: {recommed.price}</b>
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Recommended;
