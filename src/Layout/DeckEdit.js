import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import DeckForm from "./DeckForm";
import { readDeck, updateDeck } from "../utils/api/index";

function DeckEdit() {
  const initialFormState = {
    name: "",
    description: "",
  };
  const [deck, setDeck] = useState({ ...initialFormState });
  const params = useParams();
  const deckId = params.deckId;

  useEffect(() => {
    async function loadData() {
      try {
        const response = await readDeck(deckId);
        setDeck(response);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadData();
  }, [deckId]);

  const handleChange = ({ target }) => {
    const value = target.value;
    setDeck({
      ...deck,
      [target.name]: value,
    });
  };

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log("Submitted:", deck);
    async function updateData() {
      try {
        await updateDeck(deck);
        history.push(`/decks/${deckId}`);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    updateData();
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="oi oi-home" style={{ paddingRight: "5px" }}></i>
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>Deck Name</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h2>Edit Deck</h2>
      <form onSubmit={handleSubmit}>
        <DeckForm formData={deck} handleChange={handleChange} />
        <Link
          to={`/decks/${deckId}`}
          className="btn btn-secondary"
          style={{ marginRight: "10px" }}
        >
          Cancel
        </Link>
        <button type="submit" value="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default DeckEdit;
