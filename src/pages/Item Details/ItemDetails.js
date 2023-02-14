import React, { useEffect } from "react";

//Dependencies
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//Styles and components
import styles from "./itemDetails.module.css";
import Loader from "../../components/Loader/Loader";
import { getSpecificItem } from "../../store/Methods/itemMethods";

export default function ItemDetails({history}) {
  //State Management
  const { item } = useSelector((state) => state.GetSpecificItemReducer);
  const dispatch = useDispatch();

  //Item Id
  const { id } = useParams();

  //Get All Items
  useEffect(() => {
    dispatch(getSpecificItem(id));
  }, [dispatch, id]);

  return (
    <>
      {JSON.stringify(item) === "{}" ? (
        <Loader />
      ) : (
        <>
          <div className={styles.content_panel_btn}>
            <button
              className="btn_app"
              onClick={() => history.push("/item")}
            >
              Go Back
            </button>
          </div>
          <div className={styles.container}>
            <div className={styles.single_product}>
              <div className={styles.row}>
                <div className={styles.col_6}>
                  <div className={styles.product_image}>
                    <div className={styles.product_image_main}>
                      <img src={item.image} alt={item.name} />
                    </div>
                  </div>
                </div>
                <div className={styles.col_6}>
                  <div className={styles.breadcrumb}>
                    <span>Protien {item.nutrients[0].protein}g</span>
                    <span>Carb {item.nutrients[0].carb}g</span>
                    <span>Fat {item.nutrients[0].fat}g</span>
                    <span>Fiber {item.nutrients[0].fiber}g</span>
                  </div>
                  <div classname={styles.product}>
                    <div className={styles.product_title}>
                      <h2>{item.name}</h2>
                    </div>
                    <div className={styles.product_details}>
                      <h3>Description</h3>
                      <p>{item.description}</p>
                    </div>
                    <div className={styles.product_details}>
                      <h3>Type</h3>
                      <p>{item.type}</p>
                    </div>
                    <div className={styles.product_details}>
                      <h3>Calories</h3>
                      <p>{item.calories}</p>
                    </div>
                    <div className={styles.product_details}>
                      <h3>Cooking Time</h3>
                      <p>{item.cookingTime} minutes</p>
                    </div>
                    <div className={styles.product_details}>
                      <h3>Ingredients</h3>
                      {item.ingredients.map((ingredient) => (
                        <div
                          className={styles.ingredient_container}
                          key={ingredient._id}
                        >
                          <div className={styles.ingredient_img}>
                            <img
                              src={ingredient.ingredientImage}
                              alt={ingredient.ingredientName}
                            />
                          </div>
                          <div className={styles.ingredient_content}>
                            <h2>{ingredient.ingredientName}</h2>
                            <div className={styles.ingredient_nutrients}>
                              <span>
                                Protien {ingredient.nutrients[0].protein}g
                              </span>
                              <span>Carb {ingredient.nutrients[0].carb}g</span>
                              <span>Fat {ingredient.nutrients[0].fat}g</span>
                              <span>
                                Fiber {ingredient.nutrients[0].fiber}g
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={styles.product_details}>
                      <h3>Directions</h3>
                      <p>{item.directions}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
