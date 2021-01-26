import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Import CSS Modules
import gStyle from "../../general.module.css";
import CSS from "./search.module.css";

// Import Components
import SuggRender from "../basic/SuggRender";
import SearchBlock from "../basic/SearchBlock";

// Import Contexts
import NavbarIconContext from "../../contexts/NavbarIconContext";
import { AuthContext } from "../../routes/auth";

// import External Functions
import { searched, dbSuggestions, suggRefresher } from "../../utils/components/unique/searchUtil";

// Import FontAwesome
import { faHandPointRight, faRedoAlt, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

// I need function that changes the icon of the search thing to an actual input bar
export default function Search({ className }) {
  const [userTyping, setUserTyping] = useState("");
  const { workSpaces, setWorkSpaces } = useContext(NavbarIconContext);
  const { user } = useContext(AuthContext);
  const [userRecentSearches, setUserRecentSearches] = useState([]);
  const [suggestionsForUser, setSuggestionsForUser] = useState([]);
  const [counter, setCounter] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (workSpaces.search) {
      searched(user, userTyping, setUserRecentSearches, workSpaces, setWorkSpaces, history);
    }
    // dbSuggestions("", setCounter, setSuggestionsForUser);
  }, [workSpaces.search]);

  return (
    <div className={`${className} ${CSS.searchWrapper}`}>
      <div
        className={`${CSS.overlay} ${workSpaces.search ? CSS.enableSearch : CSS.nothing}`}
        onClick={() => {
          if (workSpaces.isSearchingHome) {
            setWorkSpaces({ ...workSpaces, search: false, home: true });
          } else if (workSpaces.isSearchingChat) {
            setWorkSpaces({ ...workSpaces, search: false, chat: true });
          } else if (workSpaces.isSearchingSettings) {
            setWorkSpaces({ ...workSpaces, search: false, settings: true });
          } else if (workSpaces.isSearchingPF) {
            setWorkSpaces({ ...workSpaces, search: false, peopleFinder: true });
          } else if (workSpaces.isOnUP) {
            setWorkSpaces({ ...workSpaces, search: false });
          }
        }}
      ></div>

      <div className={`${CSS.searchContainer} ${gStyle.maxHeight}`}>
        <div className={`${gStyle.topMarginL}`}>
          <div className={`${CSS.searchResults}`}>
            <input
              className={CSS.searchBox}
              onKeyPress={(e) => {
                if (e.key === "Enter" && userTyping !== "") {
                  searched(
                    user,
                    userTyping,
                    setUserRecentSearches,
                    workSpaces,
                    setWorkSpaces,
                    history,
                    e.key
                  );
                }
              }}
              onChange={async (e) => {
                setUserTyping(e.target.value);
                await dbSuggestions(e.target.value, setCounter, setSuggestionsForUser);
              }}
              value={userTyping}
            />

            {userTyping === "" ? (
              userRecentSearches.map(function (index) {
                return (
                  <SearchBlock
                    faIcon={faAngleDoubleRight}
                    mapIdx={index}
                    userTyping={userTyping}
                    onClick={() => {
                      // putting this function in the searchblock nested ternary made it go haywire, so it's staying out here
                      searched(
                        user,
                        userTyping,
                        setUserRecentSearches,
                        workSpaces,
                        setWorkSpaces,
                        history,
                        index.searched
                      );
                    }}
                  ></SearchBlock>
                );
              })
            ) : (
              <div>
                <SearchBlock
                  faIcon={faHandPointRight}
                  setUserRecentSearches={setUserRecentSearches}
                  userTyping={userTyping}
                ></SearchBlock>

                {suggestionsForUser.length > 0 ? (
                  suggestionsForUser[counter].map(function (index) {
                    return (
                      <SuggRender
                        mapIdx={index}
                        setUserRecentSearches={setUserRecentSearches}
                        userTyping={userTyping}
                      ></SuggRender>
                    );
                  })
                ) : (
                  <></>
                )}

                <SearchBlock
                  faIcon={faRedoAlt}
                  onClick={() => {
                    suggRefresher(counter, setCounter, suggestionsForUser);
                  }}
                  userTyping={userTyping}
                ></SearchBlock>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
