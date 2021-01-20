import React, { useState } from "react";

// Import CSS Modules
import gStyle from "../../general.module.css";
import CSS from "./chat.module.css";

// I need function that changes the icon of the search thing to an actual input bar

export default function Chat() {
  const [userTyping, setUserTyping] = useState("");
  return (
    <div className={`${gStyle.flex} ${gStyle.flexRow} ${CSS.chatContainer} ${gStyle.maxHeight}`}>
      <div
        className={`${gStyle.flex} ${gStyle.flexCenter} ${CSS.chatContainer} ${gStyle.topMarginXL}`}
      >
        <div className={`${CSS.messages}`}>
          <h4 className={`${gStyle.white}`}>
            This is where you can see all your messages to your friends
          </h4>
        </div>
        <div className={`${CSS.msgBox}`}>
          <h4 className={`${gStyle.white}`}>This is Where you can Chat</h4>
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
