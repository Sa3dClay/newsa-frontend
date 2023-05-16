import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "@/env";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";

const AuthLayout = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const authToken = Cookies.get("authToken");
        if (!authToken) {
            router.push("/auth/login");
            return;
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
        axios
            .get(baseUrl + "/auth/user")
            .then((res) => {
                dispatch(setUser(res.data.user));
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    return (
        <>
            <Header />

            <Navbar />

            <div className="container mx-auto my-5">{children}</div>
        </>
    );
};

export default AuthLayout;
