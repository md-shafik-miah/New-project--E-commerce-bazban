import React from "react";
import styles from "../Products/product.module.css";

function ImageModals({products, ActiveImage,setActiveImage,setImageModal}) {
  return (
    <>
      <div id='myModal' className={styles.modal}>
        <div className={styles.ImageModalContent}>
          <div className={styles.modalHeader}>
            <h1 style={{ fontSize: "20px" }}>{products.title}</h1>
            <span onClick={() => setImageModal(false)} className={styles.close}>
              &times;
            </span>
          </div>
          <img
            src={products.images[ActiveImage]}
            alt='product 1'
            width='100%'
            height='500px'
            onClick={() => setImageModal(true)}
            style={{ padding: "0px 120px" }}
          />
          <div style={{ marginBottom: "10px", textAlign: "center" }}>
            {products.images.map((image, index) => {
              return (
                <img
                  onMouseOver={() => setActiveImage(index)}
                  src={image}
                  alt=' product 1'
                  width='50px'
                  height='50px'
                  style={
                    index === ActiveImage
                      ? {
                          border: "1px solid black",
                          width: "70px",
                          height: "70px",
                          margin: "0px 10px",
                          borderRadius: "5px",
                        }
                      : {
                          border: "1px solid rgb(221, 221, 221)",
                          width: "70px",
                          height: "70px",
                          margin: "0px 10px",
                          borderRadius: "5px",
                        }
                  }
                />
              );
            })}
          </div>
        </div>
      </div>

    </>
  );
}

export default ImageModals;
