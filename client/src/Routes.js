import React from 'react';
import './App.css';
import { Switch,Route } from "react-router-dom";
import Auth from "./HighOrder/Auth";
import Public from "./Layout/Public";
import Private from "./Layout/Private";
import Dashboard from "./Component/Private/Dashboard";
import RegisterUser from "./Component/Private/Users/Register";
import Login from "./Component/Public/Login";
const Routes = () => {
  return (
      <Public>
        <Switch>
            <Route path="/" exact component={Auth(Login,false)}/>
            <Private>
              <Route path="/users/dashboard" exact component={Auth(Dashboard,true)}/>
              <Route path="/users/register" exact component={Auth(RegisterUser,true)}/>
            </Private>
        </Switch>
      </Public>
  );
}

export default Routes;
