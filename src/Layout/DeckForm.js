import React from "react";

const DeckForm = ({ formData, handleChange }) => {
  return (
    <div>
      <label>Name:</label>
      <input
        id="name"
        type="text"
        name="name"
        className="w-100 mb-3 p-2"
        placeholder="Deck Name"
        onChange={handleChange}
        value={formData.name}
      />
      <label>Description:</label>
      <textarea
        id="description"
        type="textarea"
        name="description"
        rows="3"
        className="w-100 mb-3 p-2"
        placeholder="Brief description of the deck"
        onChange={handleChange}
        value={formData.description}
      />
    </div>
  );
};
export default DeckForm;
