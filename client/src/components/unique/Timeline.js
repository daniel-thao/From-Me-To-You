import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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
import {
  genPosts,
  genFriends,
  genChoice,
  unfriend,
} from "../../utils/components/unique/timelineUtil";

import { sendFriendReq } from "../../utils/components/basic/personUtil";

// Import FontAwesome Stuff
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatBtnContext from "../../contexts/ChatBtnContext";

export default function UserProfile() {
  // Import Contexts
  const { workSpaces, setWorkSpaces } = useContext(NavbarIconContext);
  const { userFinder, setUserFinder } = useContext(OtherUserContext);
  const { notChatTab, setNotChatTab } = useContext(ChatBtnContext);
  const { user } = useContext(AuthContext);

  const history = useHistory();
  // Used to display the posts by the user
  const [postsByUser, setPostsByUser] = useState([]);

  // used to identify the id of user
  const [userFriends, setUserFriends] = useState([]);
  // Categorizes all other users into "add" or "unfriend"
  const [addOrUnfriend, setAddOrUnfriend] = useState([]);
  // used to make different axios calls to end the relationship
  const [otherUser, setOtherUser] = useState({});

  const [userSentReq, setUserSentReq] = useState(false);

  let whichUser;

  useEffect(async () => {
    setUserSentReq(false);
    if (workSpaces.isOnUP) {
      setWorkSpaces({ ...workSpaces, isOnUP: false });
      //
    } else if (workSpaces.currentSearch === undefined) {
      whichUser = user;
      await genPosts(whichUser, setPostsByUser);
      await genFriends(whichUser, setUserFriends);
      //
    } else if (workSpaces.currentSearch !== undefined) {
      whichUser = { id: userFinder, username: workSpaces.currentSearch };
      setOtherUser(whichUser);
      await genPosts(whichUser, setPostsByUser);
      await genFriends(whichUser, setUserFriends);
      await genChoice(whichUser, user, setAddOrUnfriend);
    }
  }, [workSpaces.isOnUP, userFinder, userSentReq]);

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
            <div className={`${CSS.friendContainer}`}>
              {/* I need functionality for this btn --> axios call */}
              {workSpaces.currentSearch === undefined ? (
                <></>
              ) : addOrUnfriend[0] !== null || addOrUnfriend[1] !== null ? (
                <div
                  className={` ${CSS.friendBtn}`}
                  onClick={() => {
                    unfriend(otherUser, user, history, workSpaces, setWorkSpaces, setUserFinder);
                  }}
                >
                  Unfriend
                </div>
              ) : (
                <></>
              )}

              {/* I need functionality for this btn --> axios call */}
              {addOrUnfriend.length > 0 && workSpaces.currentSearch === undefined ? (
                <></>
              ) : (workSpaces.currentSearch !== undefined && addOrUnfriend[2] !== null) ||
                (workSpaces.currentSearch !== undefined && addOrUnfriend[3] !== null) ? (
                <div className={` ${CSS.sentBtn}`}>Sent Request</div>
              ) : addOrUnfriend[0] === null && addOrUnfriend[1] === null ? (
                <div
                  className={` ${CSS.friendBtn}`}
                  onClick={() => {
                    sendFriendReq(otherUser, user);
                    setUserSentReq(true);
                  }}
                >
                  Add Friend
                </div>
              ) : (
                <></>
              )}

              {/* I need functionality for this btn --> axios call */}
              {workSpaces.currentSearch === undefined ? (
                <></>
              ) : addOrUnfriend[0] !== null || addOrUnfriend[1] !== null ? (
                <div
                  className={` ${CSS.chatBtn}`}
                  onClick={() => {
                    setNotChatTab({id: otherUser.id, username: otherUser.username});
                    // console.log(notChatTab, otherUser, user);
                    history.push("/frommetoyou")
                    setWorkSpaces({
                      search: false,
                      home: false,
                      isSearchingHome: false,
                      chat: true,
                      isSearchingChat: true,
                      settings: false,
                      isSearchingSettings: false,
                      peopleFinder: false,
                      isSearchingPF: false,
                      userProfile: false,
                      isOnUP: false,
                    });
                  }}
                >
                  Chat
                </div>
              ) : (
                <></>
              )}
            </div>

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
            {postsByUser.length > 0 ? (
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
