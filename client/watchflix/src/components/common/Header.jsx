import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {

    const location = useLocation();
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const showUserNav =
        location.pathname === "/user/dashboard" ||
        location.pathname === "/user/movies" ||
        location.pathname === "/user/new-popular" ||
        location.pathname === "/user/my-list" ||
        location.pathname === "/user/profile";


    // ================= CHECK LOGIN =================

    useEffect(() => {

        const cookies = document.cookie.split(";");

        let token = null;

        for (let cookie of cookies) {

            cookie = cookie.trim();

            if (cookie.startsWith("token=")) {
                token = cookie.substring("token=".length);
            }

        }

        setIsLoggedIn(!!token);

    }, [location.pathname]);


    // ================= LOGOUT =================

    const handleLogout = () => {
        
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        setIsLoggedIn(false);

        navigate("/signin");

    };


    // ================= ACTIVE LINK =================

    const navClass = (path) => {

        return location.pathname === path
            ? "text-white font-semibold"
            : "text-gray-300 hover:text-white transition";

    };


    return (

        <header
            className="
                fixed
                top-0
                left-0
                right-0
                z-50
                h-20
                px-5
                md:px-10
                lg:px-12
                flex
                items-center
                justify-between
                bg-gradient-to-b
                from-black/95
                via-black/70
                to-transparent
            "
        >


            {/* ================= LEFT ================= */}

            <div className="flex items-center gap-7">


                {/* LOGO */}
                <Link
                    to={
                        isLoggedIn
                            ? "/user/dashboard"
                            : "/"
                    }
                    className="
                        flex
                        items-start
                        text-red-600
                        font-black
                        tracking-tight
                        hover:text-red-500
                        transition
                    "
                >
                    <span className="text-3xl md:text-4xl">
                        NETFLIX
                    </span>

                    <span className="
                        text-lg
                        md:text-xl
                        mt-0.5
                        ml-0.5
                    ">
                    </span>
                </Link>



                {/* ================= USER NAVIGATION ================= */}

                {showUserNav && isLoggedIn && (

                    <nav
                        className="
                            hidden
                            lg:flex
                            items-center
                            gap-5
                            text-sm
                        "
                    >


                        {/* HOME */}

                        <Link
                            to="/user/dashboard"
                            className={navClass(
                                "/user/dashboard"
                            )}
                        >
                            Home
                        </Link>


                        {/* MOVIES */}

                        <Link
                            to="/user/movies"
                            className={navClass(
                                "/user/movies"
                            )}
                        >
                            Movies
                        </Link>


                        {/* NEW & POPULAR */}

                        <Link
                            to="/user/new-popular"
                            className={navClass(
                                "/user/new-popular"
                            )}
                        >
                            New & Popular
                        </Link>


                        {/* MY LIST */}

                        <Link
                            to="/user/my-list"
                            className={navClass(
                                "/user/my-list"
                            )}
                        >
                            My List
                        </Link>

                    </nav>

                )}

            </div>



            {/* ================= RIGHT ================= */}

            <div
                className="
                    flex
                    items-center
                    gap-3
                    md:gap-4
                "
            >


                {/* LANGUAGE */}

                <select
                    className="
                        hidden
                        md:block
                        bg-black/50
                        text-white
                        border
                        border-gray-700
                        rounded-md
                        outline-none
                        text-sm
                        px-3
                        py-1.5
                        cursor-pointer
                        hover:border-gray-500
                        transition
                    "
                    defaultValue="English"
                >
                    <option className="bg-black">
                        English
                    </option>

                    <option className="bg-black">
                        Telugu
                    </option>

                    <option className="bg-black">
                        Hindi
                    </option>
                </select>



                {/* ================= LOGGED IN ================= */}

                {isLoggedIn ? (

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >


                        {/* SEARCH */}

                        {showUserNav && (

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/user/movies")
                                }
                                className="
                                    hidden
                                    sm:flex
                                    items-center
                                    justify-center
                                    w-9
                                    h-9
                                    rounded-full
                                    hover:bg-white/10
                                    transition
                                "
                                title="Search Movies"
                            >
                                🔍
                            </button>

                        )}



                        {/* NOTIFICATION */}

                        {showUserNav && (

                            <button
                                type="button"
                                className="
                                    hidden
                                    sm:flex
                                    items-center
                                    justify-center
                                    w-9
                                    h-9
                                    rounded-full
                                    hover:bg-white/10
                                    transition
                                "
                                title="Notifications"
                            >
                                🔔
                            </button>

                        )}



                        {/* PROFILE */}

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/user/profile")
                            }
                            className={`
                                w-9
                                h-9
                                rounded-md
                                flex
                                items-center
                                justify-center
                                font-bold
                                transition

                                ${
                                    location.pathname ===
                                    "/user/profile"
                                        ? "bg-white text-black"
                                        : "bg-red-600 text-white hover:bg-red-700"
                                }
                            `}
                            title="Profile"
                        >
                            👤
                        </button>



                        {/* LOGOUT */}

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="
                                bg-gray-800/90
                                hover:bg-red-600
                                text-white
                                px-3
                                md:px-4
                                py-2
                                rounded-md
                                text-sm
                                font-semibold
                                transition
                            "
                        >
                            Logout
                        </button>

                    </div>

                ) : (

                    /* ================= SIGN IN ================= */

                    <Link
                        to="/signin"
                        className="
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            px-4
                            py-2
                            rounded-md
                            text-sm
                            font-semibold
                            transition
                        "
                    >
                        Sign In
                    </Link>

                )}

            </div>

        </header>

    );

}