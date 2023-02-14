import React, { useEffect } from "react";

//Dependencies
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//Styles and Components
import styles from "./MealDetails.module.css";
import Loader from "../../components/Loader/Loader";
import { getSpecificMenu } from "../../store/Methods/menuMethods";

export default function MealDetails({ history }) {
  //State Management
  const { menu } = useSelector((state) => state.GetSpecificMenuReducer);
  const dispatch = useDispatch();

  //Item Id
  const { id } = useParams();

  //Get Specific Menu
  useEffect(() => {
    dispatch(getSpecificMenu(id));
  }, [dispatch, id]);

  return (
    <>
      {menu.length === 0 ? (
        <Loader />
      ) : (
        <>
          <button className="btn_app" onClick={() => history.push("/meal")} style={{margin: '2rem'}}>
            Go Back
          </button>
          <h3 className={styles.card_h3}>Meal Details</h3>
          <div className={styles.container}>
            <div className={styles.single_product}>
              <div className={styles.row}>
                <div className={styles.col_6}>
                  <div className={styles.product_image}>
                    <div className={styles.product_image_main}>
                      <img src={menu[0].meal.image} alt={menu[0].meal.name} />
                    </div>
                  </div>
                </div>
                <div className={styles.col_6}>
                  <div classname={styles.product}>
                    <div className={styles.product_title}>
                      <h2>{menu[0].meal.name}</h2>
                    </div>
                    <div className={styles.product_details}>
                      <h3>Price</h3>
                      <p>{menu[0].meal.price}</p>
                    </div>
                    <div className={styles.product_details}>
                      <h3>Total Calories</h3>
                      <p>{menu[0].meal.calories}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.content_panel_card_container}>
            <div className={styles.content_panel_card}>
              <h3 className={styles.card_h3}>Menu</h3>
              <div className={styles.card_container}>
                {menu[0].menu.map((item) => (
                  <div className={styles.card} key={item._id}>
                    <div className={styles.card_header}>
                      <img src={item.image} alt={item.type} />
                    </div>
                    <div className={styles.card_body}>
                      <h4>{item.name}</h4>
                      <p>{item.type}</p>
                    </div>
                    <div className={styles.group}>
                      <button
                        type="submit"
                        className={styles.form_btn}
                        onClick={() =>
                          history.push(`/item-details/${item._id}`)
                        }
                      >
                        Item Detail
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
