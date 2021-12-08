import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css"
import axios from "axios";
import Submenu from "./Submenu";
import Recommended from "./Recommended";
import AllSubCategories from "./AllSubCategories";
import Footer from "../Footer/Footer";
import CardProducts from "./CardProduct";    // a product card component for reusable


function Home() {

  const [feed, setFeed] = useState({});
  const [complete, setComplete] = useState(false);


  const fetchData = async () => {
    try {
      const newsFeed = await axios.post(
        "https://baz-back.herokuapp.com/graphql",
        {
          query: `
            query{
              newsFeed{
                categories{
                  _id
                  name
                  logo
                }
                recommended{
                  _id
                  title
                  coverImage
                  price
                  offer
                }
                catProducts{
                  _id
                  name
                  logo
                  feturedProducts{
                    _id
                    title
                    coverImage
                    price
                    offer
                  }
                }
                allSubCategories{
                  _id
                  name
                  mainCategory
                  coverImage
                }
              }
            }
          `,
        }
      );
      console.log(newsFeed);
      setFeed(newsFeed.data.data.newsFeed);
      setComplete(true);
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
         
        <div style={{ padding: "40px" }}>
          <div>
            <Submenu category={feed.categories} />
          </div>

          <div>
            <Recommended recommed={feed.recommended} />
          </div><br />

          <div>
            <h1 className={styles.h1}>Men</h1>
            <CardProducts products={feed.catProducts[0]} />
          </div><br />

          <div>
            <h1 className={styles.h1}>Women</h1>
            <CardProducts products={feed.catProducts[1]} />
          </div><br />

          <div>
            <h1 className={styles.h1}>Kids</h1>
            <CardProducts products={feed.catProducts[2]} />
          </div><br />

          <div>
            <h1 className={styles.h1}>Bag & Luggages</h1>
            <CardProducts products={feed.catProducts[3]} />
          </div><br />



          <div className={styles.lookingFor}>
            <h1 className={styles.h1}>What are you looking for?</h1>
            <h3>
              <Link className={styles.seeAll} to="/categories">See All {">"}</Link>
            </h3>
          </div>

          <div className={styles.allSubCatagories} >
            <AllSubCategories
              allSubCategoriesFeatures={feed.allSubCategories[0]}
            />
            <AllSubCategories
              allSubCategoriesFeatures={feed.allSubCategories[1]}
            />
            <AllSubCategories
              allSubCategoriesFeatures={feed.allSubCategories[2]}
            />
            <AllSubCategories
              allSubCategoriesFeatures={feed.allSubCategories[3]}
            />
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </>
    );
  } else {
    return <p style={{marginLeft:"50%", marginTop:"50px"}}>Loading.......</p>;
  }
}

export default Home;
