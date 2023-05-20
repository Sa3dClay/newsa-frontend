import AuthLayout from "@/layouts/AuthLayout";
import ArticlesContainer from "@/components/articles/ArticlesContainer";

const Articles = () => {
    return (
        <AuthLayout>
            <h2 className="text-center text-2xl font-bold text-gray-700 pt-8 pb-4">
                Search for articles from
                <span className="text-indigo-600 ps-2">all sources</span>
            </h2>

            <ArticlesContainer newsUrl="/news" />
        </AuthLayout>
    );
};

export default Articles;
