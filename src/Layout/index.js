import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import DeckCreate from "./DeckCreate";
import Study from "./Study";
import DeckEdit from "./DeckEdit";
import CardEdit from "./CardEdit";
import Deck from "./Deck";
import CardCreate from "./CardCreate";
import NotFound from "./NotFound";

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
          <Route path={"/decks/:deckId/study"}>
            <Study />
          </Route>
          <Route path={"/decks/:deckId/edit"}>
            <DeckEdit />
          </Route>
          <Route path={"/decks/:deckId/cards/:cardId/edit"}>
            <CardEdit />
          </Route>
          <Route path={"/decks/:deckId/cards/new"}>
            <CardCreate />
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
