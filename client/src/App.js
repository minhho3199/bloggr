import React from "react";
import { Switch, Route, HashRouter, BrowserRouter, Router } from "react-router-dom"
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import CreatePostForm from "./components/Posts/CreatePostForm/createPostForm";
import UpdatePostForm from "./components/Posts/UpdatePostForm/updatePostForm";

const App = () => {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/create" component={CreatePostForm} />
          <Route exact path="/update" component={UpdatePostForm} />
        </Switch>
      </BrowserRouter>

    </div>

  )
}

export default App;
