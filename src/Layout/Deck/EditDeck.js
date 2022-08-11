import React, { useEffect, useState } from "react";
import { readDeck, updateDeck } from "../../utils/api/index";
import { Link, useParams, useHistory } from "react-router-dom";
import NavBar from "../Componets/NavBar";
import Button from "../Componets/Button";

const EditDeck = () => {
  const history = useHistory();

  const deckId = useParams().deckId;
  const [deck, setDeck] = useState([]);

  //This for when our information is changes with our default set at deckId
  useEffect(() => {
    async function readDecks() {
      try {
        const response = readDeck(deckId);
        const decksFromAPI = await response;
        setDeck(decksFromAPI);
      } catch (error) {
        console.log("Read deck error: ", error);
      }
    }
    readDecks();
  }, [deckId]);

  const changeNameHandler = (event) => {
    setDeck({ ...deck, name: event.target.value });
  };

  const changeDescriptionHandler = (event) => {
    setDeck({ ...deck, description: event.target.value });
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    await updateDeck(deck);
    history.push(`/decks/${deck.id}`);
  };

  return (
    //Form is created for our edit deck
    <div>
      <NavBar deck={deck} navType="Edit Deck" />

      <h2>Edit Deck</h2>
      <p />

      <form onSubmit={submitFormHandler}>
        <div className="mb-3">
          <label>
            <h4>Name</h4>
          </label>
          <textarea
            className="form-control"
            name="name"
            id="name"
            value={deck.name}
            onChange={changeNameHandler}
          ></textarea>
        </div>

        <div className="mb-3">
          <label>
            <h4>Description</h4>
          </label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            value={deck.description}
            onChange={changeDescriptionHandler}
          ></textarea>
        </div>
      </form>
      <div className="d-flex flex-gap-2">
        <Link to="/">
          <Button btnStyle="secondary" icon="" text="Cancel" />
        </Link>
        <Link to="/decks/:deckId">
          <Button btnStyle="primary" icon="" text="Submit" />
        </Link>
      </div>
    </div>
  );
};

export default EditDeck;