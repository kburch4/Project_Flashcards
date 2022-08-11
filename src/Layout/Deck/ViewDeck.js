import React, { useEffect, useState } from "react";
import { readDeck } from "../../utils/api/index";
import { useParams, Link } from "react-router-dom";
import Button from "../Componets/Button";
import NavBar from "../Componets/NavBar";
import DeleteDeck from "./DeleteDeck";
import DeleteCard from "../Card/DeleteCard";

const ViewDeck = () => {
  //   Loading the deckId from params and use that to load the deck info as well as card info
  const deckId = useParams().deckId;
  console.log(deckId);
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function readDeckFromAPI() {
      try {
        const deckResponse = await readDeck(deckId);
        const deckFromAPI = deckResponse;
        setDeck(deckFromAPI);
        setCards(deckFromAPI.cards);
      } catch (error) {
        console.log("Read deck error: ", error);
      }
    }
    readDeckFromAPI();
  }, [deckId]);

  //This is our form for Nav bar as well as the buttons
  return (
    <div>
      <NavBar deck={deck} navType="View" />
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      <div className="d-flex justify-content-between">
        <div className="d-flex justify-content-between">
          <Link to={`/decks/${deck.id}/edit`}>
            <Button btnStyle="secondary" icon="pencil" text="Edit" />
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <Button btnStyle="primary" icon="book" text="Study" />
          </Link>
          <Link to={`/decks/${deck.id}/cards/new`}>
            <Button btnStyle="primary" icon="plus" text="Add Cards" />
          </Link>
        </div>
        <div>
          <DeleteDeck deck={deck} />
        </div>
      </div>
      <p />
      <h1>Cards</h1>
      <p />
      {cards.map((card, index) => {
        return (
          <div className="card" key={index}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="col">{card.front}</div>
                <div className="col"></div>
                <div className="col">{card.back}</div>
              </div>
              <div className="d-flex justify-content-end">
                <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                  <Button
                    btnStyle="secondary"
                    icon="pencil"
                    text="Edit"
                  />
                </Link>
                <DeleteCard card={card} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewDeck;