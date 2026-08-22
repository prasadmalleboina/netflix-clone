import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../common/header";
import API_URL from "../../api";

export default function MyList() {

    const navigate = useNavigate();

    const [myList, setMyList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyList();
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


    const fetchMyList = async () => {

        try {

            const token = getToken();

            if (!token) {
                alert("Please login first");
                navigate("/signin");
                return;
            }

            const response = await axios.get(
                `${API_URL}/api/user/myList`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("My List:", response.data);

            setMyList(response.data.data || []);

        } catch (error) {

            console.log("My List Fetch Error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to load My List"
            );

        } finally {

            setLoading(false);

        }

    };


    const removeMovie = async (movieId) => {

        try {

            const token = getToken();

            if (!token) {
                navigate("/signin");
                return;
            }

            await axios.delete(
               `${API_URL}/api/user/removeFromMyList/${movieId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMyList((prev) =>
                prev.filter(
                    (item) => item.movie.id !== movieId
                )
            );

        } catch (error) {

            console.log("Remove My List Error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to remove movie"
            );

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
                    Loading My List...
                </p>
            </div>
        );

    }


    return (

        <div className="min-h-screen bg-black text-white">

            {/* HEADER */}
            <Header />

            <main className="pt-28 px-6 md:px-10 pb-16">

                {/* TITLE */}

                <div className="mb-8">

                    <h1 className="
                        text-3xl
                        md:text-4xl
                        font-black
                    ">
                        My List
                    </h1>

                    <p className="
                        text-gray-400
                        mt-2
                    ">
                        Movies you saved to watch later
                    </p>

                </div>


                {/* EMPTY LIST */}

                {myList.length === 0 ? (

                    <div className="
                        min-h-[400px]
                        flex
                        flex-col
                        items-center
                        justify-center
                        text-center
                    ">

                        <div className="text-6xl mb-5">
                            🎬
                        </div>

                        <h2 className="
                            text-2xl
                            font-bold
                            mb-3
                        ">
                            Your My List is empty
                        </h2>

                        <p className="
                            text-gray-400
                            mb-6
                        ">
                            Add movies from Movie Details to see them here.
                        </p>

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
                            Browse Movies
                        </button>

                    </div>

                ) : (

                    /* MOVIE GRID */

                    <div className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                        xl:grid-cols-5
                        gap-6
                    ">

                        {myList.map((item) => {

                            const movie = item.movie;

                            return (

                                <div
                                    key={item.id}
                                    className="
                                        group
                                        relative
                                        bg-gray-900
                                        rounded-lg
                                        overflow-hidden
                                        cursor-pointer
                                        transition
                                        duration-300
                                        hover:scale-105
                                    "
                                >

                                    {/* BANNER */}

                                    <div
                                        onClick={() =>
                                            navigate(
                                                `/user/movie/${movie.id}`
                                            )
                                        }
                                        className="
                                            relative
                                            aspect-video
                                            bg-gray-800
                                        "
                                    >

                                        {movie.bannerUrl ? (

                                            <img
                                                src={movie.bannerUrl}
                                                alt={movie.title}
                                                className="
                                                    w-full
                                                    h-full
                                                    object-cover
                                                "
                                            />

                                        ) : (

                                            <div className="
                                                w-full
                                                h-full
                                                flex
                                                items-center
                                                justify-center
                                                text-gray-500
                                            ">
                                                No Banner
                                            </div>

                                        )}


                                        {/* DARK OVERLAY */}

                                        <div className="
                                            absolute
                                            inset-0
                                            bg-black/20
                                            group-hover:bg-black/40
                                            transition
                                        " />


                                        {/* PLAY ICON */}

                                        <div className="
                                            absolute
                                            inset-0
                                            flex
                                            items-center
                                            justify-center
                                            opacity-0
                                            group-hover:opacity-100
                                            transition
                                        ">

                                            <div className="
                                                w-12
                                                h-12
                                                rounded-full
                                                bg-white
                                                text-black
                                                flex
                                                items-center
                                                justify-center
                                                text-xl
                                            ">
                                                ▶
                                            </div>

                                        </div>

                                    </div>


                                    {/* MOVIE INFO */}

                                    <div className="p-4">

                                        <h2 className="
                                            text-lg
                                            font-bold
                                            truncate
                                        ">
                                            {movie.title}
                                        </h2>


                                        <div className="
                                            flex
                                            items-center
                                            gap-2
                                            mt-2
                                            text-sm
                                            text-gray-400
                                        ">

                                            {movie.year && (
                                                <span>
                                                    {movie.year}
                                                </span>
                                            )}

                                            {movie.genre?.name && (
                                                <>
                                                    <span>•</span>

                                                    <span>
                                                        {movie.genre.name}
                                                    </span>
                                                </>
                                            )}

                                        </div>


                                        {/* RATING */}

                                        <p className="
                                            mt-2
                                            text-yellow-400
                                            font-semibold
                                        ">
                                            ⭐ {movie.rating ?? "N/A"}
                                        </p>


                                        {/* REMOVE */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeMovie(movie.id)
                                            }
                                            className="
                                                mt-4
                                                w-full
                                                bg-gray-800
                                                hover:bg-red-600
                                                text-white
                                                py-2
                                                rounded-md
                                                font-semibold
                                                transition
                                            "
                                        >
                                            Remove from My List
                                        </button>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}

            </main>

        </div>

    );

}