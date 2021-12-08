import React from "react";
import styles from "../Products/product.module.css";

function FeedbackModal({ setModal, setText }) {
  return (
    <>
      <div id='myModal' className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h1>User</h1>
            <span onClick={() => setModal(false)} className={styles.close}>
              &times;
            </span>
          </div>

          <form>
            <input
              className={styles.feedbackInput}
              type='text'
              onChange={(e) => setText(e.target.value)}
              placeholder='Write a feedback'
            />
            <br />
            <button className={styles.submitFeedback} type='submit'>
              Feedback
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default FeedbackModal;
