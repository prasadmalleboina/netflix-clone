import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../api";
import Header from "../common/header";

export default function Profile() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);


    const getToken = () => {

        const cookies = document.cookie.split(";");

        for (let cookie of cookies) {

            cookie = cookie.trim();

            if (cookie.startsWith("token=")) {
                return cookie.substring("token=".length);
            }

        }

        return null;
    };


    const fetchProfile = async () => {

        try {

            const token = getToken();

            if (!token) {

                navigate("/signin");

                return;
            }

            const response = await axios.get(
                `${API_URL}/api/user/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Profile:", response.data);

            setUser(response.data.user);

        } catch (error) {

            console.log("Profile Fetch Error:", error);

            if (error.response?.status === 401) {
                navigate("/signin");
                return;
            }

            alert(
                error.response?.data?.message ||
                "Failed to load profile"
            );

        } finally {

            setLoading(false);

        }

    };


    if (loading) {

        return (
            <div className="
                min-h-screen
                bg-black
                text-white
                flex
                items-center
                justify-center
            ">

                <p className="text-xl text-gray-400">
                    Loading Profile...
                </p>

            </div>
        );

    }


    if (!user) {

        return (
            <div className="
                min-h-screen
                bg-black
                text-white
                flex
                flex-col
                items-center
                justify-center
                gap-4
            ">

                <h2 className="text-2xl font-bold">
                    Profile not available
                </h2>

                <button
                    onClick={() => navigate("/user/dashboard")}
                    className="
                        bg-white
                        text-black
                        px-6
                        py-3
                        rounded-md
                        font-bold
                    "
                >
                    Back to Home
                </button>

            </div>
        );

    }


    const joinedDate = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString()
        : "N/A";


    return (

        <div className="min-h-screen bg-black text-white">

            <Header />

            <main className="
                pt-28
                px-6
                md:px-10
                pb-20
            ">

                <div className="
                    max-w-4xl
                    mx-auto
                ">


                    {/* PAGE TITLE */}

                    <div className="mb-8">

                        <h1 className="
                            text-3xl
                            md:text-4xl
                            font-black
                        ">
                            Profile
                        </h1>

                        <p className="
                            text-gray-400
                            mt-2
                        ">
                            Manage your NETFLIX account
                        </p>

                    </div>



                    {/* PROFILE CARD */}

                    <div className="
                        bg-gray-900
                        border
                        border-gray-800
                        rounded-xl
                        overflow-hidden
                        shadow-2xl
                    ">


                        {/* TOP SECTION */}

                        <div className="
                            flex
                            flex-col
                            md:flex-row
                            items-center
                            md:items-start
                            gap-6
                            p-8
                            border-b
                            border-gray-800
                        ">


                            {/* AVATAR */}

                            <div className="
                                w-28
                                h-28
                                rounded-xl
                                bg-red-600
                                flex
                                items-center
                                justify-center
                                text-5xl
                                shadow-xl
                            ">
                                👤
                            </div>



                            {/* BASIC INFO */}

                            <div className="
                                text-center
                                md:text-left
                            ">

                                <h2 className="
                                    text-3xl
                                    font-bold
                                ">
                                    {user.name || "NETFLIX User"}
                                </h2>

                                <p className="
                                    text-gray-400
                                    mt-2
                                ">
                                    {user.email}
                                </p>

                                <span className="
                                    inline-block
                                    mt-4
                                    bg-red-600/20
                                    text-red-400
                                    border
                                    border-red-900
                                    px-3
                                    py-1
                                    rounded-full
                                    text-sm
                                    capitalize
                                ">
                                    {user.role}
                                </span>

                            </div>

                        </div>



                        {/* DETAILS */}

                        <div className="
                            grid
                            grid-cols-1
                            md:grid-cols-3
                            gap-6
                            p-8
                        ">


                            {/* MY LIST */}

                            <div className="
                                bg-black/50
                                rounded-lg
                                p-5
                                border
                                border-gray-800
                            ">

                                <p className="
                                    text-gray-500
                                    text-sm
                                ">
                                    My List
                                </p>

                                <p className="
                                    text-3xl
                                    font-black
                                    mt-2
                                ">
                                    {user.myListCount ?? 0}
                                </p>

                                <button
                                    onClick={() =>
                                        navigate("/user/my-list")
                                    }
                                    className="
                                        mt-4
                                        text-sm
                                        text-red-500
                                        hover:text-red-400
                                        font-semibold
                                    "
                                >
                                    View My List →
                                </button>

                            </div>



                            {/* ROLE */}

                            <div className="
                                bg-black/50
                                rounded-lg
                                p-5
                                border
                                border-gray-800
                            ">

                                <p className="
                                    text-gray-500
                                    text-sm
                                ">
                                    Account Type
                                </p>

                                <p className="
                                    text-xl
                                    font-bold
                                    mt-2
                                    capitalize
                                ">
                                    {user.role || "User"}
                                </p>

                            </div>



                            {/* JOINED */}

                            <div className="
                                bg-black/50
                                rounded-lg
                                p-5
                                border
                                border-gray-800
                            ">

                                <p className="
                                    text-gray-500
                                    text-sm
                                ">
                                    Member Since
                                </p>

                                <p className="
                                    text-xl
                                    font-bold
                                    mt-2
                                ">
                                    {joinedDate}
                                </p>

                            </div>

                        </div>



                        {/* ACTIONS */}

                        <div className="
                            border-t
                            border-gray-800
                            p-8
                            flex
                            flex-wrap
                            gap-3
                        ">

                            <button
                                onClick={() =>
                                    navigate("/user/dashboard")
                                }
                                className="
                                    bg-white
                                    text-black
                                    px-6
                                    py-3
                                    rounded-md
                                    font-bold
                                    hover:bg-gray-300
                                    transition
                                "
                            >
                                Back to Home
                            </button>

                            <button
                                onClick={() =>
                                    navigate("/user/my-list")
                                }
                                className="
                                    bg-gray-800
                                    text-white
                                    px-6
                                    py-3
                                    rounded-md
                                    font-bold
                                    hover:bg-gray-700
                                    transition
                                "
                            >
                                My List
                            </button>

                        </div>

                    </div>

                </div>

            </main>

        </div>

    );
}