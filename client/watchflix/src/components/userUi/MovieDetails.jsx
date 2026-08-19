import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function MovieDetails() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [inMyList, setInMyList] = useState(false);
    const [myListLoading, setMyListLoading] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [ratingLoading, setRatingLoading] = useState(false);

    const [movie, setMovie] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);

    useEffect(() => {
    fetchMovie();
    checkMyListStatus();
}, [id]);

    const fetchMovie = async () => {

        try {

            const response = await axios.get(
                `https://netflix-clone-backend.onrender.com/api/user/viewMovie/${id}`
            );

            console.log("Movie Details:", response.data);

            setMovie(response.data.movie);

        } catch (error) {

            console.log("Movie fetch error:", error);

        }

    };
    const checkMyListStatus = async () => {
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
            setInMyList(false);
            return;
        }

        const response = await axios.get(
            `https://netflix-clone-backend.onrender.com/api/user/mylist/check/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setInMyList(response.data.inMyList);

    } catch (error) {
        console.log("Check My List Status Error:", error);
    }
};
    const handleMyList = async () => {

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
            alert("Please login first");
            navigate("/signin");
            return;
        }

        setMyListLoading(true);

        const response = await axios.post(
            `https://netflix-clone-backend.onrender.com/api/user/mylist/${movie.id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("My List Response:", response.data);

        setInMyList(true);

        alert("Movie added to My List ❤️");

    } catch (error) {

        console.log("My List Error:", error);

        if (error.response?.data?.message) {

            alert(error.response.data.message);

        } else {

            alert("Failed to add movie to My List");

        }

    } finally {

        setMyListLoading(false);

    }

};
const handlePlayMovie = () => {

    navigate("/watch", {
        state: movie,
    });

};
const handleRating = async () => {
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
            alert("Please login first");
            navigate("/signin");
            return;
        }

        if (!selectedRating) {
            alert("Please select a rating");
            return;
        }

        setRatingLoading(true);

        const response = await axios.post(
            `https://netflix-clone-backend.onrender.com/api/user/rating/${movie.id}`,
            {
                score: selectedRating,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("Rating Response:", response.data);

        alert("Rating submitted successfully ⭐");

        fetchMovie();

    } catch (error) {
        console.log("Rating Error:", error);

        alert(
            error.response?.data?.message ||
            "Failed to submit rating"
        );
    } finally {
        setRatingLoading(false);
    }
};
    // Loading

    if (!movie) {

        return (
            <div className="
                min-h-screen
                bg-black
                flex
                items-center
                justify-center
                text-white
            ">

                <div className="text-xl text-gray-400">
                    Loading movie...
                </div>

            </div>
        );

    }


    // YouTube URL conversion

    const getYoutubeEmbedUrl = (url) => {

        if (!url) return null;

        try {

            // Normal YouTube URL

            if (url.includes("watch?v=")) {

                const videoId =
                    new URL(url).searchParams.get("v");

                return `https://www.youtube.com/embed/${videoId}`;

            }


            // Short YouTube URL

            if (url.includes("youtu.be/")) {

                const videoId =
                    url.split("youtu.be/")[1].split("?")[0];

                return `https://www.youtube.com/embed/${videoId}`;

            }


            // Already embed URL

            if (url.includes("youtube.com/embed/")) {

                return url;

            }

            return url;

        } catch {

            return url;

        }

    };


    const embedUrl = getYoutubeEmbedUrl(movie.url);


    return (

        <div className="min-h-screen bg-black text-white">


            {/* ================= HERO ================= */}

            <section className="
                relative
                min-h-[650px]
                md:min-h-[720px]
                overflow-hidden
            ">


                {/* Background */}

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
                        "
                    />

                ) : (

                    <div className="
                        absolute
                        inset-0
                        bg-gradient-to-br
                        from-gray-900
                        to-black
                    "/>

                )}


                {/* Dark overlay */}

                <div className="
                    absolute
                    inset-0
                    bg-black/30
                "/>


                {/* Left gradient */}

                <div className="
                    absolute
                    inset-0
                    bg-gradient-to-r
                    from-black
                    via-black/70
                    to-transparent
                "/>


                {/* Bottom gradient */}

                <div className="
                    absolute
                    inset-x-0
                    bottom-0
                    h-72
                    bg-gradient-to-t
                    from-black
                    to-transparent
                "/>


                {/* Back button */}

                <button
                    onClick={() => navigate(-1)}
                    className="
                        absolute
                        top-6
                        left-6
                        md:left-10
                        z-20
                        bg-black/70
                        hover:bg-black
                        text-white
                        px-5
                        py-2.5
                        rounded-md
                        font-semibold
                        transition
                        backdrop-blur-sm
                    "
                >
                    ← Back
                </button>


                {/* Hero content */}

                <div className="
                    relative
                    z-10
                    min-h-[650px]
                    md:min-h-[720px]
                    flex
                    items-end
                ">

                    <div className="
                        px-6
                        md:px-12
                        lg:px-20
                        pb-20
                        md:pb-24
                        max-w-3xl
                    ">


                        {/* Small label */}

                        <p className="
                            text-gray-300
                            text-sm
                            md:text-base
                            font-semibold
                            mb-4
                            uppercase
                            tracking-widest
                        ">
                            NETFLIX
                        </p>


                        {/* Title */}

                        <h1 className="
                            text-4xl
                            md:text-6xl
                            lg:text-7xl
                            font-black
                            leading-tight
                            mb-6
                        ">
                            {movie.title}
                        </h1>


                        {/* Metadata */}

                        <div className="
                            flex
                            flex-wrap
                            items-center
                            gap-4
                            mb-6
                            text-sm
                            md:text-base
                        ">


                            <span className="
                                text-green-400
                                font-bold
                            ">
                                ⭐ {movie.rating}
                            </span>


                            {movie.year && (

                                <span className="text-gray-200">
                                    {movie.year}
                                </span>

                            )}


                            {movie.genre?.name && (

                                <span className="
                                    border
                                    border-gray-400
                                    px-3
                                    py-1
                                    rounded
                                    text-gray-200
                                ">
                                    {movie.genre.name}
                                </span>

                            )}

                        </div>


                        {/* Description */}

                        <p className="
                            text-gray-200
                            text-base
                            md:text-lg
                            leading-7
                            mb-8
                            max-w-2xl
                        ">
                            {movie.desc}
                        </p>


                        {/* Buttons */}

                        <div className="
                            flex
                            flex-wrap
                            gap-3
                        ">


                            {/* Play */}

                          {movie.movieUrl ? (

                            <button
                                onClick={handlePlayMovie}
                                className="
                                    bg-white
                                    text-black
                                    px-7
                                    py-3
                                    rounded-md
                                    font-bold
                                    text-lg
                                    hover:bg-gray-300
                                    transition
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                ▶ Play
                            </button>

                        ) : (

                            <button
                                disabled
                                className="
                                    bg-gray-600
                                    text-gray-300
                                    px-7
                                    py-3
                                    rounded-md
                                    font-bold
                                    text-lg
                                    cursor-not-allowed
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                ▶ Play Unavailable
                            </button>

                        )}


                            {/* Trailer */}

                               {embedUrl && (

                                <button
                                    onClick={() => setShowTrailer(true)}
                                    className="
                                        bg-gray-600/80
                                        hover:bg-gray-500
                                        text-white
                                        px-7
                                        py-3        
                                        rounded-md
                                        font-bold
                                        text-lg
                                        transition
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >
                                    ▶ Play Trailer
                                </button>

                            )}
                                <button
                                type="button"
                                onClick={handleMyList}
                                disabled={myListLoading || inMyList}
                                className={`
                                    ${
                                        inMyList
                                            ? "bg-green-600 cursor-default"
                                            : "bg-gray-700 hover:bg-gray-600"
                                    }
                                    text-white
                                    px-6
                                    py-3
                                    rounded-md
                                    font-bold
                                    transition
                                `}
                            >
                                {myListLoading
                                    ? "Adding..."
                                    : inMyList
                                        ? "✓ In My List"
                                        : "+ My List"
                                }
                            </button>


                        </div>

                    </div>

                </div>

            </section>



           {/* ================= TRAILER MODAL ================= */}

{showTrailer && embedUrl && (

    <div
        className="
            fixed
            inset-0
            z-[100]
            bg-black/90
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
            md:p-8
        "
        onClick={() => setShowTrailer(false)}
    >

        <div
            className="
                relative
                w-full
                max-w-5xl
                bg-black
                rounded-xl
                overflow-hidden
                shadow-2xl
                border
                border-gray-800
            "
            onClick={(e) => e.stopPropagation()}
        >

            {/* Close Button */}

            <button
                type="button"
                onClick={() => setShowTrailer(false)}
                className="
                    absolute
                    top-3
                    right-3
                    z-20
                    w-10
                    h-10
                    rounded-full
                    bg-black/80
                    hover:bg-red-600
                    text-white
                    text-xl
                    font-bold
                    flex
                    items-center
                    justify-center
                    transition
                "
            >
                ✕
            </button>


            {/* Trailer */}

            <div className="aspect-video w-full">

                <iframe
                    src={`${embedUrl}?autoplay=1`}
                    title={`${movie.title} Trailer`}
                    className="w-full h-full"
                    allow="
                        accelerometer;
                        autoplay;
                        clipboard-write;
                        encrypted-media;
                        gyroscope;
                        picture-in-picture
                    "
                    allowFullScreen
                />

            </div>

        </div>

    </div>

)}

            {/* ================= MOVIE INFO ================= */}

            <section className="
                max-w-6xl
                mx-auto
                px-6
                md:px-10
                pb-20
            ">

                <div className="
                    border-t
                    border-gray-800
                    pt-8
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-8
                ">


                    <div>

                        <p className="text-gray-500 text-sm mb-2">
                            Genre
                        </p>

                        <p className="text-lg font-semibold">
                            {movie.genre?.name || "N/A"}
                        </p>

                    </div>


                    <div>

                        <p className="text-gray-500 text-sm mb-2">
                            Release Year
                        </p>

                        <p className="text-lg font-semibold">
                            {movie.year || "N/A"}
                        </p>

                    </div>


                    <div>

                        <p className="text-gray-500 text-sm mb-2">
                            Rating
                        </p>

                        <p className="text-lg font-semibold text-yellow-400">
                            ⭐ {movie.rating || "N/A"}
                        </p>

                    </div>

                </div>

            </section>

        </div>

    );

}