import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

// Import CSS
import gStyle from "../../general.module.css";
import CSS from "./peopleFinder.module.css";

// imoprt components
import PersonContainer from "../basic/PersonContainer";

// import Contexts
import NavbarIconContext from "../../contexts/NavbarIconContext";
import { AuthContext } from "../../routes/auth";

// Import Font Awesome stuff
import { faUserCircle} from "@fortawesome/free-solid-svg-icons";

export default function PeopleFinder({ className }) {
  const { workSpaces, setWorkSpaces } = useContext(NavbarIconContext);
  const { user } = useContext(AuthContext);

  const [peoples, setPeoples] = useState([])

  useEffect(() => {
    if (workSpaces.peopleFinder) {
      console.log(workSpaces);
      console.log("People Finder Page");

      axios
        .put("/api/users/finishedSearch", {
          justSearched: workSpaces.currentSearch,
          jwt: user,
        })
        .then((data) => setPeoples(data.data));
    }
  }, [workSpaces.peopleFinder]);
  // I think I should have the axios call here just like the feed
  return (
    <div
      className={`${className} ${gStyle.flex} ${gStyle.flexRow} ${gStyle.maxHeight} ${CSS.background}`}
    >
      <div
        className={`${gStyle.flex} ${gStyle.flexColumn} ${gStyle.topMarginXL} ${CSS.background} ${CSS.peoplesColumn}`}
      >
        {workSpaces.peopleFinder && peoples.length !== 0 ? (
          peoples.map((index) => (
            <PersonContainer mapIdx={index} faIcon={faUserCircle}></PersonContainer>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
