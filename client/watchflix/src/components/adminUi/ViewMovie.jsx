import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewMovie() {

    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMovies();
    }, []);

    function getCookie(name) {
        const cookies = document.cookie.split(";");

        for (let cookie of cookies) {
            cookie = cookie.trim();

            if (cookie.startsWith(name + "=")) {
                return cookie.substring(name.length + 1);
            }
        }

        return null;
    }

    const fetchMovies = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8060/api/admin/viewMovies"
            );

            setMovies(response.data);

        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this movie?"
        );

        if (!confirmDelete) return;

        try {

            const token = getCookie("token");

            const response = await axios.patch(
                `http://localhost:8060/api/admin/deleteMovie/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(response.data.message);

            // Refresh movie list after delete
            fetchMovies();

        } catch (err) {

            console.log(err);

            alert(err.response?.data?.message || "Failed to delete movie");

        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">

            <h1 className="text-4xl text-red-600 font-bold text-center mb-8">
                All Movies
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {movies.map((movie) => (

                    <div
                        key={movie.id}
                        className="bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition duration-300"
                    >

                        <img
                            src={movie.bannerUrl}
                            alt={movie.title}
                            className="w-full h-60 object-cover"
                        />

                        <div className="p-4">

                            <h2 className="text-2xl font-bold text-red-500">
                                {movie.title}
                            </h2>

                            <p className="mt-2 text-gray-300">
                                {movie.desc}
                            </p>

                            <p className="mt-2">
                                <strong>Year :</strong> {movie.year}
                            </p>

                            <p>
                                <strong>Rating :</strong> ⭐ {movie.rating}
                            </p>

                            <p>
                                <strong>Genre :</strong> {movie.genre?.name}
                            </p>

                            <div className="flex gap-2 mt-5">

                                <a
                                    href={movie.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 text-center bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
                                >
                                    Watch
                                </a>

                                <button
                                    onClick={() =>
                                        navigate("/admin/edit-movie", {
                                            state: movie,
                                        })
                                    }
                                    className="flex-1 bg-yellow-500 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-600"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(movie.id)}
                                    className="flex-1 bg-red-800 text-white px-4 py-2 rounded font-semibold hover:bg-red-900"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}