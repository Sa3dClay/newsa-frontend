import Link from "next/link";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const logout = () => {
        const confirmLogout = window.confirm(
            "Are you sure you want to logout?"
        );
        if (confirmLogout) {
            Cookies.remove("authToken");
            router.push("/auth/login");
        }
    };

    return (
        <nav className="bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <h2 className="text-indigo-400 font-bold text-xl tracking-wider">
                            NEWSA
                        </h2>
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:bg-gray-800 focus:text-white transition duration-150 ease-in-out"
                            aria-label="Main menu"
                            aria-expanded="false"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <svg
                                className={`${
                                    isOpen ? "hidden" : "block"
                                } h-6 w-6`}
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            <svg
                                className={`${
                                    isOpen ? "block" : "hidden"
                                } h-6 w-6`}
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div
                        className={`${
                            isOpen ? "block" : "hidden"
                        } sm:block sm:ml-6`}
                    >
                        <div className="flex items-center">
                            <Link
                                href="/articles"
                                className="px-3 py-2 mx-1 rounded-md text-sm font-medium text-gray-500 hover:text-white hover:bg-gray-800 focus:outline-none transition duration-150 ease-in-out"
                            >
                                Articles
                            </Link>
                            <Link
                                href="/settings"
                                className="px-3 py-2 mx-1 rounded-md text-sm font-medium text-gray-500 hover:text-white hover:bg-gray-800 focus:outline-none transition duration-150 ease-in-out"
                            >
                                Settings
                            </Link>
                            <a
                                className="px-3 py-2 mx-1 rounded-md text-sm font-medium text-red-400 hover:text-red-400 hover:bg-gray-800 focus:outline-none transition duration-150 ease-in-out cursor-pointer"
                                onClick={logout}
                            >
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
