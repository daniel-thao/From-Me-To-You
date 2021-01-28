import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

// Import FontAwesomeStuff
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import CSS modules
import CSS from "../unique/peopleFinder.module.css";
import FeedCSS from "../unique/feed.module.css";
import gStyle from "../../general.module.css";

// import Context
import { AuthContext } from "../../routes/auth";
import NavbarIconContext from "../../contexts/NavbarIconContext";

export default function PersonContainer(props) {
  const { user } = useContext(AuthContext);
  const { workSpaces, setWorkSpaces } = useContext(NavbarIconContext);

  const history = useHistory();

  const sendFriendReq = async (otherUserData) => {
    // console.log("putting the sendFriendReq here");
    await axios
      .post("/api/friends/makeFriendReq", {
        sender: user,
        receiver: otherUserData,
      })
      .then((data) => console.log(data));
  };

  return (
    <div key={props.mapIdx.timeStamp} className={`${FeedCSS.feedPost}`}>
      <div className={`${CSS.userData}`}>
        <FontAwesomeIcon
          className={`${FeedCSS.userProfilePlaceholder}`}
          icon={props.faIcon}
        ></FontAwesomeIcon>
        <div
          className={`${FeedCSS.userNameAndTime} ${CSS.nameHyperlink}`}
          onClick={() => {
            if (props.mapIdx.id === user.id) {
              setWorkSpaces({ ...workSpaces, currentSearch: undefined, peopleFinder: false });
            } else {
              setWorkSpaces({
                ...workSpaces,
                currentSearch: props.mapIdx.username,
                search: false,
                peopleFinder: false,
                isSearchingPF: false,
                isSearchingChat: false,
                isSearchingHome: false,
                isSearchingSettings: false,
                home: false,
                chat: false,
                settings: false,
                isOnUP: true
              });
            }

            props.setUserFinder(props.mapIdx.id);
            history.push(`/frommetoyou/${props.mapIdx.username}`);
          }}
        >
          <h6 className={`${FeedCSS.offWhite}`}>{props.mapIdx.username}</h6>
        </div>
        <div className={`${gStyle.flexGrow} ${gStyle.alignCenterSelf}`}></div>

        {/* {test() ? <div>dsadadas</div> : <div>ewqewqewq</div>} */}
        {props.alreadyFriends.includes(props.mapIdx.id) ? (
          <div
            className={`${gStyle.alignCenterSelf} ${CSS.addFriendBtn}`}
            onClick={() => {
              // sendFriendReq(props.mapIdx);
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

        {props.sentReqAlready.includes(props.mapIdx.id) ? (
          <div className={`${gStyle.alignCenterSelf} ${CSS.sentReqbtn}`}>Sent Request</div>
        ) : (
          <></>
        )}

        {!props.alreadyFriends.includes(props.mapIdx.id) &&
        !props.sentReqAlready.includes(props.mapIdx.id) ? (
          <div
            className={`${gStyle.alignCenterSelf} ${CSS.addFriendBtn}`}
            onClick={() => {
              sendFriendReq(props.mapIdx);
              props.setUserSentReq(true)
            }}
          >
            Add Friend
          </div>
        ) : (
          <></>
        )}
      </div>
      <h6 className={`${FeedCSS.offWhite}`}>{props.mapIdx.post}</h6>
    </div>
  );
}
