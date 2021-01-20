import React, { useState } from "react";

// Import CSS Modules
import gStyle from "../../general.module.css";
import CSS from "./setting.module.css";

// I need function that changes the icon of the search thing to an actual input bar

export default function Chat() {
  return (
    <div className={`${gStyle.flex} ${gStyle.flexRow} ${CSS.settingsContainer}`}>
      <div className={`${gStyle.maxHeight}`}>
        <div className={`${gStyle.topMarginXL}`}>
          <div className={`${CSS.optionsContainer} ${gStyle.flexColumn}`}>
            <div
              className={`${CSS.usernameChange}`}
              onClick={() => {
                console.log("username functionality");
              }}
            >
              <h4 className={`${gStyle.white} ${gStyle.textCenter} ${CSS.usernameText}`}>
                Username
              </h4>
            </div>
            <div
              className={`${CSS.pwChange}`}
              onClick={() => {
                console.log("username functionality");
              }}
            >
              <h4 className={`${gStyle.white} ${gStyle.textCenter} ${CSS.pwText}`}>Password</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
