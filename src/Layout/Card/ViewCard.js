import React, { useEffect, useState } from "react";
import { createCard, updateCard } from "../../utils/api/index";
import { Link } from "react-router-dom";
import Button from "../Componets/Button";

const Form = ({ cardFront, cardBack, id, deckId, formType }) => {
  const [card, setCard] = useState({});

  useEffect(() => {
    setCard({ id, deckId, front: cardFront, back: cardBack });
  }, [id, deckId, cardFront, cardBack]);

  const changeFrontHandler = (event) => {
    setCard({ ...card, front: event.target.value });
  };

  const changeBackHandler = (event) => {
    setCard({ ...card, back: event.target.value });
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();

    // add card or update card
    if (formType === "Add Card") {
      await createCard(deckId, card);
    } else {
      await updateCard(card);
    }

    window.location.reload();
  };
  // Form for adding a card
  return (
    <div>
      <form onSubmit={submitFormHandler}>
        <div className="mb-3">
          <label>
            <h4>Front</h4>
          </label>
          <textarea
            className="form-control"
            name="front"
            id="front"
            value={card.front}
            onChange={changeFrontHandler}
          ></textarea>
        </div>

        <div className="mb-3">
          <label>
            <h4>Back</h4>
          </label>
          <textarea
            className="form-control"
            name="back"
            id="back"
            value={card.back}
            onChange={changeBackHandler}
          ></textarea>
        </div>
        <div className="d-flex flex-gap-2">
          <Link to={"/"}>
            <Button btnStyle="secondary" icon="" text="Cancel" />
          </Link>
          <Button btnStyle="primary" icon="" text="Submit" />
        </div>
      </form>
    </div>
  );
};

export default Form;