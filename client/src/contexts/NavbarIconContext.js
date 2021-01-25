import React from "react";

const NavbarIconContext = React.createContext({
    search: false,
    currentSearch: "",
    home: true,
    isSearchingHome: false,
    chat: false,
    isSearchingChat: false,
    settings: false,
    isSearchingSettings: false,
    peopleFinder: false,
    isSearchingPF: false,
});

export default NavbarIconContext;
