import { useSelector } from "react-redux";
import AuthLayout from "@/layouts/AuthLayout";

const Home = () => {
    const { user } = useSelector((state) => state.user);

    return (
        <AuthLayout>
            <p className="text-center text-4xl font-bold text-gray-800 py-5">
                <span className="text-indigo-600">Hi, </span>
                {user.name}
            </p>
        </AuthLayout>
    );
};

export default Home;
