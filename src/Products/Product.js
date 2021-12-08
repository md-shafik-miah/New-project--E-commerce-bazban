import React, { useEffect, useState } from "react";
import styles from "../Products/product.module.css";
import { Link } from "react-router-dom";
import { FaHeart, FaClock } from "react-icons/fa";
import Footer from "./../Footer/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import ImageModals from "./ImageModal";
import FeedbackModal from "./FeedbackModal";

function Product(props) {
  const [complete, setComplete] = useState(false);
  const [products, setProducts] = useState({});
  const [superb, setSuperb] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [Modal, setModal] = useState(false);
  const [ImageModal, setImageModal] = useState(false);
  const [Text, setText] = useState("");
  const [ActiveImage, setActiveImage] = useState(0);
  const [ActiveSize, setActiveSize] = useState(0);

  const { productId } = useParams();
  console.log("dada0", productId);

  const fetchData = async () => {
    try {
      const product = await axios.post(
        "https://baz-back.herokuapp.com/graphql",
        {
          query: `
                    query{
                        product(productId:"${productId}"){
                            _id
                            title
                            images
                            price
                            offer
                            superb
                            description
                            descriptionPoints
                            stock
                            category
                            categoryName
                            subCategory
                            subCategoryName
                            sizes{
                                _id
                                name
                                quantity
                                height
                                width
                            }
                            reviews{
                                _id
                                text
                                date
                                user{
                                    _id
                                    user_name
                                    image
                                }
                            }
                            related{
                                _id
                                title
                                price
                                coverImage
                                offer
                            }
                        }
                    }`,
        }
      );
      console.log(product);
      console.log(products);

      setProducts(product.data.data.product);
      setSuperb(product.data.data.product.superb.length);
      setFeedback(product.data.data.product.reviews);

      setComplete(true);

      // this.setState({
      //   product: product.data.data.product,
      //   superb: product.data.data.product.superb.length,
      //   feedbacks: product.data.data.product.reviews,
      // });

      // if (this.state.product.sizes.length > 0) {
      //   const sizes = this.state.product.sizes.filter(size => {
      //     return size.quantity > 0;
      //   });
      //   this.setState({
      //     sizeName: sizes[0].name,
      //     sizeId: sizes[0]._id,
      //     availQuantity: sizes[0].quantity,
      //     complete: true,
      //   });
      // } else {
      //   this.setState({
      //     availQuantity: product.data.data.product.stock,
      //     complete: true,
      //   });
      // }

      // if (this.state.product.superb.includes(this.props.user.userId)) {
      //   this.setState({isSuperb: true});
      // } else {
      //   this.setState({isSuperb: false});
      // }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (complete) {
    return (
      <>
        <div style={{ padding: "30px 50px" }} key={products._id}>
          <div className={styles.container}>
            <div className={styles.column1}>
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
                        ? { border: "1px solid black" }
                        : { border: "1px solid rgb(221, 221, 221)" }
                    }
                  />
                );
              })}
            </div>

            <div className={styles.column2}>
              {ImageModal ? (
                <ImageModals
                  products={products}
                  ActiveImage={ActiveImage}
                  setActiveImage={setActiveImage}
                  setImageModal={setImageModal}
                />
              ) : null}

              <img
                src={products.images[ActiveImage]}
                alt='product 1'
                width='100%'
                height='100%'
                onClick={() => setImageModal(true)}
                style={{ cursor: "zoom-in" }}
              />
            </div>

            <div className={styles.column3}>
              <h4>
                <Link
                  key={products.category}
                  to={`/categories/${products.category}`}>
                  {products.categoryName}
                </Link>{" "}
                /
                <Link
                  key={products.subCategory}
                  to={`/categories/${products.Category}`}>
                  {products.subCategoryName}
                </Link>
              </h4>
              <h2>{products.title}</h2>
              <br />
              <h3 style={{ color: "#078368" }}>BDT: {products.price}</h3>
              <br />
              <p>Product Code : {products._id}</p>
              <br />

              <p>Select Size</p>
              {products.sizes.map((size, index) => {
                return (
                  <button
                    onClick={() => setActiveSize(index)}
                    className={index===ActiveSize? styles.SizeQntAct : styles.SizeQnt}>
                    {size.name}
                  </button>
                );
              })}

              {/* <p>Select Quantity</p>
              {products.sizes[ActiveSize].quantity > 1 ? (
                <div>
                  <button className={styles.SizeQnt}>1</button>
                  <button className={styles.SizeQnt}>
                    {products.sizes[ActiveSize].quantity}
                  </button>
                </div>
              ) : (
                <button className={styles.SizeQnt}>
                 1
                </button>
              )} */}
              <br />
              {localStorage.TOKEN ? (
                <button
                  onClick={() => setSuperb(superb + 1)}
                  className={styles.wishBtn}>
                  +{superb}
                  <span style={{ fontSize: "15px" }}>Wishlist</span>
                </button>
              ) : (
                <Link to='/login'>
                  <button className={styles.wishBtn}>
                    <FaHeart /> {superb}
                  </button>
                </Link>
              )}

              {localStorage.TOKEN ? (
                <Link to='/'>
                  <button className={styles.cartBtn}>Add to Cart</button>
                </Link>
              ) : (
                <Link to='/login'>
                  <button className={styles.cartBtn}>Add to Cart</button>
                </Link>
              )}
              <br />
              <p>
                {" "}
                <FaClock color='#108370' />
                Delivery wii be made within 1 to 7 days depending on product and
                place.Cash on delivery available.
              </p>
            </div>
          </div>
          <br />
          <div>
            <h3>Description</h3>
            {products.descriptionPoints.map((descriptionPoint, index) => {
              return (
                <ul className={styles.despript}>
                  <li key={index}>{descriptionPoint}</li>
                  <br />
                </ul>
              );
            })}
          </div>
          <br />
          <br />
          <div>
            <h3>Customers feedback</h3>

            {Modal ? (
              <FeedbackModal setModal={setModal} setText={setText} />
            ) : null}
            <br />

            <div className={styles.feedImage}>
              <img
                src='http://reserverecruitment.co.za/images/usericon.png'
                alt='Avatar icon'
                width='100px'
                height='100px'
              />
              {localStorage.TOKEN ? (
                <button
                  onClick={() => setModal(true)}
                  className={styles.feedText}>
                  Write a feedback
                </button>
              ) : (
                <Link to='/login'>
                  <button className={styles.feedText}>Write a feedback</button>
                </Link>
              )}
            </div>

            <div className={styles.feedback}>
              <div className={styles.feedbackText}>
                <h4>{Text}</h4>
              </div>
            </div>
          </div>
          <br />
          Related Products
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {products.related.map((related) => {
              return (
                <Link
                  to={`/product/${related._id}`}
                  key={related._id}
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
                    src={related.coverImage}
                    alt={related.coverImage}
                    width='100%'
                    height='300px'
                    padding='20px'
                  />
                  <div style={{ height: "100px" }}>
                    <h4>{related.title}</h4>
                    <p>
                      <b> BD: {related.price}</b>
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          <br />
        </div>
        <br />
        <br />
        <Footer />
      </>
    );
  } else {
    return (
      <p style={{ marginLeft: "50%", marginTop: "50px" }}>Loading.......</p>
    );
  }
}

export default Product;
