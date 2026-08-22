import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../api";

import Header from "../common/header";

export default function Movies() {

    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [allMovies, setAllMovies] = useState([]);

    const [genres, setGenres] = useState([]);

    const [search, setSearch] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchMovies();
        fetchGenres();
    }, []);


    const fetchMovies = async () => {

        try {

            setLoading(true);

            const response = await axios.get(
                `${API_URL}/api/user/viewAllMovies`
            );

            const data = response.data.data || [];

            setMovies(data);
            setAllMovies(data);

        } catch (error) {

            console.log("Movies Fetch Error:", error);

        } finally {

            setLoading(false);

        }

    };


    const fetchGenres = async () => {

        try {

            const response = await axios.get(
                `${API_URL}/api/user/viewAllGenre`
            );

            setGenres(response.data.genres || []);

        } catch (error) {

            console.log("Genre Fetch Error:", error);

        }

    };


    const handleSearch = (value) => {

        setSearch(value);

        const query = value.toLowerCase().trim();

        let filtered = [...allMovies];


        if (selectedGenre) {

            filtered = filtered.filter(
                (movie) =>
                    movie.genre?.name === selectedGenre
            );

        }


        if (query) {

            filtered = filtered.filter(
                (movie) =>
                    movie.title
                        ?.toLowerCase()
                        .includes(query)
            );

        }


        setMovies(filtered);

    };


    const handleGenre = (genreName) => {

        setSelectedGenre(genreName);

        let filtered = [...allMovies];


        if (genreName) {

            filtered = filtered.filter(
                (movie) =>
                    movie.genre?.name === genreName
            );

        }


        if (search.trim()) {

            const query =
                search.toLowerCase().trim();

            filtered = filtered.filter(
                (movie) =>
                    movie.title
                        ?.toLowerCase()
                        .includes(query)
            );

        }


        setMovies(filtered);

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
                    Loading Movies...
                </p>

            </div>
        );

    }


    return (

        <div className="min-h-screen bg-black text-white">

            {/* HEADER */}

            <Header />


            <main className="
                pt-28
                px-6
                md:px-10
                pb-20
            ">


                {/* TITLE */}

                <div className="mb-8">

                    <h1 className="
                        text-3xl
                        md:text-4xl
                        font-black
                    ">
                        Movies
                    </h1>

                    <p className="
                        text-gray-400
                        mt-2
                    ">
                        Browse all movies available on NETFLIX
                    </p>

                </div>



                {/* SEARCH */}

                <div className="
                    mb-6
                    max-w-md
                    relative
                ">

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            handleSearch(e.target.value)
                        }
                        placeholder="Search movies..."
                        className="
                            w-full
                            bg-gray-900
                            border
                            border-gray-700
                            text-white
                            px-4
                            py-3
                            pr-10
                            rounded-md
                            outline-none
                            focus:border-white
                            transition
                        "
                    />

                    <span className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-gray-500
                    ">
                        🔍
                    </span>

                </div>



                {/* GENRES */}

                <div className="
                    flex
                    gap-2
                    overflow-x-auto
                    pb-8
                    no-scrollbar
                ">

                    <button
                        onClick={() =>
                            handleGenre("")
                        }
                        className={`
                            flex-shrink-0
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            font-semibold
                            transition

                            ${
                                selectedGenre === ""
                                    ? "bg-white text-black"
                                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }
                        `}
                    >
                        All
                    </button>


                    {genres.map((genre) => (

                        <button
                            key={genre.id}
                            onClick={() =>
                                handleGenre(genre.name)
                            }
                            className={`
                                flex-shrink-0
                                px-4
                                py-2
                                rounded-full
                                text-sm
                                font-semibold
                                transition

                                ${
                                    selectedGenre === genre.name
                                        ? "bg-white text-black"
                                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                }
                            `}
                        >
                            {genre.name}
                        </button>

                    ))}

                </div>



                {/* MOVIE COUNT */}

                <div className="
                    mb-5
                    text-gray-400
                    text-sm
                ">

                    {movies.length} Movies

                </div>



                {/* EMPTY RESULT */}

                {movies.length === 0 ? (

                    <div className="
                        min-h-[350px]
                        flex
                        flex-col
                        items-center
                        justify-center
                        text-center
                    ">

                        <div className="text-6xl mb-4">
                            🎬
                        </div>

                        <h2 className="
                            text-2xl
                            font-bold
                            mb-2
                        ">
                            No movies found
                        </h2>

                        <p className="text-gray-400">
                            Try another movie name or genre.
                        </p>

                    </div>

                ) : (

                    /* MOVIES GRID */

                    <div className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                        xl:grid-cols-5
                        gap-5
                    ">

                        {movies.map((movie) => (

                            <div
                                key={movie.id}
                                onClick={() =>
                                    navigate(
                                        `/user/movie/${movie.id}`
                                    )
                                }
                                className="
                                    group
                                    relative
                                    aspect-video
                                    rounded-md
                                    overflow-hidden
                                    bg-gray-900
                                    cursor-pointer
                                    transition-all
                                    duration-300
                                    hover:scale-105
                                    hover:z-20
                                    hover:shadow-2xl
                                "
                            >


                                {/* BANNER */}

                                {movie.bannerUrl ? (

                                    <img
                                        src={movie.bannerUrl}
                                        alt={movie.title}
                                        className="
                                            absolute
                                            inset-0
                                            w-full
                                            h-full
                                            object-cover
                                            transition-transform
                                            duration-500
                                            group-hover:scale-110
                                        "
                                    />

                                ) : (

                                    <div className="
                                        absolute
                                        inset-0
                                        flex
                                        items-center
                                        justify-center
                                        bg-gray-900
                                        text-gray-600
                                        text-sm
                                    ">
                                        No Banner
                                    </div>

                                )}



                                {/* GRADIENT */}

                                <div className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-black
                                    via-transparent
                                    to-black/20
                                "/>



                                {/* RATING */}

                                <div className="
                                    absolute
                                    top-2
                                    left-2
                                    bg-black/80
                                    px-2
                                    py-1
                                    rounded
                                    text-xs
                                    text-yellow-400
                                    font-semibold
                                ">
                                    ⭐ {movie.rating ?? "N/A"}
                                </div>



                                {/* PLAY */}

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
                                        shadow-xl
                                    ">
                                        ▶
                                    </div>

                                </div>



                                {/* INFO */}

                                <div className="
                                    absolute
                                    bottom-0
                                    left-0
                                    right-0
                                    p-3
                                    bg-gradient-to-t
                                    from-black
                                    to-transparent
                                ">

                                    <h2 className="
                                        text-base
                                        font-bold
                                        truncate
                                    ">
                                        {movie.title}
                                    </h2>


                                    <div className="
                                        flex
                                        items-center
                                        gap-2
                                        text-xs
                                        text-gray-300
                                        mt-1
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

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </div>

    );

}