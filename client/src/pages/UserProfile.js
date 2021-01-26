import React from "react";

// Import module Css
import gStyle from "../general.module.css";

// Import Unique Components
import Timeline from "../components/unique/Timeline";
/*
SINCE THIS IS WRAPPED IN A ROUTE, ITSELF CAN'T JUST HAVE THE JSX AND JS INSIDE OF IT
The original JSX and JS i wanted in here needed to be nested inside of another component and thus the Timeline Component was born
*/
export default function UserProfile() {
  return (
    <div className={gStyle.positionStatic}>
      <Timeline></Timeline>
    </div>
  );
}
