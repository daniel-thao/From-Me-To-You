import React, { useEffect, useState } from "react";

import gStyle from "../general.module.css";
import CSS from "./homepage.module.css";

// Import Context(s)
import CreatePostContext from "../utils/CreatePostContext";
import NavbarIconContext from "../utils/NavbarIconContext";

// import components
import Navbar from "../components/unique/Navbar";
import Feed from "../components/unique/Feed";
import Chat from "../components/unique/Chat";
import Setting from "../components/unique/Setting";

export default function Homepage() {
  // These are for the createPost Context
  const [creatingPost, setCreatingPost] = useState(false);
  const postValue = { creatingPost, setCreatingPost };

  // These are for the NavbarIcons Context
  const [workSpaces, setWorkSpaces] = useState({
    search: false,
    home: true,
    chat: false,
    settings: false,
  });
  const navbarIconValue = {workSpaces, setWorkSpaces};

  return (
    <CreatePostContext.Provider value={postValue}>
      <NavbarIconContext.Provider value={navbarIconValue}>
      <div className={gStyle.positionStatic}>
        <div className={creatingPost ? CSS.enableCreatePost : CSS.nothing}></div>
        <div className={workSpaces.search ? CSS.enableSearch : CSS.nothing}></div>
        <Navbar></Navbar>
        <div>{workSpaces.search ? <Feed></Feed> : <></>}</div>
        <div>{workSpaces.home ? <Feed></Feed> : <></>}</div>
        <div>{workSpaces.chat ? <Chat></Chat> : <></>}</div>
        <div>{workSpaces.settings ? <Setting></Setting> : <></>}</div>


        {/* <Feed></Feed> */}
      </div>
      </NavbarIconContext.Provider>
    </CreatePostContext.Provider>
  );
}
