import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

// Import CSS Modules
import gStyle from "../../general.module.css";
import CSS from "./chat.module.css";

// Import Contexts
import ChatBtnContext from "../../contexts/ChatBtnContext";
import { AuthContext } from "../../routes/auth";

// Import FontAwesome Stuff
import {
  faPenAlt,
  faUserCircle,
  faSearch,
  faPaperPlane,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavbarIconContext from "../../contexts/NavbarIconContext";
// I need function that changes the icon of the search thing to an actual input bar

export default function Chat({ className }) {
  const { notChatTab, setNotChatTab } = useContext(ChatBtnContext);
  const { workSpaces, setWorkSpaces } = useContext(NavbarIconContext);
  const { user } = useContext(AuthContext);

  // Tracks the msg that you are writing
  const [userTyping, setUserTyping] = useState("");
  // Tracks the user's name that you are searching a chat for
  const [searchChat, setSearchChat] = useState({ placeHolder: "Search Your Chat", userInput: "" });

  // tracks all your chats on the left of browser
  const [allChats, setAllChats] = useState([]);
  // tracks which user you're choosing to msg
  const [whichChat, setWhichChat] = useState({});
  // Tracks how many messages were sent between you and the other user that you've chosen
  const [messagesPerChat, setMessagesPerChat] = useState([]);
  // used to reset the message box
  const [sentMessage, setSentMessage] = useState(false);

  // Need something to track when Current user wants to write a new message at the same time creating a new chat
  // Tracks whether the user has clicked the new msg button
  const [newMsgNewChat, setNewMsgNewChat] = useState(false);
  // Tracks the input of the user of another user after choosing to make a new msg
  const [newMsgInput, setNewMsgInput] = useState("");

  // Need this to track all the friends of the current user
  const [allFriends, setAllFriends] = useState([]);

  //
  useEffect(async () => {
    if (notChatTab.username !== "" && notChatTab.id !== 0) {
      await axios
        .post("/api/friends/newChat", {
          jwt: user,
          person: notChatTab,
        })
        .then((data) => {
          console.log(data);
          setNotChatTab({ id: 0, username: "" });
        });
      // IN Here I want to have an axios call that populates the chat portion and also the message box
    }
    if (workSpaces.chat) {
      await axios.put("/api/friends/chats", { jwt: user }).then((data) => {
        setAllChats(data.data);
        setWhichChat(data.data[0]);
      });

      // Axios call to find all the friends of the user
      await axios
        .put("/api/users/friends", {
          jwt: user,
        })
        .then((data) => {
          setAllFriends(data.data);
        });
    }
  }, [notChatTab.username, notChatTab.id, workSpaces.chat]);

  useEffect(async () => {
    // call to check the messages
    setSentMessage(false);
    if (!sentMessage) {
      await axios
        .put("/api/friends/messages", {
          jwt: user,
          chatInfo: whichChat,
        })
        .then((data) => {
          setMessagesPerChat(data.data);
        });
    }
  }, [whichChat, sentMessage]);

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
            <FontAwesomeIcon
              className={`${CSS.writeIcon}`}
              icon={faPenAlt}
              onClick={() => {
                setNewMsgNewChat(true);
              }}
            ></FontAwesomeIcon>
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

          {allChats.length > 0 ? (
            allChats.map(function (index) {
              if (searchChat.userInput === "") {
                return (
                  <div
                    className={`${CSS.eachChat}`}
                    onClick={() => {
                      setWhichChat(index);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      className={`${CSS.chatIcon}`}
                    ></FontAwesomeIcon>
                    <h5 className={`${CSS.otherUserInfo}`}>{index.otherUser}</h5>
                  </div>
                );
              } else if (index.otherUser.includes(searchChat.userInput.toLowerCase())) {
                return (
                  <div
                    className={`${CSS.eachChat}`}
                    onClick={() => {
                      setWhichChat(index);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      className={`${CSS.chatIcon}`}
                    ></FontAwesomeIcon>
                    <h5 className={`${CSS.otherUserInfo}`}>{index.otherUser}</h5>
                  </div>
                );
              } else {
                return;
              }
            })
          ) : (
            <></>
          )}
        </div>

        {/* Here is where the messages container starts */}
        <div className={`${CSS.msgBox}`}>
          <div>
            {/* Right here is where i need to change it to match the new Message portion */}
            {newMsgNewChat ? (
              <div>
                <input
                  onChange={(e) => {
                    setNewMsgInput(e.target.value);
                  }}
                  placeholder={"Write the friend you would like to message"}
                  value={newMsgInput}
                />
                <FontAwesomeIcon
                  icon={faWindowClose}
                  onClick={() => {
                    setNewMsgNewChat(false);
                  }}
                ></FontAwesomeIcon>
              </div>
            ) : whichChat.otherUser ? (
              <h4 className={`${gStyle.white}`}>{whichChat.otherUser}</h4>
            ) : (
              <h4 className={`${gStyle.white}`}>Who do you want to message?</h4>
            )}
            {/* {whichChat.otherUser ? whichChat.otherUser : "Who do you want to message?"} */}
          </div>

          <div className={CSS.chatExchange}>
            {newMsgNewChat ? (
              <></>
            ) : messagesPerChat.length === 0 ? (
              <div className={`${CSS.noMsg}`}>
                <h6>No messages yet, Send Something to your friend!</h6>
              </div>
            ) : (
              messagesPerChat.map(function (index) {
                if (index.sender === user.id) {
                  return <div className={`${CSS.msgUserBubble}`}>{index.messages}</div>;
                } else {
                  return <div className={`${CSS.msgOtherUserBubble}`}>{index.messages}</div>;
                }
              })
            )}

            {/* Here, map out all the messages between the two users */}
          </div>

          <div className={CSS.typingContainer}>
            <textarea
              className={CSS.typeBox}
              onChange={(e) => {
                setUserTyping(e.target.value);
              }}
              placeholder={"Your Message Goes Here"}
              value={userTyping}
            ></textarea>
            <FontAwesomeIcon
              className={CSS.sendMsgIcon}
              icon={faPaperPlane}
              onClick={async () => {
                // NEED ANOTHER IF OR ELSE IF HERE IN ORDER TO CHECK WHETHER THE newMsgNewChat === true and if it is and the newMsgInput === a name of a friend, 
                // If these two conditions are met and we send a message, we create a new chat and then create a new message that is joined to the chat and the user id
                // the UsersDupid (sender and receiver id)

                // But before we do the thing up above, we need to create a dropdown choice when the user is trying to search a friend to send this new message to
                if (userTyping !== "") {
                  await axios
                    .post("/api/friends/sendMessage", {
                      jwt: user,
                      person: whichChat,
                      message: userTyping,
                    })
                    .then((data) => {
                      setUserTyping("");
                      setSentMessage(true);
                    });
                }
              }}
            ></FontAwesomeIcon>
          </div>
        </div>
      </div>
    </div>
  );
}
