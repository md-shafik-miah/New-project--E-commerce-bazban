import React from "react";
import styles from "./Categories.module.css";

function MenCat({ catProducts }) {
  return (
    <>
      <div className={styles.cardMenCat} key={catProducts._id}>
        <img
          src={catProducts.coverImage}
          alt={catProducts.name}
          width="100%"
          height="150px"
        />

        <div className={styles.MenCatBody}>
          <h4>{catProducts.name}</h4>
          <button className={styles.MenCatBtn}>+ Interest</button>
        </div>
      </div>
    </>
  );
}

export default MenCat;
