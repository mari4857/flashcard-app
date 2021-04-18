import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api/index";

function Decks() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDecks() {
      try {
        const response = await listDecks(abortController.signal);
        setDecks(response);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("loadDecks Aborted");
        } else {
          throw error;
        }
      }
    }
    loadDecks();
    return () => abortController.abort();
  }, []);

  if (decks.length > 0) {
    return (
      <div>
        {decks.map((deck) => (
          <div key={deck.id} className="card" style={{ marginBottom: "10px" }}>
            <div className="container">
              <div className="row card-header align-items-center">
                <div className="col-10">
                  <h4 className="mb-0">{deck.name}</h4>
                </div>
                <div className="col-2 text-right">
                  <p className="mb-0"> {deck.cards.length} cards</p>
                </div>
              </div>
            </div>
            <div className="card-body">
              <p className="card-text">{deck.description}</p>
              <div className="container">
                <div className="row justify-content-between">
                  <div className="col-4">
                    <Link
                      to={`decks/${deck.id}`}
                      className="btn btn-secondary"
                      style={{ marginRight: "10px" }}
                    >
                      <i
                        className="oi oi-eye"
                        style={{ paddingRight: "5px" }}
                      ></i>
                      View
                    </Link>
                    <Link
                      to={`decks/${deck.id}/study`}
                      className="btn btn-primary"
                    >
                      <i
                        className="oi oi-book"
                        style={{ paddingRight: "5px" }}
                      ></i>
                      Study
                    </Link>
                  </div>
                  <div className="col-1">
                    <button
                      className="btn btn-danger"
                      value={deck.id}
                      // TODO handleDelete
                      // onClick={handleDelete}
                    >
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
  }
  return "Please add a deck.";
}

export default Decks;
