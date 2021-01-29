import React from "react";

const EditPostContext = React.createContext({
    placeholder: "post.placeholder",
    userInput: "post.userInput",
    isEmpty: false,
  })

export default EditPostContext;
