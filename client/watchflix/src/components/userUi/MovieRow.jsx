import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MovieRow({ title, movies = [] }) {

    const navigate = useNavigate();
    const sliderRef = useRef(null);

    const [hoveredMovie, setHoveredMovie] = useState(null);

    if (!movies.length) return null;


    // ================= SCROLL LEFT =================

    const scrollLeft = () => {

        sliderRef.current?.scrollBy({
            left: -800,
            behavior: "smooth",
        });

    };


    // ================= SCROLL RIGHT =================

    const scrollRight = () => {

        sliderRef.current?.scrollBy({
            left: 800,
            behavior: "smooth",
        });

    };


    // ================= OPEN MOVIE =================

    const openMovie = (movie) => {

        // Continue Watching
        // → go directly to player

        if (movie.isContinueWatching) {

            navigate("/watch", {
                state: movie,
            });

            return;

        }


        // Normal movie row
        // → go to movie details

        navigate(
            `/user/movie/${movie.id}`
        );

    };


    return (

        <section className="relative mb-12">


            {/* ================= TITLE ================= */}

            <h2
                className="
                    px-6
                    md:px-10
                    mb-4
                    text-2xl
                    md:text-3xl
                    font-bold
                    text-white
                "
            >
                {title}
            </h2>



            {/* ================= LEFT ARROW ================= */}

            <button
                type="button"
                onClick={scrollLeft}
                className="
                    absolute
                    left-0
                    top-[55%]
                    -translate-y-1/2
                    z-50
                    w-12
                    h-28
                    bg-black/70
                    text-white
                    text-3xl
                    rounded-r-md
                    hover:bg-black
                    transition
                    hidden
                    md:flex
                    items-center
                    justify-center
                "
            >
                ❮
            </button>



            {/* ================= MOVIES ================= */}

            <div
                ref={sliderRef}
                className="
                    flex
                    gap-3
                    md:gap-4
                    overflow-x-auto
                    px-6
                    md:px-10
                    py-5
                    no-scrollbar
                    scroll-smooth
                "
            >

                {movies.map((movie) => {

                    const hovered =
                        hoveredMovie === movie.id;


                    // ================= WATCH PROGRESS =================

                    const progressPercent =
                        movie.isContinueWatching &&
                        movie.watchDuration > 0
                            ? Math.min(
                                Math.max(
                                    (
                                        movie.watchProgress /
                                        movie.watchDuration
                                    ) * 100,
                                    0
                                ),
                                100
                            )
                            : 0;


                    return (

                        <div
                            key={movie.id}

                            onMouseEnter={() =>
                                setHoveredMovie(movie.id)
                            }

                            onMouseLeave={() =>
                                setHoveredMovie(null)
                            }

                            onClick={() =>
                                openMovie(movie)
                            }

                            className={`
                                relative
                                flex-shrink-0
                                w-[240px]
                                md:w-[280px]
                                h-[135px]
                                md:h-[158px]
                                rounded-md
                                overflow-hidden
                                cursor-pointer
                                bg-gray-900
                                transition-all
                                duration-300

                                ${
                                    hovered
                                        ? "scale-110 z-40 shadow-2xl"
                                        : "scale-100"
                                }
                            `}
                        >


                            {/* ================= IMAGE ================= */}

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

                                <div
                                    className="
                                        absolute
                                        inset-0
                                        flex
                                        items-center
                                        justify-center
                                        bg-gray-800
                                        text-gray-500
                                    "
                                >
                                    No Banner
                                </div>

                            )}



                            {/* ================= GRADIENT ================= */}

                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-black/90
                                    via-transparent
                                    to-transparent
                                "
                            />



                            {/* ================= RATING ================= */}

                            <div
                                className="
                                    absolute
                                    top-2
                                    left-2
                                    z-20
                                    bg-black/80
                                    px-2
                                    py-1
                                    rounded
                                    text-xs
                                    font-bold
                                    text-yellow-400
                                "
                            >
                                ⭐ {movie.rating ?? "N/A"}
                            </div>



                            {/* ================= HOVER OVERLAY ================= */}

                            <div
                                className={`
                                    absolute
                                    inset-0
                                    z-20
                                    bg-black/65
                                    flex
                                    items-center
                                    justify-center
                                    transition-opacity
                                    duration-200

                                    ${
                                        hovered
                                            ? "opacity-100"
                                            : "opacity-0"
                                    }
                                `}
                            >

                                <button
                                    type="button"

                                    onClick={(e) => {

                                        e.stopPropagation();

                                        openMovie(movie);

                                    }}

                                    className="
                                        w-12
                                        h-12
                                        rounded-full
                                        bg-white
                                        text-black
                                        flex
                                        items-center
                                        justify-center
                                        text-xl
                                        hover:scale-110
                                        transition
                                        shadow-xl
                                    "
                                >
                                    ▶
                                </button>

                            </div>



                            {/* ================= MOVIE INFO ================= */}

                            <div
                                className="
                                    absolute
                                    bottom-0
                                    left-0
                                    right-0
                                    z-30
                                    p-3
                                    pb-4
                                    bg-gradient-to-t
                                    from-black
                                    to-transparent
                                "
                            >

                                <h3
                                    className="
                                        text-sm
                                        md:text-base
                                        font-bold
                                        text-white
                                        truncate
                                    "
                                >
                                    {movie.title}
                                </h3>


                                <div
                                    className="
                                        flex
                                        gap-2
                                        text-xs
                                        text-gray-300
                                    "
                                >

                                    {movie.year && (

                                        <span>
                                            {movie.year}
                                        </span>

                                    )}


                                    {movie.genre?.name && (

                                        <span>
                                            • {movie.genre.name}
                                        </span>

                                    )}

                                </div>

                            </div>



                            {/* ================= CONTINUE WATCHING PROGRESS ================= */}

                            {movie.isContinueWatching &&
                                movie.watchDuration > 0 && (

                                <div
                                    className="
                                        absolute
                                        bottom-0
                                        left-0
                                        right-0
                                        h-1.5
                                        bg-gray-600
                                        z-50
                                    "
                                >

                                    <div
                                        className="
                                            h-full
                                            bg-red-600
                                            transition-all
                                            duration-300
                                        "
                                        style={{
                                            width: `${progressPercent}%`,
                                        }}
                                    />

                                </div>

                            )}

                        </div>

                    );

                })}

            </div>



            {/* ================= RIGHT ARROW ================= */}

            <button
                type="button"
                onClick={scrollRight}
                className="
                    absolute
                    right-0
                    top-[55%]
                    -translate-y-1/2
                    z-50
                    w-12
                    h-28
                    bg-black/70
                    text-white
                    text-3xl
                    rounded-l-md
                    hover:bg-black
                    transition
                    hidden
                    md:flex
                    items-center
                    justify-center
                "
            >
                ❯
            </button>

        </section>

    );

}