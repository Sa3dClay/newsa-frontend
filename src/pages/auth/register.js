import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const Register = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    useEffect(() => {
        const authToken = Cookies.get("authToken");
        if (authToken) {
            router.push("/");
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors([]);

        if (password !== passwordConfirmation) {
            alert("Passwords do not match");
            return;
        }

        axios
            .post("http://127.0.0.1:8000/api/auth/register", {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
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
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
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
            <div className="mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Registration</h2>

                {errors && errorView}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex space-x-4">
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
                    </div>

                    <div className="flex space-x-4">
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
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
