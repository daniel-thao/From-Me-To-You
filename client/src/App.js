import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import PrivateRoute from "./components/unique/PrivateRoute";

// Import Pages
import Landing from "./pages/Landing";
import Homepage from "./pages/Homepage";

import { Auth } from "./routes/auth";

function App() {
  return (
    <Auth>
      <Router>
        <Route exact path="/" component={Landing}></Route>
        <Switch>
          <PrivateRoute path="/frommetoyou" component={Homepage}></PrivateRoute>
        </Switch>
      </Router>
    </Auth>
  );
}

export default App;
