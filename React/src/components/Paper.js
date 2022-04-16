import React from "react";
import graphicalAbstarct from "../images/graphical_abstract.jpg";

const Paper = () => {
  return (
    <div className="ui row centered">
      <div className="sixteen wide column" style={{ textAlign: "center" }}>
        <h1>Graphical Abstract</h1>
      </div>
      <div className="ten wide column">
        <img
          src={graphicalAbstarct}
          alt="Graphical Abstract"
          onClick={() =>
            window.open(
              "https://www.biorxiv.org/content/10.1101/2021.05.25.445601v3.full.pdf"
            )
          }
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default Paper;
