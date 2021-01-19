import React, { useState } from "react";

// Import CSS Modules
import gStyle from "./general.module.css";
import CSS from "./navbar.module.css";
import iconCSS from '../basic/iconBtn.module.css';

// Import basic components
import IconBtn from "../basic/IconBtn";

// FontAwesome Stuff
import { faHome, faComment, faCog, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// I need function that changes the icon of the search thing to an actual input bar

export default function Navbar() {
  return <div className={`${gStyle.flex} ${CSS.navbar}`}>
      <IconBtn className={iconCSS.icon}><FontAwesomeIcon icon={faSearch}/></IconBtn>
      <IconBtn className={iconCSS.icon}><FontAwesomeIcon icon={faHome}/></IconBtn>
      <IconBtn className={iconCSS.icon}><FontAwesomeIcon icon={faComment}/></IconBtn>
      <IconBtn className={iconCSS.icon}><FontAwesomeIcon icon={faCog}/></IconBtn>

  </div>;
}
