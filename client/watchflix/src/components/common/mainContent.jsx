import { Link } from "react-router-dom";
import Header from "./Header";

import tvImg from "../../assets/tv.png";
import downloadImg from "../../assets/download.jpg";
import devicesImg from "../../assets/devices.png";


export default function MainContent() {

    return (

        <div className="bg-black text-white">


            {/* ================= HERO ================= */}

            <div
                className="relative h-screen bg-cover bg-center"
                style={{
    backgroundImage: "url('/background.webp')",
    backgroundSize: "cover",
    backgroundPosition: "center",
}}
            >

                <div className="absolute inset-0 bg-black/70"></div>

                <Header />

                <div className="
                    relative
                    z-10
                    flex
                    flex-col
                    justify-center
                    items-center
                    h-full
                    text-center
                    px-5
                ">

                    <h1 className="
                        text-4xl
                        md:text-6xl
                        font-extrabold
                        mb-6
                    ">
                        Unlimited movies,
                        <br />
                        TV shows and more.
                    </h1>

                    <p className="
                        text-xl
                        md:text-2xl
                        mb-3
                    ">
                        Starts at ₹149. Cancel anytime.
                    </p>

                    <p className="
                        text-base
                        md:text-lg
                        text-gray-300
                        mb-10
                    ">
                        Ready to watch? Sign in to continue.
                    </p>

                    <Link to="/signin">

                        <button className="
                            bg-red-600
                            hover:bg-red-700
                            px-10
                            md:px-12
                            py-4
                            rounded-lg
                            text-xl
                            md:text-2xl
                            font-bold
                            transition
                        ">
                            Get Started →
                        </button>

                    </Link>

                </div>

            </div>


            {/* ================= FEATURES ================= */}

            <section className="
                py-20
                md:py-24
                px-6
                md:px-16
                border-t-8
                border-gray-900
            ">

                <div className="
                    grid
                    md:grid-cols-2
                    gap-12
                    md:gap-16
                    items-center
                    max-w-7xl
                    mx-auto
                ">

                    <div>

                        <h2 className="
                            text-3xl
                            md:text-5xl
                            font-bold
                            mb-5
                        ">
                            Enjoy on your TV
                        </h2>

                        <p className="
                            text-lg
                            md:text-2xl
                            text-gray-300
                        ">
                            Watch on Smart TVs, Playstation, Xbox,
                            Chromecast, Apple TV and more.
                        </p>

                    </div>

                    <img
                        src={tvImg}
                        alt="Watch NETFLIX on TV"
                        className="
                            w-full
                            max-w-xl
                            mx-auto
                            object-contain
                        "
                    />

                </div>

            </section>


            {/* ================= DOWNLOAD ================= */}

            <section className="
                py-20
                md:py-24
                px-6
                md:px-16
                border-t-8
                border-gray-900
            ">

                <div className="
                    grid
                    md:grid-cols-2
                    gap-12
                    md:gap-16
                    items-center
                    max-w-7xl
                    mx-auto
                ">

                    <img
                        src={downloadImg}
                        alt="Download movies for offline viewing"
                        className="
                            w-full
                            max-w-xl
                            mx-auto
                            rounded-xl
                            object-cover
                        "
                    />

                    <div>

                        <h2 className="
                            text-3xl
                            md:text-5xl
                            font-bold
                            mb-5
                        ">
                            Download your shows to watch offline
                        </h2>

                        <p className="
                            text-lg
                            md:text-2xl
                            text-gray-300
                        ">
                            Save your favourites easily and always have
                            something to watch.
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= WATCH EVERYWHERE ================= */}

            <section className="
                py-20
                md:py-24
                px-6
                md:px-16
                border-t-8
                border-gray-900
            ">

                <div className="
                    grid
                    md:grid-cols-2
                    gap-12
                    md:gap-16
                    items-center
                    max-w-7xl
                    mx-auto
                ">

                    <div>

                        <h2 className="
                            text-3xl
                            md:text-5xl
                            font-bold
                            mb-5
                        ">
                            Watch everywhere
                        </h2>

                        <p className="
                            text-lg
                            md:text-2xl
                            text-gray-300
                        ">
                            Stream unlimited movies and TV shows on your
                            phone, tablet, laptop and TV.
                        </p>

                    </div>

                    <img
                        src={devicesImg}
                        alt="Watch NETFLIX on multiple devices"
                        className="
                            w-full
                            max-w-xl
                            mx-auto
                            object-contain
                        "
                    />

                </div>

            </section>


            {/* ================= FOOTER ================= */}

            <footer className="
                border-t
                border-gray-800
                py-10
                text-center
                text-gray-500
                px-5
            ">
                © 2026 NETFLIX. Built using React + Express + MongoDB.
            </footer>

        </div>

    );

}