import React from 'react';
import './App.css';
import { Switch,Route } from "react-router-dom";
import Public from "./Layout/Public";
import Private from "./Layout/Private";
import Dashboard from "./Component/Private/Dashboard";
import Login from "./Component/Public/Login";
const Routes = () => {
  return (
      <Public>
        <Switch>
            <Route path="/" exact component={Login}/>
            <Private>
              <Route path="/users/dashboard" exact component={Dashboard}/>
            </Private>
        </Switch>
      </Public>
  );
}

export default Routes;
