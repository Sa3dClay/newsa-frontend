import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { baseUrl } from "@/env";
import { useRouter } from "next/router";
import React, { useState } from "react";
import GuestLayout from "@/layouts/GuestLayout";

const Register = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLoading) return;

        setIsLoading(true);
        setErrors([]);

        if (password !== passwordConfirmation) {
            alert("Passwords do not match");
            return;
        }

        axios
            .post(baseUrl + "/auth/register", {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            })
            .then((response) => {
                const token = response.data.token;

                Cookies.set("authToken", token, { expires: 7 });

                router.push("/");

                clearFormData();
            })
            .catch((error) => {
                console.log(error.response);

                setIsLoading(false);
                setErrors(error.response.data.errors);
            });
    };

    const clearFormData = () => {
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
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
                    Registration
                </h2>

                {errors && errorView}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="block mb-1">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="w-full border border-gray-300 outline-none rounded-md px-3 py-2"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full border border-gray-300 outline-none rounded-md px-3 py-2"
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
                                className="w-full border border-gray-300 outline-none rounded-md px-3 py-2"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className="block mb-1"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                className="w-full border border-gray-300 outline-none rounded-md px-3 py-2"
                                placeholder="Confirm your password"
                                value={passwordConfirmation}
                                onChange={(e) =>
                                    setPasswordConfirmation(e.target.value)
                                }
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors disabled:bg-gray-300"
                    >
                        Register
                    </button>

                    <p>
                        Already have an account?
                        <Link
                            href="/auth/login"
                            className="px-2 text-indigo-500"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </GuestLayout>
    );
};

export default Register;
