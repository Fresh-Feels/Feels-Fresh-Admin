import React from "react";

//Dependencies
import { BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import RouteLink from "./private/RouteLinks"
import PrivateRoute from "./private/PrivateRoutes"

//Pages and Components
import Store from "./store";

import Login from "./pages/Login/Login";
import Meal from "./pages/Meal/Meal";
import MealDetails from "./pages/Meal Details/MealDetails";
import AddMeal from "./pages/Add Meal/AddMeal";
import AddMenu from "./pages/Add Menu/AddMenu";
import Item from "./pages/Item/Item";
import ItemDetails from "./pages/Item Details/ItemDetails";
import AddItem from "./pages/Add Item/AddItem";
import Order from "./pages/Order/Order";
import OrderDetails from "./pages/Order Details/OrderDetails";

export default function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Switch>
          <RouteLink path="/" exact component={Login} />
          <RouteLink path="/login" exact component={Login} />
          <PrivateRoute path="/meal" exact component={Meal} />
          <PrivateRoute path="/meal-details/:id" exact component={MealDetails} />
          <PrivateRoute path="/add-meal" exact component={AddMeal} />
          <PrivateRoute path="/add-menu/:id" exact component={AddMenu} />
          <PrivateRoute path="/item" exact component={Item} />
          <PrivateRoute path="/item-details/:id" exact component={ItemDetails} />
          <PrivateRoute path="/add-item" exact component={AddItem} />
          <PrivateRoute path="/order" exact component={Order} />
          <PrivateRoute path="/order-details/:id" exact component={OrderDetails} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
