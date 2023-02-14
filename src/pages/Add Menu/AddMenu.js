import React, { useEffect, useState } from "react";

//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

//Styles and Components
import styles from "./AddMenu.module.css";
import { getAllItems } from "../../store/Methods/itemMethods";
import { addMenu } from "../../store/Methods/menuMethods";

export default function AddMenu({ history }) {
  //States
  const [menu, setMenu] = useState([]);

  //State Management
  const { items } = useSelector((state) => state.GetAllItemsReducer);
  const { loading, errors, success, msg } = useSelector(
    (state) => state.AddMenuReducer
  );
  const dispatch = useDispatch();

  //Meal Id
  const { id } = useParams();

  //Add Menu
  const handleSubmit = () => {
    dispatch(addMenu({ meal: id, menu }));
  };

  //Get All Items
  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

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
      history.push("/meal");
    }
  }, [success, history, msg]);

  return (
    <>
      <div className={styles.container}>
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
        <div className={styles.content_panel}>
          <div className={styles.content_panel_card_container}>
            <div className={styles.content_panel_card}>
              <h3 className={styles.card_h3}>Choose Menu</h3>
              <div className={styles.card_container}>
                {items.map((item) => (
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
                        onClick={() => {
                          setMenu([...menu, item._id]);
                          toast.success("Item Added");
                        }}
                      >
                        Choose
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {!loading && (
        <div className={styles.submit_group}>
          <button
            type="submit"
            className={styles.submit_form_btn}
            onClick={() => {
              handleSubmit();
            }}
          >
            Add Menu
          </button>
        </div>
      )}
      {loading && (
        <div className={styles.submit_group}>
          <button
            type="submit"
            className={styles.submit_form_btn}
            onClick={() => {
              handleSubmit();
            }}
          >
            Loading...
          </button>
        </div>
      )}
    </>
  );
}
