import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../api";

export default function MoviePlayer() {

    const navigate = useNavigate();
    const location = useLocation();

    const movie = location.state;

    const videoRef = useRef(null);

    const [savedProgress, setSavedProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [lastSavedSecond, setLastSavedSecond] = useState(0);


    const getToken = () => {

        const cookies = document.cookie.split(";");

        for (let cookie of cookies) {

            cookie = cookie.trim();

            if (cookie.startsWith("token=")) {
                return cookie.substring("token=".length);
            }

        }

        return null;
    };


    // ================= FETCH SAVED PROGRESS =================

    useEffect(() => {

        if (!movie?.id) return;

        fetchSavedProgress();

    }, [movie]);


   const fetchSavedProgress = async () => {

    try {

        const token = getToken();

        if (!token) return;

        const response = await axios.get(
            `${API_URL}/api/user/continue-watching`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const items = response.data.data || [];

        const currentItem = items.find(
            (item) => item.movieId === movie.id
        );

        if (currentItem) {

            console.log("CURRENT CONTINUE ITEM:", currentItem);

            setSavedProgress(
                Number(currentItem.progress || 0)
            );

            setDuration(
                Number(currentItem.duration || 0)
            );
        }

    } catch (error) {

        console.log(
            "Fetch Progress Error:",
            error
        );

    }
};
useEffect(() => {

    const video = videoRef.current;

    if (!video) return;

    if (
        savedProgress > 0 &&
        video.duration &&
        savedProgress < video.duration
    ) {

        console.log(
            "Resuming movie from:",
            savedProgress
        );

        video.currentTime = savedProgress;

    }

}, [savedProgress]);

    // ================= SAVE PROGRESS =================

    const saveProgress = async (
        progressValue,
        durationValue
    ) => {

        try {

            const token = getToken();

            if (!token || !movie?.id) return;
            console.log(
            "💾 SAVING:",
            progressValue,
            durationValue
        );

           await axios.post(
    `${API_URL}/api/user/continue-watching/${movie.id}`,
    {
        progress: progressValue,
        duration: durationValue,
    },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
);

        } catch (error) {

            console.log(
                "Save Progress Error:",
                error
            );

        }

    };


    // ================= VIDEO LOADED =================
const handleLoadedMetadata = () => {

    const video = videoRef.current;

    if (!video) return;

    const actualDuration =
        Number(video.duration || 0);

    setDuration(actualDuration);

    console.log(
        "Video duration:",
        actualDuration
    );

    console.log(
        "Saved progress:",
        savedProgress
    );

    if (
        savedProgress > 0 &&
        savedProgress < actualDuration
    ) {

        video.currentTime =
            savedProgress;

    }

};


    // ================= TIME UPDATE =================

    const handleTimeUpdate = () => {

        const video = videoRef.current;

        if (!video) return;

        const currentTime =
            Math.floor(video.currentTime);

        const actualDuration =
            Number(video.duration || 0);


        /*
            Save every 5 seconds.

            Example:
            5
            10
            15
            20...
        */

        if (
            currentTime > 0 &&
            currentTime % 5 === 0 &&
            currentTime !== lastSavedSecond
        ) {

            setLastSavedSecond(currentTime);

            saveProgress(
                currentTime,
                actualDuration
            );

        }

    };


    // ================= SAVE WHEN PAUSED =================

    const handlePause = () => {

        const video = videoRef.current;

        if (!video) return;

        saveProgress(
            video.currentTime,
            video.duration
        );

    };


    // ================= SAVE BEFORE LEAVING =================

    const handleBack = async () => {

        const video = videoRef.current;

        if (video) {

            await saveProgress(
                video.currentTime,
                video.duration
            );

        }

        navigate(-1);

    };


    // ================= NO MOVIE =================

    if (!movie) {

        return (
            <div className="
                min-h-screen
                bg-black
                text-white
                flex
                flex-col
                justify-center
                items-center
                gap-5
            ">

                <h1 className="text-2xl font-bold">
                    Movie not found
                </h1>

                <button
                    onClick={() =>
                        navigate("/user/dashboard")
                    }
                    className="
                        bg-white
                        text-black
                        px-6
                        py-3
                        rounded-md
                        font-bold
                    "
                >
                    Back to Dashboard
                </button>

            </div>
        );

    }


    return (

        <div className="
            min-h-screen
            bg-black
            text-white
        ">


            {/* HEADER */}

            <header className="
                fixed
                top-0
                left-0
                right-0
                z-50
                bg-gradient-to-b
                from-black
                to-transparent
                px-5
                md:px-10
                py-5
            ">

                <div className="
                    flex
                    items-center
                    justify-between
                ">

                    <button
                        onClick={handleBack}
                        className="
                            bg-black/60
                            hover:bg-white
                            hover:text-black
                            border
                            border-gray-600
                            px-4
                            py-2
                            rounded-md
                            font-semibold
                            transition
                        "
                    >
                        ← Back
                    </button>


                    <h1 className="
                        text-lg
                        md:text-2xl
                        font-bold
                        truncate
                        max-w-xl
                    ">
                        {movie.title}
                    </h1>


                    <h2 className="
                        text-red-600
                        text-xl
                        md:text-2xl
                        font-black
                    ">
                        NETFLIX
                    </h2>

                </div>

            </header>



            {/* PLAYER */}

            <main className="pt-20">

                <div className="
                    w-full
                    max-w-[1500px]
                    mx-auto
                    px-3
                    md:px-8
                ">

                    {movie.movieUrl ? (

                        <div className="
                            relative
                            aspect-video
                            w-full
                            bg-black
                            rounded-lg
                            overflow-hidden
                            shadow-2xl
                            border
                            border-gray-900
                        ">

                            <video
                                ref={videoRef}
                                src={movie.movieUrl}
                                controls
                                autoPlay
                                onLoadedMetadata={
                                    handleLoadedMetadata
                                }
                                onTimeUpdate={
                                    handleTimeUpdate
                                }
                                onPause={
                                    handlePause
                                }
                                className="
                                    w-full
                                    h-full
                                    bg-black
                                "
                            >
                                Your browser does not support
                                video playback.
                            </video>

                        </div>

                    ) : (

                        <div className="
                            aspect-video
                            bg-gray-950
                            rounded-lg
                            flex
                            items-center
                            justify-center
                        ">

                            <p className="text-gray-400">
                                Movie video not available
                            </p>

                        </div>

                    )}

                </div>


                {/* INFO */}

                <section className="
                    max-w-[1500px]
                    mx-auto
                    px-5
                    md:px-8
                    py-8
                ">

                    <h2 className="
                        text-3xl
                        md:text-4xl
                        font-black
                    ">
                        {movie.title}
                    </h2>


                    <div className="
                        flex
                        gap-4
                        mt-4
                        text-gray-300
                    ">

                        {movie.rating !== undefined && (
                            <span>
                                ⭐ {movie.rating}
                            </span>
                        )}

                        {movie.year && (
                            <span>
                                {movie.year}
                            </span>
                        )}

                        {movie.genre?.name && (
                            <span>
                                {movie.genre.name}
                            </span>
                        )}

                    </div>


                    {movie.desc && (

                        <p className="
                            text-gray-400
                            max-w-4xl
                            mt-5
                            leading-7
                        ">
                            {movie.desc}
                        </p>

                    )}


                    {/* Saved Progress Debug */}

                    {duration > 0 && (

                        <p className="
                            mt-5
                            text-sm
                            text-gray-600
                        ">
                            Progress saved automatically
                        </p>

                    )}

                </section>

            </main>

        </div>

    );

}