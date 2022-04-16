import React, { useState } from "react";
import Entropy from "./Entropy";
import Dropdown from "./Dropdown";
let count = 0;

const EntropyToggler = ({ entropies, options }) => {
  console.log(entropies);
  const [select1, onSelect1] = useState("India");
  const [select2, onSelect2] = useState("Brazil");
  let style = "";
  let entropy1, entropy2;

  const renderList = (fontSize) => {
    const renderedList = entropies.map((entropy) => {
      if (entropy.country === select1) {
        style = "active red";
        entropy1 = { ...entropy };
      } else if (entropy.country === select2) {
        style = "active blue";
        entropy2 = { ...entropy };
      } else style = "";
      return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <div
          key={entropy.country}
          className={`${style} item`}
          style={{ fontSize: `${fontSize}` }}
          onClick={() => {
            if (
              count % 2 === 0 &&
              entropy.country !== select1 &&
              entropy.country !== select2
            ) {
              onSelect1(entropy.country);
              count = (count + 1) % 2;
            } else if (
              count % 2 !== 0 &&
              entropy.country !== select2 &&
              entropy.country !== select1
            ) {
              onSelect2(entropy.country);
              count = (count + 1) % 2;
            }
          }}
        >
          {entropy.country}
        </div>
      );
    });

    return renderedList;
  };

  return (
    <>
      <div
        className="ui mobile only row centered"
        style={{ paddingTop: "50px" }}
      >
        <div>
          <Dropdown
            selection={select1}
            onSelect={onSelect1}
            options={options}
            label={"Select the first one"}
          />
          <Dropdown
            selection={select2}
            onSelect={onSelect2}
            options={options}
            label={"Select the second one"}
          />
        </div>
      </div>
      <div
        className="ui computer tablet only row centered"
        style={{ paddingTop: "30px" }}
      >
        <div>
          <div className="ui inverted menu">{renderList("14px")}</div>
        </div>
      </div>
      <div className="ui row centered" style={{ marginTop: "-25px" }}>
        <div className="centered ten wide column">
          <Entropy selection1={entropy1} selection2={entropy2} />
        </div>
      </div>
    </>
  );
};

export default EntropyToggler;
