import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../api";

export default function SignUp() {

    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                `${API_URL}/api/user/register`,
                {
                    name: name,
                    email: mail,
                    pass: password,
                    role: "user"
                }
            );

            console.log("Response:", response.data);

            alert("Registered Successfully!");

            setName("");
            setMail("");
            setPassword("");

            navigate("/signin");

        } catch (error) {

            console.log(
                "Registration Error:",
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );

        }

    };


    return (

        <div
            className="
                relative
                min-h-screen
                bg-cover
                bg-center
                bg-no-repeat
            "
            style={{
                backgroundImage:
                    "url('/background.webp')"
            }}
        >

            {/* DARK OVERLAY */}

            <div className="absolute inset-0 bg-black/75"></div>


            {/* NETFLIX LOGO */}

            <div
                className="
                    absolute
                    top-6
                    left-6
                    md:left-12
                    z-20
                "
            >

                <h1
                    className="
                        text-red-600
                        text-3xl
                        md:text-4xl
                        font-black
                        tracking-tight
                    "
                >
                    NETFLIX
                </h1>

            </div>


            {/* REGISTER SECTION */}

            <div
                className="
                    relative
                    z-10
                    min-h-screen
                    flex
                    items-center
                    justify-center
                    px-6
                    py-16
                "
            >

                <div
                    className="
                        w-full
                        max-w-md
                        bg-black/80
                        backdrop-blur-md
                        border
                        border-gray-700
                        rounded-xl
                        px-8
                        py-9
                        shadow-2xl
                    "
                >

                    <h2
                        className="
                            text-center
                            text-3xl
                            font-bold
                            text-white
                            mb-8
                        "
                    >
                        Create Account
                    </h2>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* NAME */}

                        <div>

                            <label className="block text-sm text-gray-200 mb-2">
                                Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                placeholder="Enter your name"
                                required
                                className="
                                    w-full
                                    bg-black/80
                                    border
                                    border-gray-600
                                    rounded-md
                                    px-4
                                    py-3
                                    text-white
                                    placeholder-gray-500
                                    outline-none
                                    focus:border-red-600
                                "
                            />

                        </div>


                        {/* EMAIL */}

                        <div>

                            <label className="block text-sm text-gray-200 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                value={mail}
                                onChange={(e) =>
                                    setMail(e.target.value)
                                }
                                placeholder="Enter your email"
                                required
                                className="
                                    w-full
                                    bg-black/80
                                    border
                                    border-gray-600
                                    rounded-md
                                    px-4
                                    py-3
                                    text-white
                                    placeholder-gray-500
                                    outline-none
                                    focus:border-red-600
                                "
                            />

                        </div>


                        {/* PASSWORD */}

                        <div>

                            <label className="block text-sm text-gray-200 mb-2">
                                Password
                            </label>

                            <div className="relative">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter password"
                                    required
                                    className="
                                        w-full
                                        bg-black/80
                                        border
                                        border-gray-600
                                        rounded-md
                                        px-4
                                        py-3
                                        pr-12
                                        text-white
                                        placeholder-gray-500
                                        outline-none
                                        focus:border-red-600
                                    "
                                />


                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="
                                        absolute
                                        right-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-gray-400
                                        hover:text-white
                                    "
                                >

                                    {showPassword ? "🙈" : "👁"}

                                </button>

                            </div>

                        </div>


                        {/* ROLE DISPLAY */}

                        <div>

                            <label className="block text-sm text-gray-200 mb-2">
                                Account Type
                            </label>

                            <div
                                className="
                                    w-full
                                    bg-gray-900
                                    border
                                    border-gray-700
                                    rounded-md
                                    px-4
                                    py-3
                                    text-gray-300
                                "
                            >
                                User
                            </div>

                        </div>


                        <button
                            type="submit"
                            className="
                                w-full
                                bg-red-600
                                hover:bg-red-700
                                text-white
                                font-bold
                                py-3
                                rounded-md
                                transition
                            "
                        >
                            Register
                        </button>

                    </form>


                    <p
                        className="
                            mt-8
                            text-center
                            text-gray-400
                            text-sm
                        "
                    >
                        Already have an account?{" "}

                        <Link
                            to="/signin"
                            className="
                                text-white
                                font-semibold
                                hover:underline
                            "
                        >
                            Sign in
                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );
}