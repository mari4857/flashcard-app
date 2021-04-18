import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import DeckForm from "./DeckForm";
import { createDeck } from "../utils/api/index";

function DeckCreate() {
  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    const value = target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Submitted:", formData);
    async function updateData() {
      try {
        const output = await createDeck(formData);
        history.push(`/decks/${output.id}`);
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
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <br />
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <DeckForm formData={formData} handleChange={handleChange} />
        <Link
          to="/"
          className="btn btn-secondary"
          style={{ marginRight: "10px" }}
        >
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default DeckCreate;
