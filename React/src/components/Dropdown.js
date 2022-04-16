import React, { useEffect, useState, useRef } from "react";

const Dropdown = ({ selection, onSelect, options, label }) => {
  const [open, setOpen] = useState(false);
  // console.log(selection, options);

  const onBodyClick = (event) => {
    if (ref.current.contains(event.target)) return null;

    setOpen(false);
  };

  useEffect(() => {
    document
      .getElementsByTagName("body")[0]
      .addEventListener("click", onBodyClick, { capture: true });

    return () =>
      document
        .getElementsByTagName("body")[0]
        .removeEventListener("click", onBodyClick, { capture: true });
  }, []);

  const renderedList = options.map((option) => {
    if (option === selection) return null;
    return (
      <div key={option} onClick={() => onSelect(option)} className="item">
        {option}
      </div>
    );
  });
  const ref = useRef();
  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selection}</div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {renderedList}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
