import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { baseUrl } from "@/env";
import { useRouter } from "next/router";
import React, { useState } from "react";
import GuestLayout from "@/layouts/GuestLayout";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors([]);

        axios
            .post(baseUrl + "/auth/login", {
                email,
                password,
            })
            .then((response) => {
                const token = response.data.token;

                Cookies.set("authToken", token, { expires: 7 });

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
                    <p className="text-red-600" key={key}>
                        {errors[key]}
                    </p>
                );
            })}
        </div>
    );

    return (
        <GuestLayout>
            <div className="mx-4">
                <h2 className="text-2xl font-bold mb-4 text-indigo-400">
                    Login
                </h2>

                {errors && errorView}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full border border-gray-300 rounded-md outline-none px-3 py-2"
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
                            className="w-full border border-gray-300 rounded-md outline-none px-3 py-2"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors"
                    >
                        Login
                    </button>

                    <p>
                        Don't have an account?
                        <Link
                            href="/auth/register"
                            className="px-2 text-indigo-500"
                        >
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </GuestLayout>
    );
};

export default Login;
