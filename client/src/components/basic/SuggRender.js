import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

// import CSS modules
import searchCSS from "../unique/search.module.css";

// import functions
import { searched } from "../../utils/components/unique/searchUtil";

// Import context
import NavbarIconContext from "../../contexts/NavbarIconContext";
import { AuthContext } from "../../routes/auth";

// Import FontAwesome
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// I need functions that set the feed with the posts from other users
export default function SuggRender(props) {
  const { workSpaces, setWorkSpaces } = useContext(NavbarIconContext);
  const { user } = useContext(AuthContext);
  const history = useHistory();

  return (
    <div
      key={props.mapIdx}
      className={`${searchCSS.recentSearches}`}
      onClick={() => {
        searched(
          user,
          props.mapIdx,
          props.setUserRecentSearches,
          workSpaces,
          setWorkSpaces,
          history,
          props.mapIdx
        );
      }}
    >
      <FontAwesomeIcon
        className={`${searchCSS.chooseIcon}`}
        icon={faHandPointRight}
      ></FontAwesomeIcon>
      <h5 className={`${searchCSS.searchText}`}>{props.mapIdx}</h5>
    </div>
  );
}
