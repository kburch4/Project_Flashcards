import React, { Fragment } from "react";
import Header from "./Header";
import Home from "./Componets/Home";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import CreateDeck from "./Deck/CreateDeck";
import ViewDeck from "./Deck/ViewDeck";
import EditDeck from "./Deck/EditDeck";
import StudyDeck from "./Deck/Study";
import AddCard from "./Card/AddCard";
import EditCard from "./Card/EditCard";

//Containing all of our paths to each file

function Layout() {
  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/decks/new">
            <CreateDeck />
          </Route>

          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

          <Route exact path="/decks/:deckId/">
            <ViewDeck />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;