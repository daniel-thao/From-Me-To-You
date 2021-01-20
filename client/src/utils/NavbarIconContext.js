import React from "react";

const NavbarIconContext = React.createContext({
    search: false,
    home: true,
    chat: false,
    settings: false,
});

export default NavbarIconContext;
