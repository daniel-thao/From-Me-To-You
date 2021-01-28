import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

// Import Module CSS
import CSS from "../../pages/userProfile.module.css";
import gStyle from "../../general.module.css";

// Import FontAwesome Stuff
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavbarIconContext from "../../contexts/NavbarIconContext";
import OtherUserContext from "../../contexts/OtherUserContext";
import { AuthContext } from "../../routes/auth";

export default function UserFriendBlock(props) {
  const history = useHistory();
  const { workSpaces, setWorkSpaces } = useContext(NavbarIconContext);
  const { userFinder, setUserFinder } = useContext(OtherUserContext);
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div
        key={props.mapIdx.id}
        className={`${CSS.eachFriend}`}
        onClick={() => {
          if (props.mapIdx.id === user.id) {
            setWorkSpaces({ ...workSpaces, currentSearch: undefined, isOnUP: true });
          } else {
            setWorkSpaces({ ...workSpaces, currentSearch: props.mapIdx.username, isOnUP: true });
          }

          setUserFinder(props.mapIdx.id);
          history.push(`/frommetoyou/${props.mapIdx.username}`);
          // console.log(props.mapIdx);
        }}
      >
        <div className={`${CSS.flexColumn}`}>
          <FontAwesomeIcon className={`${CSS.friendPic}`} icon={props.faIcon}></FontAwesomeIcon>
          <h6 className={`${CSS.friendName}`}>{props.mapIdx.username}</h6>
        </div>
      </div>
    </div>
  );
}
