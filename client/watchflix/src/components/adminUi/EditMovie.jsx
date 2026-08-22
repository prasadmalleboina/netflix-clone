import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_URL from "../../api";

export default function EditMovie() {

    const { state } = useLocation();
    const navigate = useNavigate();

    const [title, setTitle] = useState(state?.title || "");
    const [desc, setDesc] = useState(state?.desc || "");
    const [year, setYear] = useState(state?.year || "");

    // Trailer URL
    const [url, setUrl] = useState(state?.url || "");

    // Actual Movie URL
    const [movieUrl, setMovieUrl] = useState(state?.movieUrl || "");

    const [bannerUrl, setBannerUrl] = useState(state?.bannerUrl || "");
    const [rating, setRating] = useState(state?.rating || "");


    function getCookie(name) {

        const cookies = document.cookie.split(";");

        for (let cookie of cookies) {

            const c = cookie.trim();

            if (c.startsWith(name + "=")) {
                return c.substring(name.length + 1);
            }

        }

        return null;
    }


    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            const token = getCookie("token");

            console.log("Token :", token);
            console.log("Cookies :", document.cookie);

            if (!token) {

                alert("Admin Login Required");

                navigate("/signin");

                return;

            }


            const response = await axios.put(

                `${API_URL}/api/admin/editMovie`,

                {
                    id: state.id,

                    title,

                    desc,

                    year: parseInt(year),

                    // Trailer URL
                    url,

                    // Actual Movie URL
                    movieUrl,

                    bannerUrl,

                    rating: parseInt(rating),

                    genreId: state.genreId,
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );


            console.log(response.data);

            alert("Movie Updated Successfully");

            navigate("/admin/view-movie");


        } catch (err) {

            console.log(err);

            if (err.response) {

                console.log(err.response.data);

                alert(
                    err.response.data.message ||
                    err.response.data.error ||
                    "Update Failed"
                );

            } else {

                alert("Server Error");

            }

        }

    };


    return (

        <div className="
            min-h-screen
            bg-black
            flex
            justify-center
            items-center
            py-10
        ">

            <form
                onSubmit={handleUpdate}
                className="
                    bg-gray-900
                    p-8
                    rounded-lg
                    w-[500px]
                    space-y-4
                "
            >

                <h1 className="
                    text-4xl
                    text-red-600
                    font-bold
                    text-center
                    mb-6
                ">
                    Edit Movie
                </h1>


                {/* Movie Title */}

                <input
                    type="text"
                    className="
                        w-full
                        p-3
                        rounded
                        bg-gray-800
                        text-white
                    "
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    placeholder="Movie Title"
                />


                {/* Description */}

                <textarea
                    className="
                        w-full
                        p-3
                        rounded
                        bg-gray-800
                        text-white
                    "
                    value={desc}
                    onChange={(e) =>
                        setDesc(e.target.value)
                    }
                    placeholder="Description"
                />


                {/* Year */}

                <input
                    type="number"
                    className="
                        w-full
                        p-3
                        rounded
                        bg-gray-800
                        text-white
                    "
                    value={year}
                    onChange={(e) =>
                        setYear(e.target.value)
                    }
                    placeholder="Year"
                />


                {/* Trailer URL */}

                <div>

                    <label className="
                        text-gray-400
                        text-sm
                        block
                        mb-1
                    ">
                        Trailer URL
                    </label>

                    <input
                        type="text"
                        className="
                            w-full
                            p-3
                            rounded
                            bg-gray-800
                            text-white
                        "
                        value={url}
                        onChange={(e) =>
                            setUrl(e.target.value)
                        }
                        placeholder="YouTube Trailer URL"
                    />

                </div>


                {/* Actual Movie URL */}

                <div>

                    <label className="
                        text-gray-400
                        text-sm
                        block
                        mb-1
                    ">
                        Movie Video URL
                    </label>

                    <input
                        type="text"
                        className="
                            w-full
                            p-3
                            rounded
                            bg-gray-800
                            text-white
                        "
                        value={movieUrl}
                        onChange={(e) =>
                            setMovieUrl(e.target.value)
                        }
                        placeholder="Authorized Movie Video URL"
                    />

                </div>


                {/* Banner URL */}

                <div>

                    <label className="
                        text-gray-400
                        text-sm
                        block
                        mb-1
                    ">
                        Banner URL
                    </label>

                    <input
                        type="text"
                        className="
                            w-full
                            p-3
                            rounded
                            bg-gray-800
                            text-white
                        "
                        value={bannerUrl}
                        onChange={(e) =>
                            setBannerUrl(e.target.value)
                        }
                        placeholder="Banner URL"
                    />

                </div>


                {/* Rating */}

                <input
                    type="number"
                    className="
                        w-full
                        p-3
                        rounded
                        bg-gray-800
                        text-white
                    "
                    value={rating}
                    onChange={(e) =>
                        setRating(e.target.value)
                    }
                    placeholder="Rating"
                />


                {/* Update */}

                <button
                    type="submit"
                    className="
                        w-full
                        bg-red-600
                        text-white
                        py-3
                        rounded
                        hover:bg-red-700
                        font-bold
                        transition
                    "
                >
                    Update Movie
                </button>

            </form>

        </div>

    );

}