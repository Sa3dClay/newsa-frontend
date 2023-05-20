import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "@/components/UI/Loader";
import { setUser } from "@/store/slices/userSlice";

const AuthLayout = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const authToken = Cookies.get("authToken");
        if (!authToken) {
            router.push("/auth/login");
            return;
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
        axios
            .get(process.env.NEXT_PUBLIC_BASE_URL + "/auth/user")
            .then((res) => {
                dispatch(setUser(res.data.user));
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    return (
        <>
            <Header />
            <Navbar />

            {isLoading ? (
                <Loader />
            ) : (
                <div className="container mx-auto my-5">{children}</div>
            )}
        </>
    );
};

export default AuthLayout;
