import React from "react";
import { Switch, Route } from "react-router-dom"
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import HomePage from "./components/HomePage/HomePage";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={LoginForm} />
      <Route exact path="/register" component={RegisterForm} />
      <Route exact path="/home" component={HomePage} />
    </Switch>
  )
}

export default App;
