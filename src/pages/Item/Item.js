import React, { useEffect } from "react";

//Dependencies
import { useSelector, useDispatch } from "react-redux";

//Styles and components
import styles from "./Item.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getAllItems } from "../../store/Methods/itemMethods";
import { Link } from "react-router-dom";

export default function Item({ history }) {
  //State Management
  const { items } = useSelector((state) => state.GetAllItemsReducer);
  const dispatch = useDispatch();

  //Get All Items
  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar_panel}>
        <Sidebar />
      </div>
      <div className={styles.content_panel}>
        <div className={styles.content_panel_btn}>
          <button className="btn_app" onClick={() => history.push("/add-item")}>
            Add Item
          </button>
        </div>
        <div className={styles.content_panel_card_container}>
          <div className={styles.content_panel_card}>
            <h3 className={styles.card_h3}>Items</h3>
            <div className={styles.card_container}>
              {items.map((item) => (
                <Link to={`/item-details/${item._id}`} style={{ all: "unset" }}>
                  <div className={styles.card} key={item._id}>
                    <div className={styles.card_header}>
                      <img src={item.image} alt={item.type} />
                    </div>
                    <div className={styles.card_body}>
                      <h4>{item.name}</h4>
                      <p>{item.type}</p>
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
