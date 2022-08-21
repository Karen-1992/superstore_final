import React, { useEffect, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import productService from "../../../services/product.service";
import SearchQuerry from "../../common/searhQuerry";
import SearchOverlay from "../searchOverlay";
import NavBar from "./navBar";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const debouncedSearchQuery = useDebounce(searchQuery, 1000);
    useEffect(() => {
        if (debouncedSearchQuery) {
            setIsSearching(true);
            productService
                .get({ query: searchQuery })
                .then((res) => setResults(res.content.filteredList));
        } else {
            setResults([]);
        }
    }, [debouncedSearchQuery]);
    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value);
    };
    const handleToggleSearching = () => {
        setOpen((prevState) => !prevState);
        if (isOpen) {
            clearSearchQuery();
        }
    };
    const clearSearchQuery = () => {
        setSearchQuery("");
        setIsSearching(false);
    };
    return (
        <header>
            <NavBar onToggleSearching={handleToggleSearching} />
            {isOpen && (
                <div className="position-absolute start-50 top-0 translate-middle-x w-100 bg-dark pb-3 search">
                    <div className="py-5 rounded-top">
                        <SearchQuerry
                            onSearchQuery={handleSearchQuery}
                            onToggleSearching={handleToggleSearching}
                        />
                    </div>
                    {searchQuery.length > 0 && (
                        <div className="search-overlay">
                            <SearchOverlay
                                items={results}
                                isSearching={isSearching}
                                clearSearchQuery={clearSearchQuery}
                                searchQuery={searchQuery}
                            />
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
