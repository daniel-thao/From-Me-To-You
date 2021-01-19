import React, { useState } from "react";

// I need functions that set the feed with the posts from other users
export default function Container({ children, className, history, id, onClick, value }) {
  return (
    <div id={id} className={className} onClick={onClick} value={value}>
      {children}
    </div>
  );
}
