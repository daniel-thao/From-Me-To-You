import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

// Import CSS Modules
import gStyle from "../../general.module.css";
import CSS from "./search.module.css";

// Import Contexts
import NavbarIconContext from "../../contexts/NavbarIconContext";
import { AuthContext } from "../../routes/auth";

// Import FontAwesome
import { faHandPointRight, faRedoAlt, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// I need function that changes the icon of the search thing to an actual input bar

export default function Search({ className }) {
  const [userTyping, setUserTyping] = useState("");
  const { workSpaces, setWorkSpaces } = useContext(NavbarIconContext);
  const { user } = useContext(AuthContext);
  const [userRecentSearches, setUserRecentSearches] = useState([]);
  const [suggestionsForUser, setSuggestionsForUser] = useState({});
  // const [timer, setTimer] = useState();

  const searched = async function () {
    await axios
      .post("/api/users/activateSearch", {
        jwt: user,
        userInput: userTyping,
      })
      .then((data) => setUserRecentSearches(data.data[0].reverse()));
  };

  const dbSuggestions = async function (text) {
    console.log("started");
    axios
      .put("/api/users/suggestions", {
        userInput: text,
      })
      .then(async (data) => {
        // console.log(data.data);
        const incomingData = data.data;
        incomingData.batchOneView = true;
        // console.log(incomingData);
        setSuggestionsForUser(incomingData);
      });
  };

  useEffect(() => {
    searched();
  }, []);

  return (
    <div className={`${className} ${CSS.searchWrapper}`}>
      <div
        className={`${CSS.overlay} ${workSpaces.search ? CSS.enableSearch : CSS.nothing}`}
        onClick={() => {
          setWorkSpaces({ ...workSpaces, search: false, home: true });
        }}
      ></div>

      <div className={`${CSS.searchContainer} ${gStyle.maxHeight}`}>
        <div className={`${gStyle.topMarginL}`}>
          <div className={`${CSS.searchResults}`}>
            <input
              className={CSS.searchBox}
              onKeyPress={(e) => {
                if (e.key === "Enter" && userTyping !== "") {
                  searched();
                }
              }}
              onChange={async (e) => {
                setUserTyping(e.target.value);
                await dbSuggestions(e.target.value);
              }}
              // onKeyUp={(e) => {
              //   clearTimeout(timer);
              //   timer()
              // }}
              // onKeyDown={(e) => {
              //   clearTimeout(timer);
              // }}
              value={userTyping}
            ></input>
            {/* only one of these should be active at a time and these should be mappingng data from the Database and I need to Map things*/}
            {userTyping === "" ? (
              userRecentSearches.map(function (index) {
                return (
                  <div key={index.key} className={`${CSS.recentSearches}`}>
                    <FontAwesomeIcon
                      className={`${CSS.reuseIcon}`}
                      icon={faAngleDoubleRight}
                    ></FontAwesomeIcon>
                    <h5 className={`${CSS.searchText}`}>{index.searched}</h5>
                  </div>
                );
              })
            ) : (
              <div>
                <div className={`${CSS.recentSearches}`}>
                  <FontAwesomeIcon
                    className={`${CSS.chooseIcon}`}
                    icon={faHandPointRight}
                  ></FontAwesomeIcon>
                  <h5 className={`${CSS.searchText}`}>{userTyping}</h5>
                </div>

                {suggestionsForUser.batchOneView ? (
                  suggestionsForUser.batchOne.map(function (index) {
                    return (
                      <div key={index.key} className={`${CSS.recentSearches}`}>
                        <FontAwesomeIcon
                          className={`${CSS.chooseIcon}`}
                          icon={faHandPointRight}
                        ></FontAwesomeIcon>
                        <h5 className={`${CSS.searchText}`}>{index}</h5>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
                {suggestionsForUser.batchTwoView ? (
                  suggestionsForUser.batchTwo.map(function (index) {
                    return (
                      <div key={index.key} className={`${CSS.recentSearches}`}>
                        <FontAwesomeIcon
                          className={`${CSS.chooseIcon}`}
                          icon={faHandPointRight}
                        ></FontAwesomeIcon>
                        <h5 className={`${CSS.searchText}`}>{index}</h5>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}

                <div
                  className={`${CSS.recentSearches}`}
                  onClick={() => {
                    setSuggestionsForUser({...suggestionsForUser, batchOneView: false, batchTwoView: true});
                    console.log(suggestionsForUser);
                  }}
                >
                  <FontAwesomeIcon
                    className={`${CSS.chooseIcon}`}
                    icon={faRedoAlt}
                  ></FontAwesomeIcon>
                  <h5 className={`${CSS.searchText}`}>{userTyping}</h5>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
