import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

const AuthLayout = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const authToken = Cookies.get("authToken");

        if (!authToken) {
            router.push("/auth/login");
        }
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
