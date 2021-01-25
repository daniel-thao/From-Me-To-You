import React from "react";

// Import CSS modules
import SearchCSS from "../unique/search.module.css";

// Import FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchBlock(props) {
  // if (props.mapIdx) {
  //   console.log(props.mapIdx.key);
  // }
  return (
    <div>
      <div
        key={props.mapIdx ? props.mapIdx.key + props.mapIdx.key : ""}
        className={`${SearchCSS.recentSearches}`}
        onClick={props.onClick ? props.onClick : () => console.log("")}
      >
        <FontAwesomeIcon className={`${SearchCSS.reuseIcon}`} icon={props.faIcon}></FontAwesomeIcon>
        {props.userTyping ? (
          <h5 className={`${SearchCSS.searchText}`}>{props.userTyping}</h5>
        ) : (
          <h5 className={`${SearchCSS.searchText}`}>{props.mapIdx.searched}</h5>
        )}
      </div>
    </div>
  );
}
