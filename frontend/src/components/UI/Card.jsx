import React from "react";

export default function Card({ title, children }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg shadow-purple-100">
      {title && <h3 className="text-xl font-semibold text-gray-800 ml-5 mt-1">{title}</h3>}
      <div>{children}</div>
    </div>
  );
}
