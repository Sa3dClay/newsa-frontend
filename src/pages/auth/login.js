import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);
    const [password, setPassword] = useState("");

    useEffect(() => {
        const authToken = Cookies.get("authToken");
        if (authToken) {
            router.push("/");
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors([]);

        axios
            .post("http://127.0.0.1:8000/api/auth/login", {
                email,
                password,
            })
            .then((response) => {
                console.log(response.data);

                Cookies.set("authToken", response.data.token, { expires: 7 });

                router.push("/");

                clearFormData();
            })
            .catch((error) => {
                console.log(error.response);

                setErrors(error.response.data.errors);
            });
    };

    const clearFormData = () => {
        setEmail("");
        setPassword("");
    };

    const errorView = (
        <div>
            {Object.keys(errors).map((key) => {
                return (
                    <span className="text-red-600" key={key}>
                        {errors[key]}
                    </span>
                );
            })}
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>

                {errors && errorView}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
