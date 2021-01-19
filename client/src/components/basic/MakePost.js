import React, { useState } from "react";

// Import Module CSS
import CSS from "./makePost.module.css"

export default function MakePost({ children, className, history, id, onClick }) {
  return (
    <div id={id} className={className} onClick={onClick}>
      {children}
    </div>
  );
}
