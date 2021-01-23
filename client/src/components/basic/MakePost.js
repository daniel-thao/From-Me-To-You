import React, { useState, useContext } from "react";
import axios from "axios";

// Import ModuleCSS
import gStyle from "../../general.module.css";
import CSS from "../unique/feed.module.css";

// FontAwesome Stuff
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// context
import CreatePostContext from "../../contexts/CreatePostContext";
import EditPostContext from "../../contexts/EditPostContext";
import { AuthContext } from "../../routes/auth";

export default function MakePost() {
  const { creatingPost, setCreatingPost } = useContext(CreatePostContext);
  const { post, setPost } = useContext(EditPostContext);
  const { user } = useContext(AuthContext);

  const submitPost = async function (token, postValue) {
    await axios.post("/api/users/post", {
      jwt: token,
      content: postValue,
    });

    setPost({ ...post, isEmpty: false, userInput: post.placeholder });
    setCreatingPost({ makingPost: false, finished: true });
  };

  return (
    <div
      className={`${creatingPost.makingPost === false ? gStyle.hide : gStyle.show} ${
        CSS.createPostContainer
      } `}
    >
      <div className={` ${gStyle.positionRelative}`}>
        <h3 className={`${gStyle.textCenter} ${gStyle.dModeText}`}>Create Post</h3>
        <FontAwesomeIcon
          className={CSS.exitMakePost}
          icon={faTimes}
          onClick={function (e) {
            e.preventDefault();
            if (post.userInput !== "") {
              setPost({ ...post, isEmpty: false });
              setCreatingPost({ makingPost: false, finished: false });
            } else {
              setCreatingPost({ makingPost: false, finished: false });
            }
          }}
        ></FontAwesomeIcon>
      </div>

      <hr className={`${CSS.line}`}></hr>

      <textarea
        onChange={(e) => {
          e.preventDefault();
          setPost({ ...post, userInput: e.target.value });
        }}
        value={post.userInput === "" ? post.placeholder : post.userInput}
        className={`${CSS.writingPost}`}
      ></textarea>

      <div
        className={`${gStyle.flex} ${gStyle.flexRow} ${CSS.post}`}
        onClick={(e) => {
          // HERE WE ARE GOING TO ADD SOME CODE TO ADD THE POST TO THE DATABASE AND THEN POST IT TO THE FRONTEND OF THE APP
          e.preventDefault();
          if (post.userInput !== "") {
            submitPost(user, post.userInput);
          } else {
            return;
          }
        }}
      >
        <div className={`${CSS.something}`}>
          <h4>Post</h4>
        </div>
      </div>
    </div>
  );
}
