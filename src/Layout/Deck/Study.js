import React, { useEffect, useState } from "react";
import NavBar from "../Componets/NavBar";
import { readDeck } from "../../utils/api/index";
import { useParams, Link, useHistory } from "react-router-dom";
import Button from "../Componets/Button";

const StudyDeck = () => {
  // This will read the deck from the API and set as Params

  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const deckId = useParams().deckId;
  const history = useHistory();
  const [cardIndex, setCardIndex] = useState(0);
  const [cardAnswer, setCardAnswer] = useState(false);

  //   console.log("deckid", "deckId", "cardId", cardId);

  useEffect(() => {
    async function loadDecks() {
      try {
        const response = readDeck(deckId);
        const decksFromAPI = await response;
        setDeck(decksFromAPI);
        setCards(decksFromAPI.cards);
      } catch (error) {
        console.log("Load deck error: ", error);
      }
    }
    loadDecks();
  }, [deckId]);

  // This function will handle flipping the cards
  const flipCardHandler = (event) => {
    if (cardAnswer === true) {
      setCardAnswer(false);
    } else {
      setCardAnswer(true);
    }
  };
  // This function will handle switching to the next card
  const nextCardHandler = (event) => {
    if (cardIndex + 1 === cards.length) {
      if (
        window.confirm(
          "You've reached the end of this deck. Restart cards? Or click 'cancel' to return to the home page."
        )
      ) {
        console.log("reset index");
        setCardIndex(0);
        setCardAnswer(false);
        console.log("card index", cardIndex);
      } else {
        history.push("/");
      }
    } else {
      setCardIndex(cardIndex + 1);
      setCardAnswer(false);
    }
  };

  //If there are less than 3 cards. redirect to create a card

  if (cards.length < 3) {
    return (
      <div>
        <NavBar deck={deck} navType="Study" />
        <h2>Study: {deck.name}</h2>
        <p />
        <h3>Not enough cards.</h3>
        <p>You need at least 3 cards to study.</p>

        <Link to={`/decks/${deck.id}/cards/new`}>
          <Button btnStyle="primary" icon="plus" text="Add Cards" />
        </Link>
      </div>
    );
  }
  //Show the back of the card
  else {
    if (cardAnswer) {
      return (
        <div>
          <NavBar deck={deck} navType="Study" />
          <h2>Study: {deck.name}</h2>
          <p />
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h5 className="card-title">
                  Card {cardIndex + 1} of {cards.length}
                </h5>
                <p className="card-text">{cards[cardIndex].back}</p>
                <div className="d-flex flex-gap-2">
                  <Button
                    btnStyle="secondary"
                    icon=""
                    text="Flip"
                    action={flipCardHandler}
                  />
                  <Button
                    btnStyle="primary"
                    icon=""
                    text="Next"
                    action={nextCardHandler}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <NavBar deck={deck} navType="Study" />
        <h2>Study: {deck.name}</h2>
        <p />

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {cardIndex + 1} of {cards.length}
            </h5>
            <p className="card-text">{cards[cardIndex].front}</p>
            <Button
              btnStyle="secondary"
              icon=""
              text="Flip"
              action={flipCardHandler}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default StudyDeck;