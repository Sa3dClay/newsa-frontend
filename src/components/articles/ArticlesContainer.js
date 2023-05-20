import axios from "axios";
import { baseUrl } from "@/env";
import { useEffect, useState } from "react";
import Loader from "@/components/UI/Loader";
import SearchBar from "@/components/UI/SearchBar";
import ArticleList from "@/components/articles/ArticleList";
import ArticleFilters from "@/components/articles/ArticleFilters";

const ArticlesContainer = ({ newsUrl }) => {
    const [sources, setSources] = useState([]);
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilters, setSelectedFilters] = useState({
        category: "",
        source: "",
        from_date: "",
        to_date: "",
    });
    const [filterChangeCount, setFilterChangeCount] = useState(0);

    useEffect(() => {
        axios
            .get(
                `${baseUrl + newsUrl}?q=${searchQuery}&source=${
                    selectedFilters.source
                }&from_date=${selectedFilters.from_date}&to_date=${
                    selectedFilters.to_date
                }`
            )
            .then((res) => {
                const data = res.data;
                setArticles(data.articles);
                const uniqueSources = [
                    ...new Set(
                        data.articles
                            .map((article) => article.source.id)
                            .filter((source) => source !== null)
                    ),
                ];
                setSources(uniqueSources);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [searchQuery, selectedFilters]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value,
        }));
        setFilterChangeCount((prevCount) => prevCount + 1);
    };

    const ArticlesView = (
        <div className="mx-4">
            <SearchBar
                onSearch={handleSearch}
                placeholderText="Search for articles..."
            />
            <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-9 gap-4">
                <div className="md:col-span-1 lg:col-span-1">
                    <ArticleFilters
                        sources={sources}
                        categories={[]}
                        onFilterChange={handleFilterChange}
                    />
                </div>
                <div className="md:col-span-4 lg:col-span-8">
                    <ArticleList
                        articles={articles}
                        itemsPerPage={10}
                        resetPage={filterChangeCount}
                    />
                </div>
            </div>
        </div>
    );

    return isLoading ? <Loader /> : ArticlesView;
};

export default ArticlesContainer;
