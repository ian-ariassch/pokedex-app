import React from "react";

export const SearchTermContext = React.createContext({
    searchTerm: "",
    setSearchTerm: () => {}
});