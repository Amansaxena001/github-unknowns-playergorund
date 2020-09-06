import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter,
} from "react-router-dom";
import HomeCom from "./components/HomeCom";
import NavCom from "./components/NavCom";
import AboutCom from "./components/AboutCom";
import FightCom from "./components/FightCom";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavCom />
        <Switch>
          <Route exact path="/" component={HomeCom} />
          <Route exact path="/fight" component={FightCom} />
          <Route exact path="/about" component={AboutCom} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
