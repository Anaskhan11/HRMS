import React from "react";

const IsScrollable = ({ children }) => {
  return (
    <div
      style={{
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className="h-full"
    >
      {children}
      <style>
        {`
          ::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default IsScrollable;
