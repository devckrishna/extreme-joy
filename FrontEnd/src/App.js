import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import HomeScreen from "./Screens/HomeScreen";
import Footer from "./Components/Footer";
import Men from "./Screens/Men";
import Kids from "./Screens/Kids";
import Women from "./Screens/Women";
import ProductDetailScreen from "./Screens/ProductDetailScreen";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import Account from "./utils/Account";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/men" component={Men} />
        <Route exact path="/women" component={Women} />
        <Route exact path="/kids" component={Kids} />
        <Route exact path="/cart" component={CartScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/:slug" component={ProductDetailScreen} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default App;
