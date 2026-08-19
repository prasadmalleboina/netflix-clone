import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {

    // Get token from cookie
    const cookies = document.cookie.split(";");

    let token = null;

    for (let cookie of cookies) {

        cookie = cookie.trim();

        if (cookie.startsWith("token=")) {
            token = cookie.substring("token=".length);
        }
    }

    // Get logged-in role
    const loggedInRole = localStorage.getItem("role");


    // Not logged in
    if (!token) {
        return <Navigate to="/signin" replace />;
    }


    // Role doesn't match
    if (role && loggedInRole !== role) {

        // Admin trying to access user route
        if (loggedInRole === "admin") {
            return <Navigate to="/admin/dashboard" replace />;
        }

        // User trying to access admin route
        if (loggedInRole === "user") {
            return <Navigate to="/user/dashboard" replace />;
        }

        // Invalid/missing role
        return <Navigate to="/signin" replace />;
    }


    return children;
}