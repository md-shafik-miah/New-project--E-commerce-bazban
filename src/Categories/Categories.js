import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import Submenu from "../Home/Submenu";
import MenCat from "./MenCat";
import styles from "./Categories.module.css"


function Categories() {
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
       <div style={{padding:"40px"}}>
          <h2>Top Categories</h2>
          <div>
            <Submenu category={feed.categories}/>
          </div>

          
          <h2>Men</h2><br />
          <div className={styles.categoriesCard}>
                <MenCat catProducts= {feed.allSubCategories[5]}/>
                <MenCat catProducts= {feed.allSubCategories[6]}/>
                <MenCat catProducts= {feed.allSubCategories[7]}/>
                <MenCat catProducts= {feed.allSubCategories[8]}/>
                <MenCat catProducts= {feed.allSubCategories[9]}/>
            </div>


          <h2>Women</h2><br />
          <div className={styles.categoriesCard}>
                <MenCat catProducts= {feed.allSubCategories[10]}/>
                <MenCat catProducts= {feed.allSubCategories[11]}/>
                <MenCat catProducts= {feed.allSubCategories[12]}/>
                <MenCat catProducts= {feed.allSubCategories[13]}/>
                <MenCat catProducts= {feed.allSubCategories[14]}/>
            </div>


          <h2>Jwellery</h2><br />
          <div className={styles.categoriesCard}>
                <MenCat catProducts= {feed.allSubCategories[0]}/>
                <MenCat catProducts= {feed.allSubCategories[1]}/>
                <MenCat catProducts= {feed.allSubCategories[2]}/>
            </div>


          <h2>Toy</h2><br />
          <div className={styles.categoriesCard}>
                <MenCat catProducts= {feed.allSubCategories[3]}/>
          </div>

          <h2>Electronics</h2><br />
          <div className={styles.categoriesCard}>
                <MenCat catProducts= {feed.allSubCategories[4]}/>
          </div>


          <h2>Bag & Luggages</h2><br />
          <div className={styles.categoriesCard}>
                <MenCat catProducts= {feed.allSubCategories[15]}/>
          </div><br />
        </div>

        <div>
            <Footer/>
        </div>
      </>
    );
  } else {
    return <p>Loading.......</p>;
  }
}

export default Categories;

