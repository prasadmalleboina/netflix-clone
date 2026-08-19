import { Link, useNavigate } from "react-router-dom";
import adminBg from "../../assets/admin-bg.png";
export default function AdminDash() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        navigate("/signin");
    };

    return (
        <div
            className="
                min-h-screen
                w-full
                flex
                flex-col
                items-center
                justify-center
                relative
                overflow-hidden
            "
           style={{
                    backgroundImage: `url(${adminBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
        >

            {/* Vignette Overlay */}

            <div
                className="
                    absolute
                    inset-0
                    pointer-events-none
                "
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.95) 100%)",
                }}
            ></div>


            {/* Dashboard Box */}

            <div
                className="
                    relative
                    z-10
                    p-8
                    bg-gradient-to-b
                    from-black/80
                    to-red-900/80
                    rounded-lg
                    shadow-lg
                    w-full
                    max-w-2xl
                    border
                    border-red-700
                "
            >

                <h1
                    className="
                        text-4xl
                        font-bold
                        text-red-600
                        mb-8
                        text-center
                    "
                >
                    Admin Dashboard
                </h1>


                {/* Navigation */}

                <nav>

                    <ul
                        className="
                            grid
                            grid-cols-1
                            gap-6
                            sm:grid-cols-2
                        "
                    >

                        <li>
                            <Link
                                to="/admin/add-movie"
                                className="
                                    block
                                    px-6
                                    py-3
                                    bg-red-600
                                    text-white
                                    text-center
                                    rounded-lg
                                    font-semibold
                                    shadow
                                    hover:bg-red-700
                                    transition-colors
                                "
                            >
                                Add Movie
                            </Link>
                        </li>


                        <li>
                            <Link
                                to="/admin/view-movie"
                                className="
                                    block
                                    px-6
                                    py-3
                                    bg-red-600
                                    text-white
                                    text-center
                                    rounded-lg
                                    font-semibold
                                    shadow
                                    hover:bg-red-700
                                    transition-colors
                                "
                            >
                                View Movie
                            </Link>
                        </li>


                        <li>
                            <Link
                                to="/admin/add-genre"
                                className="
                                    block
                                    px-6
                                    py-3
                                    bg-red-600
                                    text-white
                                    text-center
                                    rounded-lg
                                    font-semibold
                                    shadow
                                    hover:bg-red-700
                                    transition-colors
                                "
                            >
                                Add Genre
                            </Link>
                        </li>


                        <li>
                            <Link
                                to="/admin/view-genre"
                                className="
                                    block
                                    px-6
                                    py-3
                                    bg-red-600
                                    text-white
                                    text-center
                                    rounded-lg
                                    font-semibold
                                    shadow
                                    hover:bg-red-700
                                    transition-colors
                                "
                            >
                                View Genre
                            </Link>
                        </li>


                        <li>
                            <Link
                                to="/admin/view-all-users"
                                className="
                                    block
                                    px-6
                                    py-3
                                    bg-red-600
                                    text-white
                                    text-center
                                    rounded-lg
                                    font-semibold
                                    shadow
                                    hover:bg-red-700
                                    transition-colors
                                "
                            >
                                View All Users
                            </Link>
                        </li>


                        <li>
                            <Link
                                to="/admin/change-password"
                                className="
                                    block
                                    px-6
                                    py-3
                                    bg-red-600
                                    text-white
                                    text-center
                                    rounded-lg
                                    font-semibold
                                    shadow
                                    hover:bg-red-700
                                    transition-colors
                                "
                            >
                                Change Password
                            </Link>
                        </li>

                    </ul>

                </nav>


                {/* Logout */}

                <button
                    type="button"
                    onClick={handleLogout}
                    className="
                        mt-6
                        w-full
                        px-6
                        py-3
                        bg-gray-800
                        text-white
                        text-center
                        rounded-lg
                        font-semibold
                        hover:bg-red-700
                        transition-colors
                    "
                >
                    Logout
                </button>

            </div>

        </div>
    );
}