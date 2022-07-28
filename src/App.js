import "./index.scss";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// Components
import All from "./All";
import Dashboard from "./dashboard";
import TransactionHistory from "./components/Transactions/TransactionHistory";
function App() {
  return (
    <>
      <Router>
        <All>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route
              exact
              path="/transaction_history"
              component={TransactionHistory}
            />
          </Switch>
        </All>
      </Router>
    </>
  );
}

export default App;
