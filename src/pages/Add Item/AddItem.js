import React, { useState, useEffect } from "react";

//Dependencies
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

//Styles and Components
import styles from "./AddItem.module.css";
import { BASE_URL } from "../../store/Constants/Constants";
import { addItem } from "../../store/Methods/itemMethods";

export default function AddItem({ history }) {
  //States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [calories, setCalories] = useState(0);
  const [directions, setDirections] = useState("");
  const [category, setCategory] = useState("");
  const [itemImage, setItemImage] = useState();

  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientDescription, setIngredientDescription] = useState("");
  const [ingredientImage, setIngredientImage] = useState("");

  const [protein, setProtein] = useState(0);
  const [carb, setCarb] = useState(0);
  const [fat, setFat] = useState(0);
  const [fiber, setFiber] = useState(0);

  //State Management
  const { success, errors, loading, msg } = useSelector(
    (state) => state.AddItemReducer
  );
  const dispatch = useDispatch();

  //Handle Item Image Functions
  const handleItemImage = (e) => {
    const file = e.target.files[0];
    const type = file.type.split("/")[1];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      uploadItemImage(reader.result, type);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
    };
  };

  const uploadItemImage = async (base64EncodedImage, type) => {
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
      setItemImage(data.image);
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
  };

  //Handle Ingredient Images
  const handleIngredientImage = (e) => {
    const file = e.target.files[0];
    const type = file.type.split("/")[1];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      uploadIngredientImage(reader.result, type);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
    };
  };

  const uploadIngredientImage = async (base64EncodedImage, type) => {
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
      setIngredientImage(data.image);
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
  };

  //Functions
  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      name,
      description,
      type,
      cookingTime,
      calories,
      directions,
      category,
      image: itemImage,
      ingredients,
    };
    console.log(item);
    dispatch(addItem(item));
  };

  const handleIngredients = (e) => {
    e.preventDefault();
    const Ingredient = {
      ingredientName,
      ingredientDescription,
      ingredientImage,
      nutrients: [{ protein, carb, fat, fiber }],
    };

    //Cleaning Up
    setIngredients([...ingredients, Ingredient]);
    setIngredientDescription("");
    setIngredientName("");
    setIngredientImage("");
    setProtein("");
    setCarb("");
    setFat("");
    setFiber("");
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
      history.push("/item");
    }
  }, [success, history, msg]);

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
        <form onSubmit={handleIngredients}>
          <div className={`${styles.row} ${styles.mlMinus15}`}>
            <div className={`${styles.col6} ${styles.p15}`}>
              <div className={styles.create_card}>
                <h3 className={styles.card_h3}>Ingredient Details</h3>
                <div className={styles.group}>
                  <label htmlFor="ingredientName">Ingredient Name</label>
                  <input
                    type="text"
                    id="ingredientName"
                    className={styles.group__control}
                    placeholder="Enter Ingredient Name"
                    onChange={(e) => setIngredientName(e.target.value)}
                    value={ingredientName}
                  />
                </div>
                <div className={styles.group}>
                  <label htmlFor="ingredientDescription">
                    Ingredient Description
                  </label>
                  <textarea
                    type="text"
                    id="ingredientDescription"
                    className={styles.group__control}
                    placeholder="Enter Ingredient Description"
                    rows={0}
                    onChange={(e) => setIngredientDescription(e.target.value)}
                    value={ingredientDescription}
                  />
                </div>
                <div className={styles.group}>
                  <label htmlFor="image">Ingredient Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleIngredientImage}
                  />
                </div>

                {/* Nutrients */}
                <h3 className={styles.card_h3}>Nutrients</h3>
                <div className={styles.group}>
                  <label htmlFor="Protien">Protein</label>
                  <input
                    type="number"
                    id="Protien"
                    className={styles.group__control}
                    onChange={(e) => setProtein(e.target.value)}
                    value={protein}
                  />
                </div>
                <div className={styles.group}>
                  <label htmlFor="carb">Carb</label>
                  <input
                    type="number"
                    id="carb"
                    className={styles.group__control}
                    onChange={(e) => setCarb(e.target.value)}
                    value={carb}
                  />
                </div>
                <div className={styles.group}>
                  <label htmlFor="fat">Fat</label>
                  <input
                    type="number"
                    id="fat"
                    className={styles.group__control}
                    onChange={(e) => setFat(e.target.value)}
                    value={fat}
                  />
                </div>
                <div className={styles.group}>
                  <label htmlFor="fiber">Fiber</label>
                  <input
                    type="number"
                    id="fiber"
                    className={styles.group__control}
                    onChange={(e) => setFiber(e.target.value)}
                    value={fiber}
                  />
                </div>
                <button className="btn_app">Add Ingredient</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* Item Details */}
      <div className={styles.form_container}>
        <form onSubmit={handleSubmit}>
          <div className={`${styles.row} ${styles.mlMinus15}`}>
            <div className={`${styles.col6} ${styles.p15}`}>
              <div className={styles.create_card}>
                <h3 className={styles.card_h3}>Item Details</h3>
                <div className={styles.group}>
                  <label htmlFor="name">Item Name</label>
                  <input
                    type="text"
                    id="name"
                    className={styles.group__control}
                    placeholder="Enter Item Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <div className={styles.group}>
                  <label htmlFor="description">Description</label>
                  <textarea
                    type="text"
                    id="description"
                    className={styles.group__control}
                    placeholder="Enter Item Description"
                    rows={2}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </div>
                <div className={styles.group}>
                  <label>Item Type</label>
                  <select
                    className={styles.group__control}
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snacks</option>
                  </select>
                </div>
                <div className={styles.group}>
                  <label htmlFor="Cooking Time">Cooking Time</label>
                  <input
                    type="text"
                    id="Cooking Time"
                    className={styles.group__control}
                    placeholder="Enter Cooking Time"
                    onChange={(e) => setCookingTime(e.target.value)}
                    value={cookingTime}
                  />
                </div>
                <div className={styles.group}>
                  <label htmlFor="calories">Calories</label>
                  <input
                    type="number"
                    id="calories"
                    className={styles.group__control}
                    placeholder="Enter Calories"
                    onChange={(e) => setCalories(e.target.value)}
                    value={calories}
                  />
                </div>
                <div className={styles.group}>
                  <label htmlFor="direction">Direction</label>
                  <textarea
                    type="text"
                    id="direction"
                    className={styles.group__control}
                    placeholder="Enter Item Direction"
                    rows={2}
                    onChange={(e) => setDirections(e.target.value)}
                    value={directions}
                  />
                </div>
                <div className={styles.group}>
                  <label>Item Category</label>
                  <select
                    className={styles.group__control}
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  >
                    <option value="Low Carb">Low Carb</option>
                    <option value="Fan Favorite">Fan Favorite</option>
                    <option value="Vegetable">Vegetable</option>
                    <option value="Balanced">Balanced</option>
                    <option value="Recent">Recent</option>
                  </select>
                </div>
                <div className={styles.group}>
                  <label htmlFor="image">Item Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleItemImage}
                  />
                </div>
                {!loading && (
                  <div className={styles.group}>
                    <button type="submit" className={styles.form_btn}>
                      Add Item
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
