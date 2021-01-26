import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

// Import CSS modules
import SearchCSS from "../unique/search.module.css";

// import function
import { searched } from "../../utils/components/unique/searchUtil";

// Import FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import Contexts
import NavbarIconContext from "../../contexts/NavbarIconContext";
import { AuthContext } from "../../routes/auth";

export default function SearchBlock(props) {
  const { workSpaces, setWorkSpaces } = useContext(NavbarIconContext);
  const { user } = useContext(AuthContext);
  const history = useHistory();

  return (
    <div
      key={props.mapIdx ? props.mapIdx.key + props.mapIdx.key : ""}
      className={`${SearchCSS.recentSearches}`}
      onClick={
        props.onClick
          ? props.onClick
          : () => {
              searched(
                user,
                props.userTyping,
                props.setUserRecentSearches,
                workSpaces,
                setWorkSpaces,
                history,
                props.userTyping
              );
            }
      }
    >
      <FontAwesomeIcon className={`${SearchCSS.reuseIcon}`} icon={props.faIcon}></FontAwesomeIcon>
      {props.userTyping ? (
        <h5 className={`${SearchCSS.searchText}`}>{props.userTyping}</h5>
      ) : (
        <h5 className={`${SearchCSS.searchText}`}>{props.mapIdx.searched}</h5>
      )}
    </div>
  );
}
