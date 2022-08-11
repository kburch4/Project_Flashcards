import React from "react";
import DeckList from "../Deck/DeckList/DeckList";
import { Link } from "react-router-dom";
import Button from "./Button";

//This is where our DeckList is shown for home page.
const Home = () => {
  return (
    <div>
      <Link to={"/decks/new"}>
        <Button btnStyle="secondary" icon="plus" text="Create Deck" />
      </Link>
      <DeckList />
    </div>
  );
};

export default Home;