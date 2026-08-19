import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewGenre() {

    const navigate = useNavigate();

    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchGenres = async () => {

        try {

            const response = await axios.get(
                "https://netflix-clone-backend.onrender.com/api/admin/viewGenre"
            );

            console.log("Genres:", response.data);

            setGenres(
                response.data.data ||
                response.data.genres ||
                []
            );

        } catch (error) {

            console.log("View Genre Error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to load genres"
            );

        } finally {

            setLoading(false);

        }

    };
    const handleDelete = async (genreId) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this genre?"
    );

    if (!confirmDelete) return;

    try {

        const cookies = document.cookie.split(";");

        let token = null;

        for (let cookie of cookies) {

            cookie = cookie.trim();

            if (cookie.startsWith("token=")) {
                token = cookie.substring("token=".length);
            }

        }

        if (!token) {
            alert("Admin login required");
            return;
        }

        const response = await axios.patch(
            "https://netflix-clone-backend.onrender.com/api/admin/deleteGenre",
            {
                id: genreId
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert(
            response.data.message ||
            "Genre deleted successfully"
        );

        setGenres((prevGenres) =>
            prevGenres.filter(
                (genre) => genre.id !== genreId
            )
        );

    } catch (error) {

        console.log("Delete Genre Error:", error);

        alert(
            error.response?.data?.message ||
            "Failed to delete genre"
        );

    }

};


    useEffect(() => {
        fetchGenres();
    }, []);


    return (

        <div className="min-h-screen bg-black text-white px-6 py-10">

            <div className="max-w-5xl mx-auto">

                <div className="flex items-center justify-between mb-8">

                    <div>
                        <h1 className="text-4xl font-black text-red-600">
                            View Genres
                        </h1>

                        <p className="text-gray-400 mt-2">
                            Manage all genres available in NETFLIX
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/admin/dashboard")}
                        className="
                            bg-gray-800
                            hover:bg-gray-700
                            px-5
                            py-2.5
                            rounded-md
                            font-semibold
                            transition
                        "
                    >
                        ← Dashboard
                    </button>

                </div>


                {loading ? (

                    <div className="text-gray-400 text-lg">
                        Loading genres...
                    </div>

                ) : genres.length === 0 ? (

                    <div className="
                        bg-gray-900
                        border
                        border-gray-800
                        rounded-xl
                        p-8
                        text-center
                        text-gray-400
                    ">
                        No genres found
                    </div>

                ) : (

                    <div className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                        gap-5
                    ">

                        {genres.map((genre) => (

                            <div
                                key={genre.id}
                                className="
                                    bg-gray-900
                                    border
                                    border-gray-800
                                    rounded-xl
                                    p-5
                                    shadow-lg
                                    hover:border-red-700
                                    transition
                                "
                            >

                               <div
    key={genre.id}
    className="
        bg-gray-900
        border
        border-gray-800
        rounded-xl
        p-5
        shadow-lg
        hover:border-red-700
        transition
    "
>

    <h2 className="
        text-xl
        font-bold
        text-white
    ">
        {genre.name}
    </h2>

    <button
        onClick={() => handleDelete(genre.id)}
        className="
            mt-4
            w-full
            bg-red-600
            hover:bg-red-700
            text-white
            py-2
            rounded-md
            font-semibold
            transition
        "
    >
        Delete
    </button>

</div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

}