import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../../api";

export default function ViewAllUsers() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);


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


    const fetchUsers = async () => {

        try {

            const token = getToken();

            if (!token) {
                alert("Admin login required");
                navigate("/signin");
                return;
            }

            const response = await axios.get(
                `${API_URL}/api/admin/viewAllUsers`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Users:", response.data);

            setUsers(response.data.data || []);

        } catch (error) {

            console.log("View Users Error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to load users"
            );

        } finally {

            setLoading(false);

        }

    };


    const handleDeleteUser = async (userId, userRole) => {

        if (userRole === "admin") {
            alert("Admin account cannot be deleted here");
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const token = getToken();

            await axios.delete(
                `${API_URL}/api/admin/deleteUser/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("User deleted successfully");

            // refresh list
            fetchUsers();

        } catch (error) {

            console.log("Delete User Error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to delete user"
            );

        }

    };


    useEffect(() => {
        fetchUsers();
    }, []);


    return (

        <div className="min-h-screen bg-black text-white px-6 py-10">

            <div className="max-w-6xl mx-auto">

                <div className="
                    flex
                    items-center
                    justify-between
                    mb-8
                ">

                    <div>

                        <h1 className="
                            text-4xl
                            font-black
                            text-red-600
                        ">
                            All Users
                        </h1>

                        <p className="
                            text-gray-400
                            mt-2
                        ">
                            Registered NETFLIX users
                        </p>

                    </div>


                    <button
                        onClick={() =>
                            navigate("/admin/dashboard")
                        }
                        className="
                            bg-gray-800
                            hover:bg-gray-700
                            px-5
                            py-2.5
                            rounded-md
                            font-semibold
                            transition
                        "
                    >
                        ← Dashboard
                    </button>

                </div>


                {loading ? (

                    <p className="text-gray-400">
                        Loading users...
                    </p>

                ) : users.length === 0 ? (

                    <div className="
                        bg-gray-900
                        border
                        border-gray-800
                        rounded-xl
                        p-8
                        text-center
                    ">
                        No users found
                    </div>

                ) : (

                    <div className="
                        overflow-x-auto
                        bg-gray-900
                        rounded-xl
                        border
                        border-gray-800
                    ">

                        <table className="w-full">

                            <thead className="
                                bg-gray-800
                                text-gray-300
                            ">

                                <tr>

                                    <th className="text-left px-5 py-4">
                                        Name
                                    </th>

                                    <th className="text-left px-5 py-4">
                                        Email
                                    </th>

                                    <th className="text-left px-5 py-4">
                                        Role
                                    </th>

                                    <th className="text-left px-5 py-4">
                                        Joined
                                    </th>

                                    <th className="text-left px-5 py-4">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {users.map((user) => (

                                    <tr
                                        key={user.id}
                                        className="
                                            border-t
                                            border-gray-800
                                            hover:bg-gray-800/60
                                            transition
                                        "
                                    >

                                        <td className="
                                            px-5
                                            py-4
                                            font-semibold
                                        ">
                                            {user.name || "N/A"}
                                        </td>

                                        <td className="
                                            px-5
                                            py-4
                                            text-gray-300
                                        ">
                                            {user.email}
                                        </td>

                                        <td className="px-5 py-4">

                                            <span className="
                                                bg-red-600/20
                                                text-red-400
                                                px-3
                                                py-1
                                                rounded-full
                                                text-sm
                                                capitalize
                                            ">
                                                {user.role}
                                            </span>

                                        </td>

                                        <td className="
                                            px-5
                                            py-4
                                            text-gray-400
                                        ">
                                            {user.createdAt
                                                ? new Date(
                                                    user.createdAt
                                                ).toLocaleDateString()
                                                : "N/A"
                                            }
                                        </td>


                                        <td className="px-5 py-4">

                                            {user.role !== "admin" ? (

                                                <button
                                                    onClick={() =>
                                                        handleDeleteUser(
                                                            user.id,
                                                            user.role
                                                        )
                                                    }
                                                    className="
                                                        bg-red-600
                                                        hover:bg-red-700
                                                        text-white
                                                        px-4
                                                        py-2
                                                        rounded-md
                                                        font-semibold
                                                        transition
                                                    "
                                                >
                                                    Delete
                                                </button>

                                            ) : (

                                                <span className="text-gray-500 text-sm">
                                                    Protected
                                                </span>

                                            )}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>

    );

}