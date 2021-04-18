import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Header from "./Header";
import Decks from "./Decks";
import NotFound from "./NotFound";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact={true} path="/">
            <Link
              to="/decks/new"
              className="btn btn-secondary"
              style={{ marginBottom: "10px" }}
            >
              <i className="oi oi-plus" style={{ paddingRight: "5px" }}></i>
              Create Deck
            </Link>
            <Decks />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
