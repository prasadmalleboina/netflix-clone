import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminDash from "./components/adminUi/adminDash";
import SignIn from "./components/common/signIn";
import SignUp from "./components/common/signUp";
import MainContent from "./components/common/mainContent";
import ProtectedRoute from "./components/common/ProtectedRoute";

import AddGenre from "./components/adminUi/addGenre";
import AddMovie from "./components/adminUi/addMovie";
import ViewMovie from "./components/adminUi/iewMovie";
import EditMovie from "./components/adminUi/EditMovie";
import ViewGenre from "./components/adminUi/ViewGenre";
import ViewAllUsers from "./components/adminUi/ViewAllUsers";
import ChangePassword from "./components/adminUi/ChangePassword.jsx";

import UserDash from "./components/userUi/userDash";
import MovieDetails from "./components/userUi/MovieDetails";
import MoviePlayer from "./components/userUi/MoviePlayer";
import MyList from "./components/userUi/MyList";
import Movies from "./components/userUi/Movies";
import NewPopular from "./components/userUi/NewPopular";
import Profile from "./components/userUi/Profile";

export default function App() {

    return (

        <BrowserRouter>

            <Routes>


                {/* ================= PUBLIC ROUTES ================= */}

                <Route
                    path="/"
                    element={<MainContent />}
                />


                <Route
                    path="/about"
                    element={<h1>About Page</h1>}
                />


                <Route
                    path="/contact"
                    element={<h1>Contact Page</h1>}
                />


                <Route
                    path="/signin"
                    element={<SignIn />}
                />


                <Route
                    path="/signup"
                    element={<SignUp />}
                />



                {/* ================= USER ROUTES ================= */}


                <Route
                    path="/user/dashboard"
                    element={
                        <ProtectedRoute role="user">

                            <UserDash />

                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/user/movie/:id"
                    element={
                        <ProtectedRoute role="user">

                            <MovieDetails />

                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/watch"
                    element={
                        <ProtectedRoute role="user">

                            <MoviePlayer />

                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/user/my-list"
                    element={
                        <ProtectedRoute role="user">

                            <MyList />

                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/user/movies"
                    element={
                        <ProtectedRoute role="user">

                            <Movies />

                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/user/new-popular"
                    element={
                        <ProtectedRoute role="user">

                            <NewPopular />

                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/user/profile"
                    element={
                        <ProtectedRoute role="user">

                            <Profile />

                        </ProtectedRoute>
                    }
                />



                {/* ================= ADMIN ROUTES ================= */}


                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute role="admin">

                            <AdminDash />

                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/admin/add-genre"
                    element={
                        <ProtectedRoute role="admin">

                            <AddGenre />

                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/admin/add-movie"
                    element={
                        <ProtectedRoute role="admin">

                            <AddMovie />

                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/admin/view-movie"
                    element={
                        <ProtectedRoute role="admin">

                            <ViewMovie />

                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/admin/edit-movie"
                    element={
                        <ProtectedRoute role="admin">

                            <EditMovie />

                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/admin/view-genre"
                    element={
                        <ProtectedRoute role="admin">

                            <ViewGenre />

                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/admin/view-all-users"
                    element={
                        <ProtectedRoute role="admin">

                            <ViewAllUsers />

                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/admin/change-password"
                    element={
                        <ProtectedRoute role="admin">

                            <ChangePassword />

                        </ProtectedRoute>
                    }
                />


            </Routes>

        </BrowserRouter>

    );

}