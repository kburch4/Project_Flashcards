import React from "react";
import { useState } from "react";
import { createDeck } from "../../utils/api";
import { Link, useHistory } from "react-router-dom";
import NavBar from "../Componets/NavBar";
import Button from "../Componets/Button"

//default name and description for each new deck
const defaultState = {
    name: "Deck Name",
    description: "Description of the Deck"
};

//function to create a new deck
function CreateDeck(){
    const [deck, setDeck] = useState(defaultState)
    const history = useHistory();


const handleSubmit = async (event) => {
    event.preventDefault();
    await createDeck(deck);
    history.push("/");
};

    return (
        <div>

            <NavBar deck={deck} navType="Create Deck" />
            
            <h2>Create Deck</h2>

            <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder={deck.name}
            onChange={(e) => setDeck({ ...deck, name: e.target.value })}
          />
        </div>
        <br />
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <br />
          <textarea
            className="form-control"
            type="text"
            name="description"
            id="description"
            rows="6"
            placeholder={deck.description}
            onChange={(e) => setDeck({ ...deck, description: e.target.value })}
          ></textarea>
        </div>
        <div className="d-flex flex-gap-2">
          <Link to="/">
            <Button btnStyle="secondary" icon="" text="Cancel" />
          </Link>
          <Button btnStyle="primary" icon="" text="Submit" />
        </div>
      </form>
    </div>
  );
}

export default CreateDeck;