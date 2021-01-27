import React, {useContext} from "react";
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
  // console.log(props.mapIdx);
  return (
    <div
      key={props.mapIdx}
      className={`${searchCSS.recentSearches}`}
      onClick={() => {
        console.log(props.mapIdx);
        searched(
          user,
          props.userTyping,
          props.setUserRecentSearches,
          workSpaces,
          setWorkSpaces,
          history,
          props.mapIdx
        );
        setWorkSpaces({
          ...workSpaces,
          search: false,
          currentSearch: props.mapIdx,
          peopleFinder: true,
          isSearchingChat: false,
          isSearchingHome: false,
          isSearchingSettings: false,
          isSearchingPF: true,
        });
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