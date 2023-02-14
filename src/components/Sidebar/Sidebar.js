import React from "react";

//Dependencies
import { NavLink } from "react-router-dom";

//Styles and Components
import "./Sidebar.css";
import MealIcon from "../../assets/meal.svg";
import AddIcon from "../../assets/plus.svg";
import OrderIcon from "../../assets/order.svg";


export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <p>Hey Admin</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/meal">
                <img src={MealIcon} alt="Meal Icon" />
                <span>Meals</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/item">
                <img src={AddIcon} alt="Item Icon" />
                <span>Items</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/order">
                <img src={OrderIcon} alt="Order Icon" />
                <span>Orders</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}