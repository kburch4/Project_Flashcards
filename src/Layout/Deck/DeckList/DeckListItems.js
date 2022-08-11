import React from "react";
import Button from "../../Componets/Button";
import { Link } from "react-router-dom";

const DeckListItem = ({ onDelete, description, name, cards, id }) => {
  console.log("id", id, cards);

  //This is our home page design/layout
  //All buttons needed for DeckList will be in here linked
  return (
    <>
      <div className="card m-2">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="card-title">{name}</h2>
          <div className="card-text text-right">{cards.length} cards</div>
        </div>
        <div className="card-body">
          <div className="card-text m-2">{description}</div>
          <div className="d-flex flex-gap-2">
            <Link to={`/decks/${id}/study`}>
              <Button btnStyle="primary" icon="book" text="Study" />
            </Link>
            <Link to={`/decks/${id}`}>
              <Button btnStyle="secondary" icon="eye" text="View" />
            </Link>
            <Button
              btnStyle="danger"
              extraStyles="ml-auto"
              icon="trash"
              text=""
              action={onDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeckListItem;