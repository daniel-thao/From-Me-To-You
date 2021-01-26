import React, { useContext, useEffect } from "react";

// Import module Css
import CSS from "./userProfile.module.css";
import gStyle from "../general.module.css";

// Import Contexts
import NavbarIconContext from "../contexts/NavbarIconContext";
import { AuthContext } from "../routes/auth";

// Import FontAwesome Stuff
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserProfile(props) {
  const { workSpaces, setWorkSpaces } = useContext(NavbarIconContext);
  const { user } = useContext(AuthContext);

  // useEffect(()=> {}, [])

  console.log(workSpaces);
  return (
    <div className={`${gStyle.flex} ${gStyle.flexCenter} ${gStyle.maxHeight} ${CSS.background}`}>
      <div className={`${gStyle.topPaddingXL} ${gStyle.flexColumn} ${CSS.background}`}>
        <FontAwesomeIcon icon={faUserCircle} className={`${CSS.profilePic} ${gStyle.alignCenterSelf}`}></FontAwesomeIcon>
        <h1 className={`${gStyle.alignCenterSelf}`}>{workSpaces.currentSearch === undefined ? user.name : ""}</h1>

        <div className={`${gStyle.flex} ${gStyle.flexCenter} ${CSS.postsAndFriends} ${CSS.background}`}>
          <div className={`${gStyle.flexColumn} ${CSS.userFriends}`}> Friends</div>
          <div className={`${gStyle.flexColumn} ${gStyle.flexGrow} ${CSS.userPosts}`}> Posts</div>
        </div>
      </div>
    </div>
  );
}
