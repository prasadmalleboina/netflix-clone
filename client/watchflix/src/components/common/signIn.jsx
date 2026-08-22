import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function setCookie(name, value, days) {
    const expire = new Date(
        Date.now() + days * 24 * 60 * 60 * 1000
    ).toUTCString();

    document.cookie =
        `${name}=${value}; expires=${expire}; path=/`;
}

export default function SignIn() {

    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [message, setMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                `http://localhost:8060/api/${role}/login`,
                {
                    email: mail,
                    pass: password,
                    role: role
                }
            );

            console.log(response.data);

            // Save token and role
            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "role",
                role
            );

            // Cookie
            setCookie(
                "token",
                response.data.token,
                1
            );

            setMessage(
                response.data.message
            );

            alert("Login Successful!");

            navigate(
                `/${role}/dashboard`
            );

        } catch (error) {

            console.log(error);

            if (error.response) {

                setMessage(
                    error.response.data.message
                );

            } else {

                setMessage(
                    "Login Failed"
                );

            }

            alert("Login Failed");

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

            <div
                className="
                    absolute
                    inset-0
                    bg-black/75
                "
            ></div>


            {/* NETFLIX BRAND */}

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


            {/* LOGIN SECTION */}

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

                    {/* TITLE */}

                    <h2
                        className="
                            text-center
                            text-3xl
                            font-bold
                            text-white
                            mb-8
                        "
                    >
                        Sign in
                    </h2>


                    {/* FORM */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* EMAIL */}

                        <div>

                            <label
                                htmlFor="email"
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-200
                                    mb-2
                                "
                            >
                                Email address
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={mail}
                                onChange={(e) =>
                                    setMail(e.target.value)
                                }
                                placeholder="Enter your email"
                                required
                                className="
                                    block
                                    w-full
                                    rounded-md
                                    bg-black/80
                                    border
                                    border-gray-600
                                    px-4
                                    py-3
                                    text-white
                                    placeholder-gray-500
                                    outline-none
                                    focus:border-red-600
                                    focus:ring-1
                                    focus:ring-red-600
                                    transition
                                "
                            />

                        </div>


                        {/* PASSWORD */}
                                {/* PASSWORD */}

<div>
    <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-200 mb-2"
    >
        Password
    </label>

    <div className="relative">

        <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="
                block
                w-full
                rounded-md
                bg-black/80
                border
                border-gray-600
                px-4
                py-3
                pr-12
                text-white
                placeholder-gray-500
                outline-none
                focus:border-red-600
                focus:ring-1
                focus:ring-red-600
                transition
            "
        />

        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-400
                hover:text-white
                transition
            "
            aria-label={showPassword ? "Hide password" : "Show password"}
        >
            {showPassword ? (
                /* Eye Off */
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m2 2 20 20" />
                    <path d="M6.71 6.71C4.66 8.1 3.2 10.1 2 12c2.4 3.8 5.7 6 10 6 1.5 0 2.8-.3 4-.8" />
                    <path d="M10.73 5.08C11.14 5.03 11.56 5 12 5c4.3 0 7.6 2.2 10 7-.7 1.1-1.5 2.1-2.4 2.9" />
                </svg>
            ) : (
                /* Eye */
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            )}
        </button>

    </div>
</div>
                        {/* ROLE */}

                        <div>

                            <label
                                htmlFor="role"
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-200
                                    mb-2
                                "
                            >
                                Role
                            </label>

                            <select
                                id="role"
                                name="role"
                                value={role}
                                onChange={(e) =>
                                    setRole(e.target.value)
                                }
                                required
                                className="
                                    block
                                    w-full
                                    rounded-md
                                    bg-black/80
                                    border
                                    border-gray-600
                                    px-4
                                    py-3
                                    text-white
                                    outline-none
                                    focus:border-red-600
                                    focus:ring-1
                                    focus:ring-red-600
                                    transition
                                "
                            >

                                <option value="">
                                    Select role
                                </option>

                                <option value="user">
                                    User
                                </option>

                                <option value="admin">
                                    Admin
                                </option>

                            </select>

                        </div>


                        {/* LOGIN MESSAGE */}

                        {message && (

                            <p
                                className="
                                    text-center
                                    text-sm
                                    text-gray-300
                                "
                            >
                                {message}
                            </p>

                        )}


                        {/* SIGN IN BUTTON */}

                        <button
                            type="submit"
                            className="
                                w-full
                                rounded-md
                                bg-red-600
                                px-4
                                py-3
                                text-white
                                text-base
                                font-bold
                                hover:bg-red-700
                                transition
                            "
                        >
                            Sign In
                        </button>

                    </form>


                    {/* REGISTER */}

                    <p
                        className="
                            mt-8
                            text-center
                            text-sm
                            text-gray-400
                        "
                    >
                        New to Netflix?{" "}

                        <Link
                            to="/signup"
                            className="
                                font-semibold
                                text-white
                                hover:underline
                            "
                        >
                            Register now
                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );
}