import React, { useEffect } from "react";

//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

//Styles and Components
import styles from "./OrderDetails.module.css";
import Loader from "../../components/Loader/Loader";
import { getSpecificOrders } from "../../store/Methods/orderMethods";

export default function OrderDetails({ history }) {
  //State Management
  const { order } = useSelector((state) => state.GetSpecificOrderReducer);
  const dispatch = useDispatch();

  console.log(order);

  //Id
  const { id } = useParams();

  //Get All Orders
  useEffect(() => {
    dispatch(getSpecificOrders(id));
  }, [dispatch, id]);

  return (
    <>
      {JSON.stringify(order) === "{}" ? (
        <Loader />
      ) : (
        <>
          <button
            className="btn_app"
            onClick={() => history.push("/order")}
            style={{ margin: "2rem" }}
          >
            Go Back
          </button>
          <div className={styles.summary_container}>
            <div className={styles.summary_content}>
              <div className={styles.summary_content_address}>
                <h2 className={styles.summary_title_h2}>Shipping</h2>
                <p className={styles.summary_subtitle}>
                  <strong style={{ fontWeight: "bold" }}>Address: </strong>{" "}
                  {order.shippingAddress}
                </p>
              </div>
              <div className={styles.summary_content_address}>
                <h2 className={styles.summary_title_h2}>
                  Customer Information
                </h2>
                <p className={styles.summary_subtitle}>
                  <strong style={{ fontWeight: "bold" }}>Name: </strong>{" "}
                  {order.user.username}
                </p>
                <p className={styles.summary_subtitle}>
                  <strong style={{ fontWeight: "bold" }}>Email: </strong>{" "}
                  {order.user.email}
                </p>
              </div>
              <div className={styles.product_details}>
                <h3>Order Items</h3>
                <div className={styles.content_panel_card_container}>
                  <div className={styles.content_panel_card}>
                    <h3 className={styles.card_h3}>Menu</h3>
                    <div className={styles.card_container}>
                      {order.orderItems.map((item) => (
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
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
