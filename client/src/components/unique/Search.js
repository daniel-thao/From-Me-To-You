import React, { useState, useContext, useEffect } from "react";

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

  useEffect(() => {
    // searched(user, userTyping, setUserRecentSearches);
    // dbSuggestions("", setCounter, setSuggestionsForUser);
  }, []);

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
                  searched(user, userTyping, setUserRecentSearches, setWorkSpaces);
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
                    mapIdx={index}
                    faIcon={faAngleDoubleRight}
                    onClick={() => {
                      setWorkSpaces({
                        ...workSpaces,
                        search: false,
                        peopleFinder: true,
                        isSearchingChat: false,
                        isSearchingHome: false,
                        isSearchingSettings: false,
                        isSearchingPF: true,
                      });
                    }}
                  ></SearchBlock>
                );
              })
            ) : (
              <div>
                <SearchBlock faIcon={faHandPointRight} userTyping={userTyping}></SearchBlock>

                <SuggRender
                  counter={counter}
                  suggestionsForUser={suggestionsForUser}
                  onClick={() => {
                    setWorkSpaces({
                      ...workSpaces,
                      search: false,
                      peopleFinder: true,
                      isSearchingChat: false,
                      isSearchingHome: false,
                      isSearchingSettings: false,
                      isSearchingPF: true,
                    });
                  }}
                ></SuggRender>

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
