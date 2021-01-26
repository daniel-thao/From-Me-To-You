import React from "react";

// Import FontAwesomeStuff
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import CSS modules
import CSS from "../unique/peopleFinder.module.css"
import FeedCSS from "../unique/feed.module.css";
import gStyle from "../../general.module.css";

export default function PersonContainer(props) {
  return (
    <div key={props.mapIdx.timeStamp} className={`${FeedCSS.feedPost}`}>
      <div className={`${CSS.userData}`}>
        <FontAwesomeIcon
          className={`${FeedCSS.userProfilePlaceholder}`}
          icon={props.faIcon}
        ></FontAwesomeIcon>
        <div className={`${FeedCSS.userNameAndTime}`}>
          <h6 className={`${FeedCSS.offWhite}`}>{props.mapIdx.username}</h6>
        </div>
        <div className={`${gStyle.flexGrow} ${gStyle.alignCenterSelf}`}></div>
        <div className={`${gStyle.alignCenterSelf}`}>Add Friend</div>
      </div>
      <h6 className={`${FeedCSS.offWhite}`}>{props.mapIdx.post}</h6>
    </div>
  );
}
