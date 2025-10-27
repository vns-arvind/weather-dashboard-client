import React from "react";

export default function DefaultLocation({ city, onSetDefault }) {
  return (
    <div>
      <p>Default City: {city}</p>
      <button onClick={onSetDefault}>Set as default</button>
    </div>
  );
}
