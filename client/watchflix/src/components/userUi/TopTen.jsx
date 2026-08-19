import { useNavigate } from "react-router-dom";

export default function TopTen({ movies }) {

    const navigate = useNavigate();

    if (!movies || movies.length === 0) return null;

    const topMovies = [...movies]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 10);

    return (

        <div className="px-8 mt-12 mb-16">

            <h2 className="text-4xl font-bold text-white mb-8">
                🔥 Top 10 Today
            </h2>

            <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">

                {topMovies.map((movie, index) => (

                    <div
                        key={movie.id}
                        onClick={() => navigate(`/user/movie/${movie.id}`)}
                        className="relative min-w-[220px] cursor-pointer group"
                    >

                        {/* Number */}

                        <span className="absolute -left-6 bottom-0 text-[120px] font-extrabold text-white/20 z-10">
                            {index + 1}
                        </span>

                        {/* Banner */}

                        <img
                            src={movie.bannerUrl}
                            alt={movie.title}
                            className="relative z-20 w-[220px] h-[320px] rounded-xl object-cover transition duration-300 group-hover:scale-105 shadow-2xl"
                        />

                    </div>

                ))}

            </div>

        </div>

    );

}