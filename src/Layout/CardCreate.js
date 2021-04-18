import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";
import CardForm from "./CardForm";

function CardCreate() {
  const [deck, setDeck] = useState([]);
  const params = useParams();
  const deckId = params.deckId;

  const initialFormState = {
    front: "",
    back: "",
    deckId,
  };

  const handleChange = ({ target }) => {
    const value = target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  useEffect(() => {
    async function loadData() {
      try {
        const response = await readDeck(deckId);
        setDeck(response);
      } catch (error) {
        if (error.name === "AbortError") {
          // Ignore `AbortError`
        } else {
          throw error;
        }
      }
    }
    loadData();
  }, [deckId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Submitted:", formData);
    async function updateData() {
      try {
        await createCard(deckId, formData);
        setFormData(initialFormState);
      } catch (error) {
        if (error.name === "AbortError") {
          // Ignore `AbortError`
        } else {
          throw error;
        }
      }
    }
    updateData();
  };

  if (deck) {
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
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Card
            </li>
          </ol>
        </nav>
        <br />
        <h2>{deck.name}: Add Card</h2>
        <form onSubmit={handleSubmit}>
          <CardForm formData={formData} handleChange={handleChange} />
          <Link
            to={`/decks/${deckId}`}
            className="btn btn-secondary"
            style={{ marginRight: "10px" }}
          >
            Done
          </Link>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  } else {
    return "Loading...";
  }
}

export default CardCreate;
