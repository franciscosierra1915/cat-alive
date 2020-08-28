import React from "react";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App2 = () => {
  return (
      <Router>
          <App/>
      </Router>
  );
};

export default App2;