import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";

const GuestLayout = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const authToken = Cookies.get("authToken");

        // already logged in
        if (authToken) {
            router.push("/");
        }
    }, []);

    return (
        <>
            <Header />

            <div className="h-screen flex items-center justify-center">
                {children}
            </div>
        </>
    );
};

export default GuestLayout;
