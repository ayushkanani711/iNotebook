import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext.jsx";

const Alert = () => {
  const context = useContext(noteContext);
  const { alert } = context;

  const capitalize = (word) => {
    if(word === 'danger'){ word = 'error'}
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
      // console.log();
    <div style={{ height: "50px" }}>
      {alert && (
        <div className={`alert alert-primary alert-${alert.type}`} role="alert">
          <strong>{capitalize(alert.type)}</strong>: {alert.msg} 
        </div>
      )}
    </div>
  );
};

export default Alert;
