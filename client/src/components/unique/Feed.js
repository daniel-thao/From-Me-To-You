import React, { useEffect, useState, useContext } from "react";

// Import CSS Modules
import gStyle from "../../general.module.css";
import CSS from "./feed.module.css";

// Import basic components
import Container from "../basic/Container";
import MakePost from "../basic/MakePost";
import PostPlaceHolder from "../basic/PostPlaceHolder";

// Import Contexts
import EditPostContext from "../../utils/EditPostContext";
// import NavbarIconContext from "../../utils/NavbarIconContext";

// I need functions that set the feed with the posts from other users
// Each of these posts will go into the container tag down below and I should honestly have a useEffect that updates whenever theuser has exhausted the set amount of posts that I've shown them kind of like youtube and such
// This is going to require a mapping thing to the backend
export default function Feed() {
  const [post, setPost] = useState({
    placeholder: "What's On your Mind???",
    userInput: "",
    isEmpty: true,
    postColor: CSS.postEmptyColor,
  });

  const editPostContextValues = { post, setPost };
  // const { workSpaces, setWorkSpaces } = useContext(NavbarIconContext);


  return (
    <EditPostContext.Provider value={editPostContextValues}>
      <div className={`${gStyle.flex} ${gStyle.flexRow} ${CSS.feed} ${gStyle.maxHeight}`}>
        <div className={`${gStyle.flexColumn} ${gStyle.maxHeight}`}>
          <Container className={`${CSS.feedColumn}`}>
            <PostPlaceHolder></PostPlaceHolder>
          </Container>
        </div>

        <MakePost></MakePost>
      </div>
    </EditPostContext.Provider>
  );
}
