// Mascot.js
import React from "react";

function Mascot({ message }) {
  return (
    <div className="absolute bottom-10 left-[50%] transform -translate-x-1/2 text-center">
      <img src="/ziraffe.png" alt="Mascot" className="w-32 h-32 mb-2" />
      <p className="text-lg font-semibold text-gray-800">{message}</p>
    </div>
  );
}

export default Mascot;
