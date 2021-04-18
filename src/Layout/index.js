import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import DeckCreate from "./DeckCreate";
import Deck from "./Deck";
import NotFound from "./NotFound";
import DeckEdit from "./DeckEdit";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route path={"/decks/new"}>
            <DeckCreate />
          </Route>
          <Route path={"/decks/:deckId/edit"}>
            <DeckEdit />
          </Route>
          <Route path={"/decks/:deckId"}>
            <Deck />
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
