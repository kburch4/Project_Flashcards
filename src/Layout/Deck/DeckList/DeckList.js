import { listDecks, deleteDeck } from "../../../utils/api";
import React, { useEffect, useState, useMemo } from "react";
import DeckListItem from "./DeckListItems";

// Creating abortController then having it memoizing for multiple functions.
const DeckList = () => {
  const [decks, setDecks] = useState([]);
  const abortController = useMemo(() => new AbortController(), []);
  useEffect(() => {
    async function fetchData() {
      const response = await listDecks(abortController.signal);
      setDecks(response);
    }
    // Clean up the  function
    fetchData();
    return () => abortController.abort();
  }, [abortController]);

  const onDeleteHandler = (id) => {
    if (window.confirm("Do you want to delete this deck?")) {
      deleteDeck(id, abortController.signal).then((r) =>
        setDecks(decks.filter((deck) => deck.id !== id))
      );
    }
  };

  return (
    //Mapping through our decks
    <div>
      {decks?.map((deck) => (
        <DeckListItem
          onDelete={() => onDeleteHandler(deck.id)}
          key={deck.id}
          {...deck} // deck={deck}
        />
      ))}
    </div>
  );
};

export default DeckList;