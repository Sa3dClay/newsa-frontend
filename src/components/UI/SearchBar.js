import { useEffect, useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(searchQuery);
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchQuery, onSearch]);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <form className="flex my-4">
            <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={handleInputChange}
                className="p-2 border border-gray-200 rounded-md outline-none flex-grow"
            />
        </form>
    );
};

export default SearchBar;
