import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import gStyle from "../general.module.css";
import CSS from "./homepage.module.css";

// Import Context(s)
import CreatePostContext from "../contexts/CreatePostContext";
import NavbarIconContext from "../contexts/NavbarIconContext";
import { AuthContext } from "../routes/auth";

// import components
import Navbar from "../components/unique/Navbar";
import Feed from "../components/unique/Feed";
import Chat from "../components/unique/Chat";
import Setting from "../components/unique/Setting";
import Search from "../components/unique/Search";
import PeopleFinder from "../components/unique/PeopleFinder";

//import Pages
import UserProfile from "../pages/UserProfile";

export default function Homepage() {
  // These are for the createPost Context
  const [creatingPost, setCreatingPost] = useState({ makingPost: false, finished: true });
  const postValue = { creatingPost, setCreatingPost };

  // These are for the NavbarIcons Context
  const [workSpaces, setWorkSpaces] = useState({
    search: false,
    currentSearch: "",
    home: true,
    isSearchingHome: true,
    chat: false,
    isSearchingChat: false,
    settings: false,
    isSearchingSettings: false,
    peopleFinder: false,
    isSearchingPF: false,
    userProfile: false,
    isOnUP: false
  });
  const navbarIconValue = { workSpaces, setWorkSpaces };

  return (
    <CreatePostContext.Provider value={postValue}>
      <NavbarIconContext.Provider value={navbarIconValue}>
          <div className={gStyle.positionStatic}>
            <div className={creatingPost.makingPost ? CSS.enableCreatePost : CSS.nothing}></div>
            <Navbar></Navbar>
            <div>{workSpaces.search ? <Search></Search> : <Search className={gStyle.hide}></Search>}</div>
            {/* <div>{workSpaces.home ? <Feed></Feed> : <Feed className={gStyle.hide}></Feed>}</div> */}
            <div>{workSpaces.home || workSpaces.isSearchingHome ? <Feed></Feed> : <Feed className={gStyle.hide}></Feed>}</div>
            <div>{workSpaces.chat || workSpaces.isSearchingChat? <Chat></Chat> : <Chat className={gStyle.hide}></Chat>}</div>
            <div>{workSpaces.settings || workSpaces.isSearchingSettings? <Setting></Setting> : <Setting className={gStyle.hide}></Setting>}</div>
            <div>{workSpaces.peopleFinder || workSpaces.isSearchingPF? <PeopleFinder></PeopleFinder> : <PeopleFinder className={gStyle.hide}></PeopleFinder>}</div>
            <Route path="/frommetoyou/:user" component={UserProfile}></Route>
          </div>
      </NavbarIconContext.Provider>
    </CreatePostContext.Provider>
  );
}
