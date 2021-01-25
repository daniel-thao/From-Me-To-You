import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

// Import CSS Modules
import gStyle from "../../general.module.css";
import CSS from "./feed.module.css";

// Import basic components
import Container from "../basic/Container";
import MakePost from "../basic/MakePost";
import PostPlaceHolder from "../basic/PostPlaceHolder";
import PostBlock from "../basic/PostBlock";

// Import Contexts
import EditPostContext from "../../contexts/EditPostContext";
import CreatePostContext from "../../contexts/CreatePostContext";
import NavbarIconContext from "../../contexts/NavbarIconContext";

import { AuthContext } from "../../routes/auth";

// Import FontAwesome
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

// Import external Functions
import { compare } from "../../utils/components/unique/feedUtil";

// I need functions that set the feed with the posts from other users
// Each of these posts will go into the container tag down below and I should honestly have a useEffect that updates whenever theuser has exhausted the set amount of posts that I've shown them kind of like youtube and such
// This is going to require a mapping thing to the backend
export default function Feed({ className }) {
  const [post, setPost] = useState({
    placeholder: "What's On your Mind???",
    userInput: "",
    isEmpty: true,
    postColor: CSS.postEmptyColor,
  });

  const editPostContextValues = { post, setPost };
  const { creatingPost, setCreatingPost } = useContext(CreatePostContext);
  const { workSpaces, setWorkSpaces } = useContext(NavbarIconContext);

  const { user } = useContext(AuthContext);

  // UseState for Feed Post
  const [postFeed, setPostFeed] = useState([]);
  const [feedIsShowing, setFeedIsShowing] = useState(false);

  // this is going to be used everytime a post has been created
  useEffect(async () => {
    if (!feedIsShowing) {
      setFeedIsShowing(false);
    } else {
      setFeedIsShowing(true);
    }

    if (creatingPost.finished === true) {
      await axios.post("/api/users/genUserPost", { jwt: user }).then(async (userPost) => {
        const arrBasedOnTimeCreated = userPost.data.sort(compare).reverse();

        for (let i = 0; i < arrBasedOnTimeCreated.length; i++) {
          // arrBasedOnTimeCreated[i].timeStamp.substring(11, 16)
          // console.log(arrBasedOnTimeCreated[i].timeStamp.substring(11, 16));
          arrBasedOnTimeCreated[i].timeStampSmall = arrBasedOnTimeCreated[i].timeStamp.substring(
            11,
            16
          );
        }

        setPostFeed(arrBasedOnTimeCreated);
        setCreatingPost({ makingPost: false, finished: false });
      });
    }
  }, [creatingPost.finished, workSpaces.home]);

  return (
    <EditPostContext.Provider value={editPostContextValues}>
      <div
        className={`${className} ${gStyle.flex} ${gStyle.flexRow} ${CSS.feed} ${gStyle.maxHeight} ${gStyle.scrollY}`}
      >
        <div className={`${gStyle.flexColumn} ${gStyle.maxHeight}`}>
          <Container className={`${CSS.feedColumn}`}>
            <PostPlaceHolder></PostPlaceHolder>
            {/* This basically shows the posts no matter what, but if it's not updated, SOo in this case the useEffect is fine?*/}

            {feedIsShowing
              ? postFeed.map((index) => (
                  <PostBlock mapIdx={index} faIcon={faUserCircle}></PostBlock>
                ))
              : <></>}

            {/* {feedIsShowing
              ? postFeed.map((index) => (
                  <PostBlock mapIdx={index} faIcon={faUserCircle}></PostBlock>
                ))
              : postFeed.map((index) => (
                  <PostBlock mapIdx={index} faIcon={faUserCircle}></PostBlock>
                ))} */}
          </Container>
        </div>

        <MakePost></MakePost>
      </div>
    </EditPostContext.Provider>
  );
}
