import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Import CSS Modules
import gStyle from "../../general.module.css";
import CSS from "./navbar.module.css";

// Import basic components
import IconBtn from "../basic/IconBtn";

// FontAwesome Stuff
import {
  faHome,
  faComment,
  faCog,
  faSearch,
  faStreetView,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import Context
import NavbarIconContext from "../../contexts/NavbarIconContext";
import { AuthContext } from "../../routes/auth";

// I need function that changes the icon of the search thing to an actual input bar

export default function Navbar() {
  const { workSpaces, setWorkSpaces } = useContext(NavbarIconContext);
  const { user } = useContext(AuthContext);

  const history = useHistory();

  return (
    <div
      className={`${gStyle.flex} ${gStyle.flexRow} ${CSS.navbar} ${
        workSpaces.search ? gStyle.zIndex : CSS.nothing
      }`}
    >
      <IconBtn className={CSS.icon}>
        <FontAwesomeIcon
          icon={faSearch}
          onClick={() => {
            setWorkSpaces({
              ...workSpaces,
              search: true,
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
              isSearchingHome: true,
              chat: false,
              isSearchingChat: false,
              settings: false,
              isSearchingSettings: false,
              peopleFinder: false,
              isSearchingPF: false,
              userProfile: false,
              isOnUP: false,
            });
            history.push(`/frommetoyou/`);
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
              isSearchingHome: false,
              chat: true,
              isSearchingChat: true,
              settings: false,
              isSearchingSettings: false,
              peopleFinder: false,
              isSearchingPF: false,
              userProfile: false,
              isOnUP: false,
            });
            history.push(`/frommetoyou/`);
          }}
        />
      </IconBtn>
      <IconBtn className={CSS.icon}>
        <FontAwesomeIcon
          icon={faStreetView}
          onClick={() => {
            setWorkSpaces({
              search: false,
              home: false,
              isSearchingHome: false,
              chat: false,
              isSearchingChat: false,
              settings: false,
              isSearchingSettings: false,
              peopleFinder: false,
              isSearchingPF: false,
              userProfile: false,
              isOnUP: true,
            });
            history.push(`/frommetoyou/${user.name}`);
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
              isSearchingHome: false,
              chat: false,
              isSearchingChat: false,
              settings: true,
              isSearchingSettings: true,
              peopleFinder: false,
              isSearchingPF: false,
              userProfile: false,
              isOnUP: false,
            });
            history.push(`/frommetoyou/`);
          }}
        />
      </IconBtn>
    </div>
  );
}
