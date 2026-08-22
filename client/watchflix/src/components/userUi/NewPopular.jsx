import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../api";

import Header from "../common/header";
import MovieRow from "./MovieRow";

export default function NewPopular() {

    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {

        try {

            const response = await axios.get(
               `${API_URL}/api/user/viewAllMovies`
            );

            setMovies(response.data.data || []);

        } catch (error) {

            console.log("New & Popular Fetch Error:", error);

        } finally {

            setLoading(false);

        }

    };

    const newestMovies = [...movies]
    .sort((a, b) => {
        return (b.year || 0) - (a.year || 0);
    })
    .slice(0, 10);

    const topRatedMovies = [...movies]
        .sort((a, b) => {
            return (b.rating || 0) - (a.rating || 0);
        })
        .slice(0, 10);

    if (loading) {

        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p className="text-xl text-gray-400">
                    Loading New & Popular...
                </p>
            </div>
        );

    }

    return (

        <div className="min-h-screen bg-black text-white">

            <Header />

            <main className="pt-28 pb-20">

                <div className="px-6 md:px-10 mb-10">

                    <h1 className="text-3xl md:text-4xl font-black">
                        New & Popular
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Discover the latest and top-rated movies on NETFLIX.
                    </p>

                </div>

                <MovieRow
                    title="🆕 New Releases"
                    movies={newestMovies}
                />

                <MovieRow
                    title="🔥 Popular Now"
                    movies={topRatedMovies}
                />

                <div className="px-6 md:px-10 mt-8">

                    <button
                        onClick={() => navigate("/user/movies")}
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
                        Browse All Movies
                    </button>

                </div>

            </main>

        </div>

    );
}