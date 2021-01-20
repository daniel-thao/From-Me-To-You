import React, { useState, useContext } from "react";

// import module css
import gStyle from "../../general.module.css";
import CSS from "../unique/feed.module.css";

// import context
import CreatePostContext from "../../utils/CreatePostContext";
import EditPostContext from "../../utils/EditPostContext";

export default function PostPlaceHolder() {
  const { creatingPost, setCreatingPost } = useContext(CreatePostContext);
  const { post, setPost} = useContext(EditPostContext);


  return (
    <div
      className={`${gStyle.topMarginXL} ${CSS.clickToPost} ${post.postColor}`}
      onClick={() => {
        setCreatingPost(true);
        setPost({ ...post, isEmpty: true });
      }}
    >
      {post.isEmpty === true ? post.placeholder : post.userInput}
    </div>
  );
}
