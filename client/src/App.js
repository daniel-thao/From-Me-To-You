import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

// Import Pages
import Homepage from "./pages/Homepage"

function App() {
  return (
    <Router>
      <Route exact paht="/" component={Homepage}></Route>
    </Router>
  );
}

export default App;
