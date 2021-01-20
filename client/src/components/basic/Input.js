import React, { useState } from "react";

//Import Module CSS
import CSS from "input.module.css"

export default function Input({ children, className, history, id, onClick }) {
  return (
    <div id={id} className={className} onClick={onClick}>
      {children}
    </div>
  );
}
