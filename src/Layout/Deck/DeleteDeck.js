import React from "react";
import { deleteDeck } from "../../utils/api/index";
import Button from "../Componets/Button";

//Delete deck handler function
const DeleteDeck = ({ deck }) => {
  const deleteHandler = () => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      deleteDeck(deck.id);
      window.location.reload();
    }
  };

return (
    //Delete button
    <div className="d-flex justify-content-end">
      <Button
        btnStyle="danger"
        extraStyles="ml-auto"
        icon="trash"
        text=""
        action={deleteHandler}
      />
    </div>
  );
};

export default DeleteDeck;
