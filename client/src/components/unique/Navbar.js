import React, { useState, useContext, useEffect } from "react";

// Import CSS Modules
import gStyle from "../../general.module.css";
import CSS from "./navbar.module.css";

// Import basic components
import IconBtn from "../basic/IconBtn";

// FontAwesome Stuff
import { faHome, faComment, faCog, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import Context
import NavbarIconContext from "../../utils/NavbarIconContext";

// I need function that changes the icon of the search thing to an actual input bar

export default function Navbar() {
  const { workSpaces, setWorkSpaces } = useContext(NavbarIconContext);
  useEffect(() => {
    console.log(workSpaces);
  });
  return (
    <div className={`${gStyle.flex} ${gStyle.flexRow} ${CSS.navbar}`}>
      <IconBtn className={CSS.icon}>
        <FontAwesomeIcon
          icon={faSearch}
          onClick={() => {
            setWorkSpaces({
              search: true,
              home: false,
              chat: false,
              settings: false,
            });
          }}
        />
      </IconBtn>
      <IconBtn className={CSS.icon}>
        <FontAwesomeIcon
          icon={faHome}
          onClick={() => {
            setWorkSpaces({
              search: false,
              home: true,
              chat: false,
              settings: false,
            });
          }}
        />
      </IconBtn>
      <IconBtn className={CSS.icon}>
        <FontAwesomeIcon
          icon={faComment}
          onClick={() => {
            setWorkSpaces({
              search: false,
              home: false,
              chat: true,
              settings: false,
            });
          }}
        />
      </IconBtn>
      <IconBtn className={CSS.icon}>
        <FontAwesomeIcon
          icon={faCog}
          onClick={() => {
            setWorkSpaces({
              search: false,
              home: false,
              chat: false,
              settings: true,
            });
          }}
        />
      </IconBtn>
    </div>
  );
}
