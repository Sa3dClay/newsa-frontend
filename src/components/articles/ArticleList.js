import axios from "axios";
import { baseUrl } from "@/env";
import Message from "../UI/Message";
import { useEffect, useState } from "react";

const ArticleList = ({ articles, itemsPerPage, resetPage }) => {
    const [message, setMessage] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [preferredAuthors, setPreferredAuthors] = useState([]);

    useEffect(() => {
        axios
            .get(baseUrl + "/news/authors")
            .then((res) => {
                console.log(res.data);
                setPreferredAuthors(res.data.preferred_authors);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [resetPage]);

    const totalPages = Math.ceil(articles.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedArticles = articles.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleFollowAuthor = (authorName) => {
        axios
            .post(baseUrl + "/news/authors/follow", { author_name: authorName })
            .then((res) => {
                setPreferredAuthors([...preferredAuthors, authorName]);

                setMessage({
                    text: res.data.message,
                    type: "success",
                });
            })
            .catch((err) => {
                console.log(err.response);
            });

        setTimeout(() => {
            setMessage({});
        }, 3000);
    };

    const handleUnfollowAuthor = (authorName) => {
        axios
            .post(baseUrl + "/news/authors/unfollow", {
                author_name: authorName,
            })
            .then((res) => {
                setPreferredAuthors(
                    preferredAuthors.filter((author) => author !== authorName)
                );

                setMessage({
                    text: res.data.message,
                    type: "success",
                });
            })
            .catch((err) => {
                console.log(err.response);
            });

        setTimeout(() => {
            setMessage({});
        }, 3000);
    };

    const formatDate = (dateString) => {
        const options = {
            weekday: "long",
            year: "numeric",
            day: "numeric",
            month: "long",
        };

        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (!articles.length)
        return (
            <h2 className="text-xl text-gray-500 font-bold my-4">
                No results for this search!
            </h2>
        );

    const articlesView = (
        <div className="grid lg:grid-cols-2 gap-4">
            {displayedArticles.map((article, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-bold text-gray-700">
                        <span
                            dangerouslySetInnerHTML={{
                                __html: article.title,
                            }}
                        />
                    </h2>
                    <p className="text-gray-500">{article.source.name}</p>

                    {article.author && (
                        <p className="text-gray-600 italic">
                            {article.author}
                            {preferredAuthors.includes(article.author) ? (
                                <span
                                    className="ps-2 cursor-pointer hover:underline text-indigo-500"
                                    onClick={() =>
                                        handleUnfollowAuthor(article.author)
                                    }
                                >
                                    Unfollow Author
                                </span>
                            ) : (
                                <span
                                    className="ps-2 cursor-pointer hover:underline text-indigo-500"
                                    onClick={() =>
                                        handleFollowAuthor(article.author)
                                    }
                                >
                                    Follow Author
                                </span>
                            )}
                        </p>
                    )}

                    <p className="text-gray-500 text-sm">
                        {formatDate(article.publishedAt)}
                    </p>
                    <p className="mt-2">
                        <span
                            dangerouslySetInnerHTML={{
                                __html: article.description,
                            }}
                        />
                    </p>
                    <a
                        href={article.url}
                        target="_blank"
                        className="text-indigo-500 hover:underline"
                    >
                        Read More
                    </a>
                </div>
            ))}
        </div>
    );

    const paginateView = (
        <div className="text-center my-4">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`m-2 px-2 py-1 rounded-sm ${
                            page === currentPage
                                ? "bg-indigo-500 text-white"
                                : "bg-gray-100 text-gray-700"
                        }`}
                    >
                        {page}
                    </button>
                )
            )}
        </div>
    );

    return (
        <div className="flex-row">
            {message.text && (
                <Message type={message.type} text={message.text} />
            )}
            {articlesView}
            {paginateView}
        </div>
    );
};

export default ArticleList;
