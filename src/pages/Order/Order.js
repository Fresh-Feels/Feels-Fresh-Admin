import React, { useEffect } from "react";

//Dependencies
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

//Styles and Components
import styles from "./Order.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getAllOrders } from "../../store/Methods/orderMethods";

export default function Order({ history }) {
  //State Management
  const { orders } = useSelector((state) => state.GetAllOrdersReducer);
  const dispatch = useDispatch();

  //Get All Orders
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar_panel}>
        <Sidebar />
      </div>
      <div className={styles.content_panel}>
        <div className={styles.table_container}>
          <div className={styles.table}>
            <div className={styles.table_header}>
              <div className={styles.header__item}>
                <p className={styles.filter__link}>Customer Name</p>
              </div>
              <div className={styles.header__item}>
                <p className={styles.filter__link}>Customer Address</p>
              </div>
              <div className={styles.header__item}>
                <p className={styles.filter__link}>Order Items</p>
              </div>
              <div className={styles.header__item}>
                <p className={styles.filter__link}>Created At</p>
              </div>
              <div className={styles.header__item}>
                <p className={styles.filter__link}></p>
              </div>
            </div>
            <div className={styles.table_content}>
              {orders.map((order) => (
                <div className={styles.table_row} key={order._id}>
                  <div className={styles.table_data}>{order.user.username}</div>
                  <div className={styles.table_data}>
                    {order.shippingAddress}
                  </div>
                  <div className={styles.table_data}>
                    {order.orderItems.map((item) => (
                      <div key={item._id}>{item.name}</div>
                    ))}
                  </div>
                  <div className={styles.table_data}>
                    {dayjs(order.createdAt).format("DD/MM/YYYY")}
                  </div>
                  <div className={styles.table_data}>
                    <button
                      className="btn_app"
                      onClick={() =>
                        history.push(`/order-details/${order._id}`)
                      }
                    >
                      Order Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
