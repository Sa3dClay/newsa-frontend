import AuthLayout from "@/layouts/AuthLayout";
import ArticlesContainer from "@/components/articles/ArticlesContainer";

const Articles = () => {
    return (
        <AuthLayout>
            <ArticlesContainer newsUrl="/news" />
        </AuthLayout>
    );
};

export default Articles;
