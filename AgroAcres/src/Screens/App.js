import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from "../Components/Navbar";
import Home from "./Home";
import Predict from "../Components/Predict";
import CropWise from "./CropWise";
import SeasonWise from "./SeasonWise";
import Result from "./Result";
import Analysis from "./Analysis";

function App() {
  return (
    <div style={{
      position: "relative"
    }}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home}>
          </Route>
          <Route path="/seasonwise" exact component={SeasonWise}>
          </Route>
          <Route path="/cropwise" exact component={CropWise}>
          </Route>
          <Route path="/result" exact component={Result}>
          </Route>
          <Route path="/analysis" exact component={Analysis}>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
