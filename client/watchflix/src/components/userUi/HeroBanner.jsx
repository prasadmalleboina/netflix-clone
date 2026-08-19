import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroBanner({ movies = [] }) {
    const [current, setCurrent] = useState(0);

    const navigate = useNavigate();

    // Make sure current index is valid
    useEffect(() => {
        if (!movies.length) return;

        if (current >= movies.length) {
            setCurrent(0);
        }
    }, [movies, current]);

    // Auto slider
    useEffect(() => {
        if (movies.length <= 1) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % movies.length);
        }, 7000);

        return () => clearInterval(interval);
    }, [movies]);

    if (!movies.length) {
        return null;
    }

    const movie = movies[current];

    return (
        <section className="relative pt-20 px-3 md:px-6 lg:px-8">

            {/* Hero Container */}
            <div
                className="
                    relative
                    h-[520px]
                    md:h-[580px]
                    lg:h-[620px]
                    rounded-xl
                    overflow-hidden
                    bg-gray-900
                "
            >

                {/* Background Image */}

                {movie.bannerUrl ? (
                    <img
                        src={movie.bannerUrl}
                        alt={movie.title || "Movie"}
                        className="
                            absolute
                            inset-0
                            w-full
                            h-full
                            object-cover
                        "
                    />
                ) : (
                    <div className="absolute inset-0 bg-gray-900" />
                )}


                {/* Left Gradient */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-black
                        via-black/75
                        to-transparent
                    "
                />


                {/* Bottom Gradient */}

                <div
                    className="
                        absolute
                        inset-x-0
                        bottom-0
                        h-52
                        bg-gradient-to-t
                        from-black
                        to-transparent
                    "
                />


                {/* Content */}

                <div
                    className="
                        relative
                        z-10
                        h-full
                        flex
                        items-center
                        px-7
                        md:px-12
                        lg:px-16
                    "
                >

                    <div className="max-w-xl md:max-w-2xl pt-10">

                        {/* Label */}

                        <div className="
                            flex
                            items-center
                            gap-2
                            mb-4
                        ">
                            <span className="
                                text-red-600
                                text-sm
                                font-black
                                tracking-widest
                            ">
                                NETFLIX
                            </span>

                            <span className="
                                text-gray-300
                                text-xs
                                font-semibold
                                tracking-[0.25em]
                            ">
                                ORIGINAL
                            </span>
                        </div>


                        {/* Movie Title */}

                        <h1
                            className="
                                text-4xl
                                md:text-5xl
                                lg:text-6xl
                                font-black
                                text-white
                                leading-tight
                                mb-5
                            "
                        >
                            {movie.title}
                        </h1>


                        {/* Metadata */}

                        <div
                            className="
                                flex
                                flex-wrap
                                items-center
                                gap-4
                                text-sm
                                md:text-base
                                mb-5
                            "
                        >

                            {movie.rating && (
                                <span className="text-green-400 font-bold">
                                    ⭐ {movie.rating}
                                </span>
                            )}

                            {movie.year && (
                                <span className="text-gray-200">
                                    {movie.year}
                                </span>
                            )}

                            {movie.genre?.name && (
                                <span
                                    className="
                                        border
                                        border-gray-400
                                        px-2
                                        py-1
                                        text-xs
                                        rounded
                                        text-gray-200
                                    "
                                >
                                    {movie.genre.name}
                                </span>
                            )}

                        </div>


                        {/* Description */}

                        {movie.desc && (
                            <p
                                className="
                                    text-gray-200
                                    text-sm
                                    md:text-base
                                    leading-6
                                    max-w-xl
                                    line-clamp-3
                                    mb-7
                                "
                            >
                                {movie.desc}
                            </p>
                        )}


                        {/* Buttons */}

                        <div className="flex items-center gap-3">

                            {/* Play */}

                            <button
                                onClick={() =>
                                    navigate(`/user/movie/${movie.id}`)
                                }
                                className="
                                    bg-white
                                    text-black
                                    px-5
                                    md:px-7
                                    py-2.5
                                    rounded-md
                                    font-bold
                                    hover:bg-gray-300
                                    transition
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                ▶ Play
                            </button>


                            {/* More Info */}

                            <button
                                onClick={() =>
                                    navigate(`/user/movie/${movie.id}`)
                                }
                                className="
                                    bg-gray-600/80
                                    text-white
                                    px-5
                                    md:px-7
                                    py-2.5
                                    rounded-md
                                    font-bold
                                    hover:bg-gray-500
                                    transition
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                ⓘ More Info
                            </button>

                        </div>

                    </div>

                </div>


                {/* Slider Indicators */}

                {movies.length > 1 && (
                    <div
                        className="
                            absolute
                            bottom-6
                            right-7
                            md:right-10
                            z-20
                            flex
                            gap-2
                        "
                    >

                        {movies.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                aria-label={`Go to slide ${index + 1}`}
                                className={`
                                    h-1
                                    rounded-full
                                    transition-all
                                    duration-300
                                    ${
                                        current === index
                                            ? "w-7 bg-white"
                                            : "w-3 bg-gray-500"
                                    }
                                `}
                            />
                        ))}

                    </div>
                )}

            </div>

        </section>
    );
}