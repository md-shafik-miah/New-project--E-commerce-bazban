import React from "react";

function AllSubCategories({ allSubCategoriesFeatures }) {
  return (
    <>
      <div
        key={allSubCategoriesFeatures._id}
        style={{
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          transition: "0.3s",
          width: "24%",
          height: "250px",
          backgroundColor: "white",
          textAlign: "center",
          margin: "6px",
          borderRadius: "8px",
        }}
      >
        <img
          src={allSubCategoriesFeatures.coverImage}
          alt={allSubCategoriesFeatures.name}
          width="100%"
          height="150px"
        />

        <div style={{ height: "100px", padding: "15px", fontSize: "larger" }}>
          <h4>{allSubCategoriesFeatures.name}</h4>
          <button
            style={{
              width: "100%",
              padding: "5px",
              marginTop: "5px",
              borderRadius: "5px",
              border: "1px solid grey",
              outline: "none",
              backgroundColor: "white",
              fontSize: "20px",
            }}
          >
            + Interest
          </button>
        </div>
      </div>
      
    </>
  );
}

export default AllSubCategories;
