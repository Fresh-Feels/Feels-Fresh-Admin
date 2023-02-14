import React, { useState, useEffect } from "react";

//Dependencies
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

//Styles and Components
import styles from "./AddMeal.module.css";
import { BASE_URL } from "../../store/Constants/Constants";
import { addMeal } from "../../store/Methods/mealMethods";

export default function AddMeal({ history }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  //State Management
  const { success, errors, loading, msg, meal } = useSelector(
    (state) => state.AddMealReducer
  );
  const dispatch = useDispatch();

  //Image Functions
  const handleImage = (e) => {
    const file = e.target.files[0];
    const type = file.type.split("/")[1];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      uploadImage(reader.result, type);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
    };
  };

  const uploadImage = async (base64EncodedImage, type) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const body = JSON.stringify({ data: base64EncodedImage, type });
      const { data } = await axios.post(
        `${BASE_URL}/api/upload/image`,
        body,
        config
      );
      toast.success(data.msg);
      setImage(data.image);
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
  };

  //Functions
  const handleMeal = (e) => {
    e.preventDefault();
    dispatch(addMeal({ name, price, image }));
  };

  //Displaying errors
  useEffect(() => {
    if (errors.length > 0) {
      errors.map((err) => toast.error(err.msg));
    }
  }, [errors]);

  //Display Success
  useEffect(() => {
    if (success) {
      toast.success(msg);
      history.push(`/add-menu/${meal._id}`);
    }
  }, [success, history, msg, meal]);

  return (
    <div>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            fontSize: "14px",
          },
        }}
      />
      {/* Ingredients */}
      <div className={styles.form_container}>
        <form onSubmit={handleMeal}>
          <div className={`${styles.row} ${styles.mlMinus15}`}>
            <div className={`${styles.col6} ${styles.p15}`}>
              <div className={styles.create_card}>
                <h3 className={styles.card_h3}>Meal Details</h3>
                <div className={styles.group}>
                  <label htmlFor="name">Meal Name</label>
                  <input
                    type="text"
                    id="name"
                    className={styles.group__control}
                    placeholder="Enter Meal Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <div className={styles.group}>
                  <label htmlFor="price">Meal Price</label>
                  <input
                    type="number"
                    id="price"
                    className={styles.group__control}
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </div>
                <div className={styles.group}>
                  <label htmlFor="image">Meal Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImage}
                  />
                </div>
                {!loading && (
                  <div className={styles.group}>
                    <button type="submit" className={styles.form_btn}>
                      Add Meal
                    </button>
                  </div>
                )}
                {loading && (
                  <div className={styles.group}>
                    <button type="submit" className={styles.form_btn}>
                      Loading...
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
