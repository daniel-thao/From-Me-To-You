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

export default function UserFriendBlock(props) {
  const history = useHistory();
  const { workSpaces, setWorkSpaces } = useContext(NavbarIconContext);
  const { userFinder, setUserFinder } = useContext(OtherUserContext);

  return (
    <div>
      <div
        key={props.mapIdx.id}
        className={`${CSS.eachFriend}`}
        onClick={() => {
          setWorkSpaces({ ...workSpaces, currentSearch: props.mapIdx.username });
          history.push(`/frommetoyou/${props.mapIdx.username}`);
          setUserFinder(props.mapIdx.id)
          console.log(props.mapIdx);
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
