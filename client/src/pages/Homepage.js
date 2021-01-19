import React, { useState } from "react";

import CSS from "./homepage.module.css"

// import components
import Navbar from "../components/unique/Navbar"
import Feed from "../components/unique/Feed"

export default function Homepage() {
  return <div>
      {/* <Navbar></Navbar> */}
      <Feed></Feed>
  </div>;
}
