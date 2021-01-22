import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

// Import CSS Modules
import gStyle from "../../general.module.css";
import CSS from "./feed.module.css";

// Import basic components
import Container from "../basic/Container";
import MakePost from "../basic/MakePost";
import PostPlaceHolder from "../basic/PostPlaceHolder";

// Import Contexts
import EditPostContext from "../../utils/EditPostContext";
import CreatePostContext from "../../utils/CreatePostContext";
import { AuthContext } from "../../routes/auth";

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
  const { creatingPost, setCreatingPost } = useContext(CreatePostContext);
  const { user } = useContext(AuthContext);

  // UseState for Feed Post
  const [postFeed, setPostFeed] = useState([]);

  const compare = function (a, b) {
    const bandA = a.createdAt;
    const bandB = b.createdAt;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  };

  // this is going to be used everytime a post has been created
  useEffect(async () => {
    console.log(creatingPost);
    if (creatingPost.finished === true) {
      axios.post("/api/users/genUserPost", { jwt: user }).then(async (userPost) => {
        console.log(userPost);
        const arrBasedOnTimeCreated = userPost.data[0].sort(compare).reverse();
        console.log(arrBasedOnTimeCreated);
        setPostFeed(arrBasedOnTimeCreated);
        console.log(postFeed);
        setCreatingPost({ makingPost: false, finished: false });


      });
    }

  }, [creatingPost.finished]);

  return (
    <EditPostContext.Provider value={editPostContextValues}>
      <div className={`${gStyle.flex} ${gStyle.flexRow} ${CSS.feed} ${gStyle.maxHeight}`}>
        <div className={`${gStyle.flexColumn} ${gStyle.maxHeight}`}>
          <Container className={`${CSS.feedColumn}`}>
            <PostPlaceHolder></PostPlaceHolder>
            {postFeed.map(function (index) {
              <div className={`${CSS.feedPost}`}>{"hi"}</div>;
            })}
          </Container>
        </div>

        <MakePost></MakePost>
      </div>
    </EditPostContext.Provider>
  );
}
