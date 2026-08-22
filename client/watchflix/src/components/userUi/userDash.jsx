import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../api";

import Header from "../common/Header";
import HeroBanner from "./HeroBanner";
import MovieRow from "./MovieRow";

export default function UserDash() {

    const [movies, setMovies] = useState([]);
    const [allMovies, setAllMovies] = useState([]);

    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");

    const [search, setSearch] = useState("");

    const [continueWatching, setContinueWatching] = useState([]);


    useEffect(() => {

        fetchMovies();

        fetchGenres();

        fetchContinueWatching();

    }, []);


    // ================= GET TOKEN =================

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


    // ================= FETCH MOVIES =================

    const fetchMovies = async () => {

    try {

        const response =  await axios.get(
    `${API_URL}/api/user/viewAllMovies`
);

        console.log("MOVIES RESPONSE:", response.data);

        const data =
            response.data.data ||
            response.data.movies ||
            [];

        setMovies(data);
        setAllMovies(data);

    } catch (error) {

        console.log("Movie fetch error:", error);

    }

};


    // ================= FETCH GENRES =================

    const fetchGenres = async () => {

        try {

            const response =await axios.get(
    `${API_URL}/api/user/viewAllGenres`
);

            setGenres(
                response.data.genres || []
            );

        } catch (error) {

            console.log(
                "Genre fetch error:",
                error
            );

        }

    };


    // ================= CONTINUE WATCHING =================

    const fetchContinueWatching = async () => {

        try {

            const token = getToken();

            if (!token) {

                setContinueWatching([]);

                return;

            }

            const response =  await axios.get(
    `${API_URL}/api/user/continue-watching`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
);

            console.log(
                "Continue Watching:",
                response.data
            );


            const items =
                response.data.data || [];


            /*
                Backend returns:

                [
                    {
                        id,
                        userId,
                        movieId,
                        watchedAt,
                        movie: {...}
                    }
                ]

                MovieRow needs only movie objects.
            */

            const watchedMovies = items
                .filter((item) => item.movie)
                .map((item) => ({
                    ...item.movie,

                    watchProgress: Number(item.progress || 0),
                    watchDuration: Number(item.duration || 0),

                    isContinueWatching: true,
                }));

            setContinueWatching(watchedMovies);

        } catch (error) {

            console.log(
                "Continue Watching Fetch Error:",
                error
            );

        }

    };


   // ================= FILTER BY GENRE =================

const filterByGenre = async (genreName) => {

    try {

        setSelectedGenre(genreName);
        setSearch("");

        if (!genreName) {
            setMovies(allMovies);
            return;
        }

        const response = await axios.get(
            `${API_URL}/api/user/moviesByGenre/${genreName}`
        );

        setMovies(
            response.data.movies || []
        );

    } catch (error) {

        console.log(
            "Genre filter error:",
            error
        );

    }

};


// ================= SEARCH MOVIES =================

const searchMovies = async (value) => {

    setSearch(value);

    if (!value.trim()) {

        if (selectedGenre) {

            try {

                const response = await axios.get(
                    `${API_URL}/api/user/moviesByGenre/${selectedGenre}`
                );

                setMovies(
                    response.data.movies || []
                );

            } catch (error) {

                console.log(
                    "Genre restore error:",
                    error
                );

            }

        } else {

            setMovies(allMovies);

        }

        return;

    }


    try {

        const response = await axios.get(
            `${API_URL}/api/user/searchMovies?search=${encodeURIComponent(value)}`
        );

        let searchedMovies =
            response.data.data || [];

        if (selectedGenre) {

            searchedMovies =
                searchedMovies.filter(
                    (movie) =>
                        movie.genre?.name === selectedGenre
                );

        }

        setMovies(searchedMovies);

    } catch (error) {

        console.log(
            "Search error:",
            error
        );

    }

};
    // ================= ROW DATA =================


    const trendingMovies =
        movies.slice(0, 10);


    const popularMovies =
        [...movies]
            .sort(
                (a, b) =>
                    (b.rating || 0) -
                    (a.rating || 0)
            )
            .slice(0, 10);


    const topRatedMovies =
        [...movies]
            .sort(
                (a, b) =>
                    (b.rating || 0) -
                    (a.rating || 0)
            )
            .slice(0, 10);


    // ================= UI =================

    return (

        <div className="min-h-screen bg-black text-white">


            {/* ================= HEADER ================= */}
            <Header />

{/* ================= HERO ================= */}

<HeroBanner
    movies={allMovies.slice(0, 5)}
/>

            {/* ================= MAIN CONTENT ================= */}

           <main className="relative z-10 pt-6 md:pt-8 pb-16">


                {/* ================= SEARCH ================= */}

                <div className="
                    px-6
                    md:px-10
                    mb-5
                    flex
                    justify-between
                    items-center
                    gap-4
                ">

                    <div className="
                        relative
                        w-full
                        max-w-sm
                    ">

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                searchMovies(
                                    e.target.value
                                )
                            }
                            placeholder="Search movies..."
                            className="
                                w-full
                                bg-gray-900/80
                                border
                                border-gray-700
                                hover:border-gray-500
                                text-white
                                rounded-md
                                px-4
                                py-2.5
                                pr-10
                                text-sm
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
                            text-gray-400
                        ">
                            🔍
                        </span>

                    </div>

                </div>



                {/* ================= GENRES ================= */}

                <div
                    className="
                        flex
                        gap-2
                        overflow-x-auto
                        px-6
                        md:px-10
                        pb-8
                        scrollbar-hide
                    "
                >


                    {/* ALL */}

                    <button
                        onClick={() =>
                            filterByGenre("")
                        }
                        className={`
                            flex-shrink-0
                            px-4
                            py-1.5
                            rounded-full
                            text-sm
                            font-medium
                            transition

                            ${
                                selectedGenre === ""
                                    ? "bg-white text-black"
                                    : "bg-gray-800 text-gray-200 hover:bg-gray-700"
                            }
                        `}
                    >
                        All
                    </button>



                    {/* GENRES */}

                    {genres.map((genre) => (

                        <button
                            key={genre.id}
                            onClick={() =>
                                filterByGenre(
                                    genre.name
                                )
                            }
                            className={`
                                flex-shrink-0
                                px-4
                                py-1.5
                                rounded-full
                                text-sm
                                font-medium
                                transition

                                ${
                                    selectedGenre ===
                                    genre.name
                                        ? "bg-white text-black"
                                        : "bg-gray-800 text-gray-200 hover:bg-gray-700"
                                }
                            `}
                        >

                            {genre.name}

                        </button>

                    ))}

                </div>



                {/* ================= CONTINUE WATCHING ================= */}

                {continueWatching.length > 0 && (

                    <MovieRow
                        title="▶ Continue Watching"
                        movies={
                            continueWatching
                        }
                    />

                )}



                {/* ================= TRENDING ================= */}

                <MovieRow
                    title="🔥 Trending Now"
                    movies={
                        trendingMovies
                    }
                />



                {/* ================= TOP RATED ================= */}

                <MovieRow
                    title="⭐ Top Rated"
                    movies={
                        topRatedMovies
                    }
                />



                {/* ================= POPULAR ================= */}

                <MovieRow
                    title="🎬 Popular Movies"
                    movies={
                        popularMovies
                    }
                />


            </main>

        </div>

    );

}