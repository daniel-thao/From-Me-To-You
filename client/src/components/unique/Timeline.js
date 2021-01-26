import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

// Import module Css
import CSS from "../../pages/userProfile.module.css";
import gStyle from "../../general.module.css";

// Import Contexts
import NavbarIconContext from "../../contexts/NavbarIconContext";
import { AuthContext } from "../../routes/auth";

// Import Basic Components
import PostBlock from "../basic/PostBlock";

// Import Func Utils
import { compare } from "../../utils/components/unique/feedUtil";

// Import FontAwesome Stuff
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserProfile() {
  const { workSpaces } = useContext(NavbarIconContext);

  const { user } = useContext(AuthContext);

  const [postsByUser, setPostsByUser] = useState([]);
  const [showUserData, setShowUserData] = useState(false);

  useEffect(async () => {
    if (workSpaces.isOnUP) {
      setShowUserData(true);
    }

    await axios.post("/api/users/genUserPost", { jwt: user }).then(async (userPost) => {
      const arrBasedOnTimeCreated = userPost.data.sort(compare).reverse();

      for (let i = 0; i < arrBasedOnTimeCreated.length; i++) {
        arrBasedOnTimeCreated[i].timeStampSmall = arrBasedOnTimeCreated[i].timeStamp.substring(
          11,
          16
        );
      }

      setPostsByUser(arrBasedOnTimeCreated);
    });
    console.log(postsByUser);
  }, [workSpaces.isOnUP]);

  return (
    <div className={`${gStyle.flex} ${gStyle.flexCenter} ${gStyle.maxHeight} ${CSS.background} ${gStyle.scrollY}`}>
      <div className={`${gStyle.topPaddingXL} ${gStyle.flexColumn} ${CSS.background} `}>
        <FontAwesomeIcon
          icon={faUserCircle}
          className={`${CSS.profilePic} ${gStyle.alignCenterSelf}`}
        ></FontAwesomeIcon>
        <h1 className={`${gStyle.alignCenterSelf}`}>
          {workSpaces.currentSearch === undefined ? user.name : ""}
        </h1>

        <div
          className={`${gStyle.flex} ${gStyle.flexCenter} ${CSS.postsAndFriends} ${CSS.background}`}
        >
          <div className={`${gStyle.flexColumn} ${CSS.userFriends}`}> Friends</div>
          <div className={`${gStyle.flexColumn} ${gStyle.flexGrow} ${CSS.userPosts}`}>
            {showUserData && postsByUser.length > 0 ? (
              postsByUser.map((index) => (
                <PostBlock mapIdx={index} faIcon={faUserCircle}></PostBlock>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
