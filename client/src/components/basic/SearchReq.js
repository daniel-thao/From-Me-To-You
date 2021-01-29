import React, { useContext } from "react";
import axios from "axios";

// Import CSS modules
import searchCSS from "../unique/search.module.css";
import gStyle from "../../general.module.css";

// Import FontAwesome stuff
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import Context
import { AuthContext } from "../../routes/auth";
import NavbarIconContext from "../../contexts/NavbarIconContext";

export default function SearchReq(props) {
  const { user } = useContext(AuthContext);
  const {workSpaces, setWorkSpaces} = useContext(NavbarIconContext);

  const addFriend = async (senderData) => {
    // console.log("adding friend");
    // console.log(senderData);
    await axios
      .put("/api/friends/acceptFriendReq", {
        sender: senderData,
        receiver: user,
      })
      .then((data) => {
        // console.log(data);
        setWorkSpaces({ ...workSpaces, search: false});
      });
  };

  const declineFriend = async (senderData) => {
    // console.log("declining friend");
    // console.log(senderData);
    await axios
      .put("/api/friends/acceptFriendReq", {
        sender: senderData,
        receiver: user,
      })
      .then((data) => {
        // console.log(data);
        setWorkSpaces({ ...workSpaces, search: false});
      });
  };
  return (
    <div>
      {props.mapIdx ? (
        <div key={props.mapIdx.id} className={`${searchCSS.flex} ${searchCSS.requestContainer}`}>
          <FontAwesomeIcon
            className={`${searchCSS.userIcon}`}
            icon={props.faIcon}
          ></FontAwesomeIcon>
          <div className={`${gStyle.flexColumn} ${searchCSS.choiceContainer}`}>
            <div className={`${searchCSS.flex}`}>
              <h5 className={`${gStyle.alignStartSelf} ${searchCSS.nameText}`}>
                {props.mapIdx.username}
              </h5>
            </div>
            <div className={`${searchCSS.flex}`}>
              <div
                className={`${searchCSS.reqBtn} ${searchCSS.acceptBtn}`}
                onClick={() => {
                  addFriend(props.mapIdx, props.setUpdateFR);
                }}
              >
                Accept
              </div>
              <div
                className={`${searchCSS.reqBtn}`}
                onClick={() => {
                  declineFriend(props.mapIdx, props.setUpdateFR);
                }}
              >
                Decline
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${searchCSS.flex} ${searchCSS.reqTitle}`}>Friend Requests</div>
      )}
    </div>
  );
}
