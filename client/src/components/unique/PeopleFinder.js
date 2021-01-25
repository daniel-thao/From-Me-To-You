import React, { useEffect, useState } from "react";

// Import CSS
import gStyle from "../../general.module.css";
import CSS from "./peopleFinder.module.css";

export default function PeopleFinder({ className }) {
  useEffect(() => {
    console.log("People Finder Page");
  }, []);
  // I think I should have the axios call here just like the feed
  return (
    <div
      className={`${className} ${gStyle.flex} ${gStyle.flexRow} ${gStyle.maxHeight} ${CSS.background}`}
    >
      <div
        className={`${gStyle.flex} ${gStyle.flexCenter} ${gStyle.topMarginXL} ${CSS.background}`}
      >
        <div>People Finding</div>
      </div>
    </div>
  );
}
