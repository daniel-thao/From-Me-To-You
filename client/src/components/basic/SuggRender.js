import React from "react";

// import CSS modules
import searchCSS from "../unique/search.module.css";

// Import FontAwesome
import { faHandPointRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// I need functions that set the feed with the posts from other users
export default function SuggRender(props) {
  return (
    <div id={props.id} className={props.className} onClick={props.onClick} value={props.value}>
      {props.suggestionsForUser.length > 0 ? (
        props.suggestionsForUser[props.counter].map(function (index) {
          return (
            <div key={index} className={`${searchCSS.recentSearches}`}>
              <FontAwesomeIcon
                className={`${searchCSS.chooseIcon}`}
                icon={faHandPointRight}
              ></FontAwesomeIcon>
              <h5 className={`${searchCSS.searchText}`}>{index}</h5>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}
