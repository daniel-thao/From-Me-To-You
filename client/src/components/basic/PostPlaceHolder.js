import React, { useContext } from "react";

// import module css
import gStyle from "../../general.module.css";
import CSS from "../unique/feed.module.css";

// import context
import CreatePostContext from "../../contexts/CreatePostContext";
import EditPostContext from "../../contexts/EditPostContext";

export default function PostPlaceHolder() {
  const { creatingPost, setCreatingPost } = useContext(CreatePostContext);
  const { post, setPost } = useContext(EditPostContext);

  return (
    <div
      className={`${gStyle.topMarginXL} ${CSS.clickToPost} ${post.postColor}`}
      onClick={() => {
        setCreatingPost({ makingPost: true, finished: false });
        setPost({ ...post, isEmpty: true });
      }}
    >
      {post.isEmpty === true ? post.placeholder : post.userInput}
    </div>
  );
}
