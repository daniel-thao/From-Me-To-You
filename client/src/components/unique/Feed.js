import React, { useState } from "react";

// Import CSS Modules
import gStyle from "./general.module.css";
import CSS from "./feed.module.css";
import containCSS from "../basic/container.module.css";
import mpCSS from "../basic/makePost.module.css";

// Import basic components
import Container from "../basic/Container";
import MakePost from "../basic/MakePost";

// I need functions that set the feed with the posts from other users
// Each of these posts will go into the container tag down below and I should honestly have a useEffect that updates whenever theuser has exhausted the set amount of posts that I've shown them kind of like youtube and such
// This is going to require a mapping thing to the backend
export default function Feed() {
  const [post, setPost] = useState({
    placeholder: "What's On your Mind???",
    userInput: "",
    isEmpty: true,
    postColor: mpCSS.postEmptyColor,
  });

  return (
    <div className={`${gStyle.flex} ${CSS.feed} ${gStyle.maxHeight}`}>
      <div className={`${gStyle.flexColumn} ${gStyle.maxHeight}`}>
        <Container className={`${containCSS.feedColumn}`}>
          <MakePost className={`${gStyle.topMarginXL} ${mpCSS.clickToPost} ${post.postColor}`}>
            {post.isEmpty === true ? post.placeholder : post.userInput}
          </MakePost>
        </Container>
        <Container className={`${gStyle.show} ${mpCSS.createPostContainer}`}>
          dsadasdasadas
        </Container>
      </div>
    </div>
  );
}
