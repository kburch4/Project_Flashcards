import React, { useEffect, useState } from "react";
import { readCard, readDeck } from "../../utils/api/index";
import NavBar from "../Componets/NavBar";
import { useParams } from "react-router-dom";
import Form from "./ViewCard";

// This will show our front and back areas for our cards to edit
const EditCard = () => {
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState({ front: "", back: "" });
  const deckId = parseInt(useParams().deckId);
  const cardId = parseInt(useParams().cardId);

  useEffect(() => {
    async function readDecksAndCards() {
      try {
        const deckResponse = readDeck(deckId);
        const decksFromAPI = await deckResponse;

        const cardResponse = readCard(cardId);
        const cardsFromAPI = await cardResponse;

        setDeck(decksFromAPI);
        setCard(cardsFromAPI);
      } catch (error) {
        console.log("Read deck error: ", error);
      }
    }
    readDecksAndCards();
  }, [deckId, cardId]);

  //console.log("card", card.front);

  return (
    <div>
      <NavBar deck={deck} navType="Edit Card" />
      <h1>Edit Card</h1>

      <Form
        card={card}
        cardFront={card.front}
        cardBack={card.back}
        id={cardId}
        deckId={deckId}
        formType="Edit Card"
      />
    </div>
  );
};

export default EditCard;
