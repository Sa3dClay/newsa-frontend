import axios from "axios";
import { baseUrl } from "@/env";
import { useEffect, useState } from "react";
import Loader from "@/components/UI/Loader";
import AuthLayout from "@/layouts/AuthLayout";
import SearchBar from "@/components/UI/SearchBar";
import ArticleList from "@/components/articles/ArticleList";

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios
            .get(baseUrl + "/news?q=" + searchQuery)
            .then((res) => {
                setArticles(res.data.articles);

                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [searchQuery]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const ArticlesView = (
        <>
            <SearchBar onSearch={handleSearch} />
            <ArticleList articles={articles} />
        </>
    );

    return <AuthLayout>{isLoading ? <Loader /> : ArticlesView}</AuthLayout>;
};

export default Articles;
