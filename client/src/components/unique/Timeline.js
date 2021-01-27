import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

// Import module Css
import CSS from "../../pages/userProfile.module.css";
import gStyle from "../../general.module.css";

// Import Contexts
import NavbarIconContext from "../../contexts/NavbarIconContext";
import OtherUserContext from "../../contexts/OtherUserContext";
import { AuthContext } from "../../routes/auth";

// Import Basic Components
import PostBlock from "../basic/PostBlock";
import UserFriendBlock from "../basic/UserFriendBlock";

// Import Func Utils
import { compare } from "../../utils/components/unique/feedUtil";

// Import FontAwesome Stuff
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserProfile() {
  const { workSpaces, setWorkSpaces } = useContext(NavbarIconContext);
  const { userFinder, setUserFinder } = useContext(OtherUserContext);

  const { user } = useContext(AuthContext);

  const [postsByUser, setPostsByUser] = useState([]);
  const [showUserData, setShowUserData] = useState(false);

  const [userFriends, setUserFriends] = useState([]);
  let whichUser;

  useEffect(async () => {
    console.log(userFriends);
    if (workSpaces.isOnUP) {
      setShowUserData(true);
      setWorkSpaces({ ...workSpaces, isOnUP: false });
    }

    if (workSpaces.currentSearch === undefined && userFinder === 0) {
      whichUser = user;
    } else if (userFinder !== 0 && workSpaces.currentSearch !== "") {
      whichUser = { id: userFinder, username: workSpaces.currentSearch };
      setUserFinder(0);
    }
    // Need a else that gets the info the person you just searched

    await axios.post("/api/users/genUserPost", { jwt: whichUser }).then(async (userPost) => {
      const arrBasedOnTimeCreated = userPost.data.sort(compare).reverse();

      for (let i = 0; i < arrBasedOnTimeCreated.length; i++) {
        arrBasedOnTimeCreated[i].timeStampSmall = arrBasedOnTimeCreated[i].timeStamp.substring(
          11,
          16
        );
      }
      setPostsByUser(arrBasedOnTimeCreated);
    });

    await axios
      .put("/api/users/friends", {
        jwt: whichUser,
      })
      .then((data) => {
        setUserFriends(data.data);
        console.log(data.data);
      });

    // await axios
    //   .put("/api/users/finishedSearch", {
    //     justSearched: workSpaces.currentSearch,
    //     jwt: user,
    //   })
    //   .then((data) => {
    //     setPeoples(data.data.allUsersArr);
    //     setAlreadyFriends(data.data.alreadyFriendsArr);
    //     setSentReqAlready(data.data.sentReqArr);
    //   });
    // console.log(postsByUser);
  }, [workSpaces.isOnUP, userFinder]);

  return (
    <div
      className={`${gStyle.flex} ${gStyle.flexCenter} ${gStyle.maxHeight} ${CSS.background} ${gStyle.scrollY}`}
    >
      <div className={`${gStyle.topPaddingXL} ${gStyle.flexColumn} ${CSS.background} `}>
        <FontAwesomeIcon
          icon={faUserCircle}
          className={`${CSS.profilePic} ${gStyle.alignCenterSelf}`}
        ></FontAwesomeIcon>
        <h1 className={`${gStyle.alignCenterSelf}`}>
          {workSpaces.currentSearch === undefined ? user.name : ""}
          {workSpaces.currentSearch ? workSpaces.currentSearch : ""}
        </h1>

        <div
          className={`${gStyle.flex} ${gStyle.flexCenter} ${CSS.postsAndFriends} ${CSS.background}`}
        >
          <div className={`${gStyle.flexColumn} ${CSS.userFriends}`}>
            <div>send</div>
            <div className={`${CSS.friendContainer}`}>
              {userFriends.length > 0 ? (
                userFriends.map(function (index) {
                  return <UserFriendBlock mapIdx={index} faIcon={faUserCircle}></UserFriendBlock>;
                })
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className={`${gStyle.flexColumn} ${gStyle.flexGrow} ${CSS.userPosts}`}>
            {(showUserData && postsByUser.length > 0 && workSpaces.currentSearch === undefined) ||
            workSpaces.currentSearch === "" ? (
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
