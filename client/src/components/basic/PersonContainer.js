import React, { useContext } from "react";
import axios from "axios";

// Import FontAwesomeStuff
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import CSS modules
import CSS from "../unique/peopleFinder.module.css";
import FeedCSS from "../unique/feed.module.css";
import gStyle from "../../general.module.css";

// import Context
import { AuthContext } from "../../routes/auth";

export default function PersonContainer(props) {
  const { user } = useContext(AuthContext);

  const sendFriendReq = async (otherUserData) => {
    // console.log("putting the sendFriendReq here");
    await axios.post("/api/friends/makeFriendReq", {
      sender: user,
      receiver: otherUserData
    }).then(data => console.log(data))
  };

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
        <div
          className={`${gStyle.alignCenterSelf} ${CSS.addFriendBtn}`}
          onClick={() => {
            sendFriendReq(props.mapIdx);
          }}
        >
          Add Friend
        </div>
      </div>
      <h6 className={`${FeedCSS.offWhite}`}>{props.mapIdx.post}</h6>
    </div>
  );
}
