import React, { useState } from "react";

// Import CSS Modules
import CSS from "./iconBtn.module.css"

export default function IconBtn({ children, className, history, id, onClick, value }) {
  return (
    <div id={id} className={className} onClick={onClick} value={value}>
      {children}
    </div>
  );
}
