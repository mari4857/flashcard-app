import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  readDeck,
  deleteDeck,
  deleteCard,
  listCards,
} from "../utils/api/index";

function Deck() {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState({});
  const params = useParams();
  const deckId = params.deckId;

  useEffect(() => {
    setCards({});
    async function loadData() {
      try {
        const response = await readDeck(deckId);
        // console.log(response);
        setDeck(response);
        setCards(response.cards);
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

  const history = useHistory();

  const handleDeckDelete = async () => {
    const result = window.confirm(
      `Delete deck ID ${deckId}? You will not be able to recover it.`
    );
    if (result) {
      async function deleteData() {
        try {
          await deleteDeck(deckId);
          history.push("/");
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Aborted");
          } else {
            throw error;
          }
        }
      }
      deleteData();
    }
  };

  const handleCardDelete = async ({ target }) => {
    const value = target.value;

    const result = window.confirm(
      `Delete card ID ${value}? You will not be able to recover it.`
    );
    if (result) {
      async function deleteData() {
        try {
          await deleteCard(value);
          const response = await listCards(deckId);
          // console.log(deckId, response);
          setCards(response);
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Aborted");
          } else {
            throw error;
          }
        }
      }
      deleteData();
    }
  };

  if (cards.length > 0) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" key="0">
              <Link to="/">
                <i className="oi oi-home" style={{ paddingRight: "5px" }}></i>
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page" key="1">
              {deck.name}
            </li>
          </ol>
        </nav>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <div className="row justify-content-between">
          <div className="col-8">
            <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">
              <i className="oi oi-pencil" style={{ paddingRight: "5px" }}></i>
              Edit
            </Link>{" "}
            &nbsp;
            <Link to={`/decks/${deckId}/study`} className="btn btn-primary">
              <i className="oi oi-book" style={{ paddingRight: "5px" }}></i>
              Study
            </Link>{" "}
            &nbsp;
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
              <i className="oi oi-plus" style={{ paddingRight: "5px" }}></i>
              Add Cards
            </Link>
          </div>
          <div className="col-2">
            <button onClick={handleDeckDelete} className="btn btn-danger">
              <i className="oi oi-trash" style={{ paddingRight: "5px" }}></i>
              Delete
            </button>
          </div>
        </div>
        <br />
        <h2>Cards</h2>
        <br />
        {cards.map((card) => (
          <div key={card.id} className="card">
            <div className="card-body">
              <div className="container">
                <div className="row justify-content-start mb-3">
                  <div className="col-6">{card.front}</div>
                  <div className="col-6">{card.back}</div>
                </div>
                <div className="row">
                  <div className="col-9"></div>
                  <div className="col-3 text-right">
                    <Link
                      to={`/decks/${deckId}/cards/${card.id}/edit`}
                      className="btn btn-secondary"
                      style={{ marginRight: "10px" }}
                    >
                      <i
                        className="oi oi-pencil"
                        style={{ paddingRight: "5px" }}
                      ></i>
                      Edit
                    </Link>
                    <button
                      onClick={handleCardDelete}
                      value={card.id}
                      className="btn btn-danger"
                    >
                      <i
                        className="oi oi-trash"
                        style={{ paddingRight: "5px" }}
                      ></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item" key="0">
                <Link to="/">
                  <i className="oi oi-home" style={{ paddingRight: "5px" }}></i>
                  Home
                </Link>
              </li>
              <li
                className="breadcrumb-item active"
                aria-current="page"
                key="1"
              >
                {deck.name}
              </li>
            </ol>
          </nav>
          <h3>{deck.name}</h3>
          <p>{deck.description}</p>
          <div className="row justify-content-between">
            <div className="col-8">
              <Link
                to={`/decks/${deckId}/edit`}
                className="btn btn-secondary"
                style={{ marginRight: "10px" }}
              >
                <i className="oi oi-pencil" style={{ paddingRight: "5px" }}></i>
                Edit
              </Link>
              <Link
                to={`/decks/${deckId}/study`}
                className="btn btn-primary"
                style={{ marginRight: "10px" }}
              >
                <i className="oi oi-book" style={{ paddingRight: "5px" }}></i>
                Study
              </Link>
              <Link
                to={`/decks/${deckId}/cards/new`}
                className="btn btn-primary"
              >
                <i className="oi oi-plus" style={{ paddingRight: "5px" }}></i>
                Add Cards
              </Link>
            </div>
            <div className="col-2">
              <button onClick={handleDeckDelete} className="btn btn-danger">
                <i className="oi oi-trash" style={{ paddingRight: "5px" }}></i>
                Delete
              </button>
            </div>
          </div>
          <br />
          <h2>No Cards, Please add some.</h2>
        </div>
      </div>
    );
  }
}

export default Deck;
