import React, { useContext, useEffect, useState } from "react";

// Import CSS Modules
import gStyle from "../../general.module.css";
import CSS from "./chat.module.css";

// Import FontAwesome Stuff
import { faPenAlt, faUserCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatBtnContext from "../../contexts/ChatBtnContext";

// I need function that changes the icon of the search thing to an actual input bar

export default function Chat({ className }) {
  const [userTyping, setUserTyping] = useState("");
  const [searchChat, setSearchChat] = useState({ placeHolder: "Search Your Chat", userInput: "" });

  const { notChatTab, setNotChatTab } = useContext(ChatBtnContext);

  useEffect(() => {
    if (notChatTab.username !== "" && notChatTab.id !== 0) {
      setNotChatTab({id: 0, username: ""})
      // IN Here I want to have an axios call that populates the chat portion and also the message box
    }
    console.log(notChatTab);
  }, [notChatTab.username, notChatTab.id]);
  return (
    <div
      className={`${className} ${gStyle.flex} ${gStyle.flexRow} ${CSS.chatContainer} ${gStyle.maxHeight}`}
    >
      <div
        className={`${gStyle.flex} ${gStyle.flexCenter} ${CSS.chatContainer} ${gStyle.topMarginXL}`}
      >
        <div className={`${CSS.messages}`}>
          <div className={`${CSS.flex}`}>
            <h4 className={`${gStyle.white}`}>Chats</h4>
            <div className={`${CSS.empty}`}></div>
            <FontAwesomeIcon className={`${CSS.writeIcon}`} icon={faPenAlt}></FontAwesomeIcon>
          </div>

          <div className={`${CSS.chatSearchContainer}`}>
            <FontAwesomeIcon className={`${CSS.chatSIcon}`} icon={faSearch}></FontAwesomeIcon>
            <input
              className={`${CSS.chatSearch}`}
              placeholder={searchChat.placeHolder}
              value={searchChat.userInput === "" ? "" : searchChat.userInput}
              onChange={(e) => {
                setSearchChat({ ...searchChat, userInput: e.target.value });
              }}
            />
          </div>

          {/* Mapping Function right here */}
          <div className={`${CSS.eachChat}`}>
            <FontAwesomeIcon icon={faUserCircle} className={`${CSS.chatIcon}`}></FontAwesomeIcon>
            <h5 className={`${CSS.otherUserInfo}`}>Newest To Oldest</h5>
          </div>
        </div>

        <div className={`${CSS.msgBox}`}>
          <h4 className={`${gStyle.white}`}>new Messages or the Name of the other User</h4>
          <div className={CSS.chatExchange}>
            {/* Here, map out all the messages between the two users */}
          </div>

          <div className={CSS.typingContainer}>
            <textarea
              className={CSS.typeBox}
              onChange={(e) => {
                setUserTyping(e.target.value);
              }}
              value={userTyping}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
