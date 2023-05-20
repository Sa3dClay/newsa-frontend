import { useSelector } from "react-redux";
import AuthLayout from "@/layouts/AuthLayout";
import ArticlesContainer from "@/components/articles/ArticlesContainer";

const Home = () => {
    const { user } = useSelector((state) => state.user);

    return (
        <AuthLayout>
            <p className="text-center text-4xl font-bold text-gray-700 py-4">
                <span className="text-indigo-600">Hi, </span>
                {user.name}
            </p>
            <p className="text-center text-2xl font-bold text-gray-700 py-4">
                Here is your
                <span className="text-indigo-600 ps-2">news feed</span>
            </p>

            <ArticlesContainer newsUrl="/news/feed" />
        </AuthLayout>
    );
};

export default Home;
