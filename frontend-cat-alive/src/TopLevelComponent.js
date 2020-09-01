import React from "react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const TopLevelComponent = () => {
  return (
      <Router>
          <App/>
      </Router>
  );
};

export default TopLevelComponent;