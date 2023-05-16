import React from "react";

const ArticleList = ({ articles }) => {
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
            <h2 className="text-xl text-gray-500 font-bold text-center my-4">
                No results for this search!
            </h2>
        );

    return (
        <div className="grid lg:grid-cols-2 gap-4">
            {articles.map((article, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-bold text-gray-700">
                        <span
                            dangerouslySetInnerHTML={{ __html: article.title }}
                        />
                    </h2>
                    <p className="text-gray-500">{article.source.name}</p>
                    {/* TODO: follow author */}
                    <p className="text-gray-600 italic">{article.author}</p>
                    <p className="text-gray-500 text-sm">
                        {formatDate(article.publishedAt)}
                    </p>
                    <p className="mt-2">{article.description}</p>
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
};

export default ArticleList;
