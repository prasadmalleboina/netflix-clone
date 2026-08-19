import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ChangePassword() {

    const navigate = useNavigate();

    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [loading, setLoading] = useState(false);


    const getCookie = (name) => {

        const cookies = document.cookie.split(";");

        for (let cookie of cookies) {

            cookie = cookie.trim();

            if (cookie.startsWith(name + "=")) {
                return cookie.substring(name.length + 1);
            }

        }

        return null;
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!newPass || !confirmPass) {
            alert("Please fill all fields");
            return;
        }

        if (newPass !== confirmPass) {
            alert("Passwords do not match");
            return;
        }

        try {

            setLoading(true);

            const token = getCookie("token");

            if (!token) {
                alert("Admin login required");
                navigate("/signin");
                return;
            }

            /*
                We need admin id.
                If your login stores user id in localStorage,
                use that exact key here.
            */

            const response = await axios.patch(
                `https://netflix-clone-backend.onrender.com/api/admin/adminChangePass`,
                {
                    newPass
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.data);

            alert("Password changed successfully");

            setNewPass("");
            setConfirmPass("");

            navigate("/admin/dashboard");

        } catch (error) {

            console.log("Change Password Error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to change password"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="
            min-h-screen
            bg-black
            flex
            items-center
            justify-center
            px-6
        ">

            <form
                onSubmit={handleSubmit}
                className="
                    w-full
                    max-w-md
                    bg-gray-900
                    border
                    border-red-800
                    rounded-xl
                    p-8
                    shadow-2xl
                "
            >

                <h1 className="
                    text-3xl
                    font-black
                    text-red-600
                    text-center
                    mb-8
                ">
                    Change Password
                </h1>


                <input
                    type="password"
                    value={newPass}
                    onChange={(e) =>
                        setNewPass(e.target.value)
                    }
                    placeholder="New Password"
                    className="
                        w-full
                        bg-black
                        border
                        border-gray-700
                        text-white
                        px-4
                        py-3
                        rounded-md
                        mb-4
                        outline-none
                        focus:border-red-600
                    "
                />


                <input
                    type="password"
                    value={confirmPass}
                    onChange={(e) =>
                        setConfirmPass(e.target.value)
                    }
                    placeholder="Confirm Password"
                    className="
                        w-full
                        bg-black
                        border
                        border-gray-700
                        text-white
                        px-4
                        py-3
                        rounded-md
                        mb-6
                        outline-none
                        focus:border-red-600
                    "
                />


                <button
                    type="submit"
                    disabled={loading}
                    className="
                        w-full
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        py-3
                        rounded-md
                        font-bold
                        transition
                        disabled:opacity-50
                    "
                >
                    {loading
                        ? "Updating..."
                        : "Change Password"
                    }
                </button>


                <button
                    type="button"
                    onClick={() =>
                        navigate("/admin/dashboard")
                    }
                    className="
                        w-full
                        mt-3
                        bg-gray-800
                        hover:bg-gray-700
                        text-white
                        py-3
                        rounded-md
                        font-semibold
                    "
                >
                    Back
                </button>

            </form>

        </div>

    );
}