import React from "react";

const CardForm = ({ formData, handleChange }) => {
  return (
    <div>
      <label>Front:</label>
      <textarea
        id="front"
        type="text"
        name="front"
        rows="3"
        className="w-100 mb-3 p-2"
        onChange={handleChange}
        value={formData.front}
      />
      <label>Back:</label> <br />
      <textarea
        id="back"
        type="textarea"
        name="back"
        rows="3"
        className="w-100 mb-3 p-2"
        onChange={handleChange}
        value={formData.back}
        style={{ width: "100%" }}
      />
    </div>
  );
};
export default CardForm;
