import React from "react";

// Import CSS modules
import FeedCSS from "../unique/feed.module.css";

// Import FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PostBlock(props) {
  if (props.mapIdx) {
    console.log(props.mapIdx.timeStamp);
  }
  return (
    <div>
      <div key={props.mapIdx.timeStamp} className={`${FeedCSS.feedPost}`}>
        <div className={`${FeedCSS.userData}`}>
          <FontAwesomeIcon
            className={`${FeedCSS.userProfilePlaceholder}`}
            icon={props.faIcon}
          ></FontAwesomeIcon>
          <div className={`${FeedCSS.userNameAndTime}`}>
            <h6 className={`${FeedCSS.offWhite}`}>{props.mapIdx.user}</h6>
            <h6 className={`${FeedCSS.offWhite}`}>{props.mapIdx.timeStampSmall}</h6>
          </div>
        </div>
        <h6 className={`${FeedCSS.offWhite}`}>{props.mapIdx.post}</h6>
      </div>
    </div>
  );
}
