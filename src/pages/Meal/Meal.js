import React, { useEffect } from "react";

//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//Styles and Components
import styles from "./Meal.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getAllMeals } from "../../store/Methods/mealMethods";

export default function Meal({ history }) {
  //State Management
  const { meals } = useSelector((state) => state.GetAllMealsReducer);
  const dispatch = useDispatch();

  //Get All Meals
  useEffect(() => {
    dispatch(getAllMeals());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar_panel}>
        <Sidebar />
      </div>
      <div className={styles.content_panel}>
        <div className={styles.content_panel_btn}>
          <button className="btn_app" onClick={() => history.push("/add-meal")}>
            Add Menu
          </button>
        </div>
        <div className={styles.content_panel_card_container}>
          <div className={styles.content_panel_card}>
            <h3 className={styles.card_h3}>Items</h3>
            <div className={styles.card_container}>
              {meals.map((meal) => (
                <Link to={`/meal-details/${meal._id}`} style={{ all: "unset" }}>
                  <div className={styles.card} key={meal._id}>
                    <div className={styles.card_header}>
                      <img src={meal.image} alt={meal.name} />
                    </div>
                    <div className={styles.card_body}>
                      <h4>{meal.name}</h4>
                      <p>
                        <strong>Price:</strong> ${meal.price}
                      </p>
                      <p>
                        <strong>Calories:</strong> {meal.calories}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
