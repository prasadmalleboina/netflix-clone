import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {

    const navigate = useNavigate();

    if (!movie) return null;

    return (
        <div
            onClick={() =>
                navigate(`/user/movie/${movie.id}`)
            }
            className="
                group
                relative
                flex-shrink-0
                w-[170px]
                sm:w-[190px]
                md:w-[210px]
                lg:w-[220px]
                cursor-pointer
            "
        >

            {/* Poster */}

            <div
                className="
                    relative
                    aspect-[2/3]
                    rounded-md
                    overflow-hidden
                    bg-gray-900
                "
            >

                <img
                    src={movie.bannerUrl || ""}
                    alt={movie.title || "Movie"}
                    className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-300
                        group-hover:scale-105
                    "
                />

                {/* Bottom gradient */}

                <div
                    className="
                        absolute
                        inset-x-0
                        bottom-0
                        h-24
                        bg-gradient-to-t
                        from-black/90
                        to-transparent
                    "
                />

                {/* Rating */}

                {movie.rating && (
                    <span
                        className="
                            absolute
                            top-2
                            left-2
                            bg-black/75
                            text-white
                            text-xs
                            px-2
                            py-1
                            rounded
                        "
                    >
                        ⭐ {movie.rating}
                    </span>
                )}

                {/* Hover Play */}

                <div
                    className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        bg-black/30
                        opacity-0
                        group-hover:opacity-100
                        transition
                    "
                >
                    <div
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
                            shadow-xl
                        "
                    >
                        ▶
                    </div>
                </div>

            </div>

            {/* Title */}

            <h3
                className="
                    mt-3
                    text-sm
                    md:text-base
                    font-semibold
                    text-white
                    truncate
                "
            >
                {movie.title}
            </h3>

            {/* Metadata */}

            <div
                className="
                    flex
                    items-center
                    gap-2
                    mt-1
                    text-xs
                    text-gray-400
                "
            >

                {movie.year && (
                    <span>{movie.year}</span>
                )}

                {movie.genre?.name && (
                    <>
                        <span>•</span>
                        <span>{movie.genre.name}</span>
                    </>
                )}

            </div>

        </div>
    );
}