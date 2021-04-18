import React from "react";
import { Link } from "react-router-dom";
import Decks from "./Decks";

function Home() {
  return (
    <div>
      <Link
        to="/decks/new"
        className="btn btn-secondary"
        style={{ marginBottom: "10px" }}
      >
        <i className="oi oi-plus" style={{ paddingRight: "5px" }}></i>
        Create Deck
      </Link>
      <Decks />
    </div>
  );
}

export default Home;
