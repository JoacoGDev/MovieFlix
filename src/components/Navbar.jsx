import { Link, useLocation } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar() {
    const { pathname } = useLocation();


    const [searchParams, setSearchParams] = useSearchParams();
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        console.log("effect fired, inputValue:", inputValue)
        const timer = setTimeout(() => {
            setSearchParams({ query: inputValue });
        }, 400);

        return () => clearTimeout(timer);
    }, [inputValue])

    const links = [
        { to: "/", label: "Movies" },
        { to: "/favorites", label: "Favorites" },
    ];

    return (
        <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">
            <nav className="max-w-6xl mx-auto bg-[#0d1b2a] rounded-2xl px-6 h-14 flex items-center justify-between shadow-lg shadow-black/40">

                {/* Logo */}
                <Link to="/" className="shrink-0 flex items-center">
                    <img
                        src="/src/assets/movieflix-logo-dark.svg"
                        alt="MovieFlix"
                        className="h-8 w-auto object-contain"
                    />
                </Link>

                {/* Nav links */}
                <ul className="flex items-center gap-6">
                    {links.map(({ to, label }) => (
                        <li key={to}>
                            <Link
                                to={to}
                                className={`text-sm transition-colors ${pathname === to
                                    ? "text-white font-semibold"
                                    : "text-zinc-400 hover:text-white font-medium"
                                    }`}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <SearchBar onSearch={setInputValue} />

            </nav>
        </div>
    );
}

export default Navbar;