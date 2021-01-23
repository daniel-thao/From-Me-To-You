import React, { useState, useEffect, useContext } from "react";
// we have to deconstruct this function which is a react context because there is no default export at this location

// import Unique from components
import Login from "../components/unique/Login";
import Register from "../components/unique/Register";

// Import module CSS

// import Contexts
import HasAccountContext from "../contexts/HasAccountContext";

export default function Landing() {
  const [isRegistered, setIsRegistered] = useState(false);
  const contextValue = { isRegistered, setIsRegistered };
  // console.log(loginUser());
  // Set our object state
  useEffect(() => {
    console.log(isRegistered);
  }, [isRegistered]);
  return (
      <HasAccountContext.Provider value={contextValue}>
        {isRegistered ? <Login></Login> : <Register></Register>}
      </HasAccountContext.Provider>
  );
}
