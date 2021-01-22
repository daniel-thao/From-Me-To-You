import React, { useState, useContext } from "react";

// Import CSS Modules
import gStyle from "../../general.module.css";
import CSS from "./search.module.css";

// imoprt Unique Components
import Feed from "../unique/Feed";

// Import Contexts
import EditPostContext from "../../utils/EditPostContext";
import NavbarIconContext from "../../utils/NavbarIconContext";

// I need function that changes the icon of the search thing to an actual input bar

export default function Search({ className }) {
  const [userTyping, setUserTyping] = useState("");
  const { workSpaces, setWorkSpaces } = useContext(NavbarIconContext);

  return (
    <div className={`${className} ${CSS.searchWrapper}`}>
      <div
        className={`${CSS.overlay} ${workSpaces.search ? CSS.enableSearch : CSS.nothing}`}
        onClick={() => {
          setWorkSpaces({ ...workSpaces, search: false, home: true });
        }}
      ></div>

      <div className={`${CSS.searchContainer} ${gStyle.maxHeight}`}>
        <div className={`${gStyle.topMarginL}`}>
          <div className={`${CSS.searchResults}`}>
            <input
              className={CSS.searchBox}
              onChange={(e) => {
                setUserTyping(e.target.value);
              }}
              value={userTyping}
            ></input>
            {/* only one of these should be active at a time and these should be mappingng data from the Database*/}
            <div className={`${CSS.recentSearches}`}></div>
            <div className={`${CSS.suggestions}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
