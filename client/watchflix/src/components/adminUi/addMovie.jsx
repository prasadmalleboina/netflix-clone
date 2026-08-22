import { useState, useEffect } from "react";
import axios from "axios";
import adminBg from "../../assets/admin-bg.png";
import API_URL from "../../api";
export default function AddMovie() {

    const [genres, setGenres] = useState([]);

    const [genreId, setGenreId] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [year, setYear] = useState("");
    const [url, setUrl] = useState("");
    const [movieUrl, setMovieUrl] = useState("");
    const [bannerUrl, setBannerUrl] = useState("");
    const [rating, setRating] = useState("");

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {

        try {

            const res = await axios.get(
                `${API_URL}/api/admin/viewGenre`
            );

            setGenres(res.data.data || []);

            if (res.data.data?.length > 0) {
                setGenreId(res.data.data[0].id);
            }

        } catch (err) {

            console.log(err);

        }

    };


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


    const handleSubmit = async (e) => {

        e.preventDefault();

        const token = getCookie("token");

        console.log("Token:", token);

        try {

            const response = await axios.post(
                `${API_URL}/api/admin/addMovie`,
                {
                    title,
                    desc,
                    year: Number(year),

                    // Trailer URL
                    url,

                    // Actual movie URL
                    movieUrl,

                    bannerUrl,

                    rating: Number(rating),

                    genreId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            alert("Movie Added Successfully");

            console.log(response.data);


            // Clear form

            setTitle("");
            setDesc("");
            setYear("");
            setUrl("");
            setMovieUrl("");
            setBannerUrl("");
            setRating("");

        } catch (error) {

            console.log(error.response?.data);

            alert(
                error.response?.data?.message ||
                "Failed To Add Movie"
            );

        }

    };


    return (

        <div
            className="
                min-h-screen
                w-full
                flex
                items-center
                justify-center
                relative
                overflow-hidden
                py-10
            "
           style={{
    backgroundImage: `url(${adminBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
}}
        >


            {/* Background Overlay */}

            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(0,0,0,.7), rgba(0,0,0,.95))",
                }}
            />


            {/* Form */}

            <form
                onSubmit={handleSubmit}
                className="
                    relative
                    z-10
                    bg-gradient-to-b
                    from-black/80
                    to-red-900/80
                    p-8
                    rounded-lg
                    shadow-lg
                    w-full
                    max-w-lg
                    border
                    border-red-700
                "
            >


                <h1 className="
                    text-4xl
                    text-center
                    font-bold
                    text-red-600
                    mb-6
                ">
                    Add Movie
                </h1>


                {/* Genre */}

                <div className="mb-4">

                    <label className="text-white block mb-2">
                        Genre
                    </label>

                    <select
                        value={genreId}
                        onChange={(e) =>
                            setGenreId(e.target.value)
                        }
                        className="
                            w-full
                            p-3
                            rounded
                            bg-black
                            text-white
                            border
                            border-red-700
                        "
                    >

                        {genres.map((genre) => (

                            <option
                                key={genre.id}
                                value={genre.id}
                            >
                                {genre.name}
                            </option>

                        ))}

                    </select>

                </div>


                {/* Title */}

                <div className="mb-4">

                    <input
                        type="text"
                        placeholder="Movie Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        className="
                            w-full
                            p-3
                            rounded
                            bg-black
                            text-white
                            border
                            border-red-700
                        "
                    />

                </div>


                {/* Description */}

                <div className="mb-4">

                    <input
                        type="text"
                        placeholder="Description"
                        value={desc}
                        onChange={(e) =>
                            setDesc(e.target.value)
                        }
                        className="
                            w-full
                            p-3
                            rounded
                            bg-black
                            text-white
                            border
                            border-red-700
                        "
                    />

                </div>


                {/* Year */}

                <div className="mb-4">

                    <input
                        type="number"
                        placeholder="Release Year"
                        value={year}
                        onChange={(e) =>
                            setYear(e.target.value)
                        }
                        className="
                            w-full
                            p-3
                            rounded
                            bg-black
                            text-white
                            border
                            border-red-700
                        "
                    />

                </div>


                {/* Trailer URL */}

                <div className="mb-4">

                    <label className="text-gray-300 text-sm block mb-1">
                        Trailer URL
                    </label>

                    <input
                        type="text"
                        placeholder="YouTube Trailer URL"
                        value={url}
                        onChange={(e) =>
                            setUrl(e.target.value)
                        }
                        className="
                            w-full
                            p-3
                            rounded
                            bg-black
                            text-white
                            border
                            border-red-700
                        "
                    />

                </div>


                {/* Actual Movie URL */}

                <div className="mb-4">

                    <label className="text-gray-300 text-sm block mb-1">
                        Movie Video URL
                    </label>

                    <input
                        type="text"
                        placeholder="Authorized Movie Video URL"
                        value={movieUrl}
                        onChange={(e) =>
                            setMovieUrl(e.target.value)
                        }
                        className="
                            w-full
                            p-3
                            rounded
                            bg-black
                            text-white
                            border
                            border-red-700
                        "
                    />

                </div>


                {/* Banner URL */}

                <div className="mb-4">

                    <label className="text-gray-300 text-sm block mb-1">
                        Banner URL
                    </label>

                    <input
                        type="text"
                        placeholder="Movie Banner URL"
                        value={bannerUrl}
                        onChange={(e) =>
                            setBannerUrl(e.target.value)
                        }
                        className="
                            w-full
                            p-3
                            rounded
                            bg-black
                            text-white
                            border
                            border-red-700
                        "
                    />

                </div>


                {/* Rating */}

                <div className="mb-6">

                    <input
                        type="number"
                        placeholder="Rating"
                        value={rating}
                        onChange={(e) =>
                            setRating(e.target.value)
                        }
                        className="
                            w-full
                            p-3
                            rounded
                            bg-black
                            text-white
                            border
                            border-red-700
                        "
                    />

                </div>


                {/* Submit */}

                <button
                    type="submit"
                    className="
                        w-full
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        py-3
                        rounded
                        font-bold
                        transition
                    "
                >
                    Add Movie
                </button>

            </form>

        </div>

    );

}