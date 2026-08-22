import axios from 'axios';
import React, { useState } from 'react';
import adminBg from "../../assets/admin-bg.png";
import API_URL from "../../api";

export default function AddGenre() {
    const [genre, setGenre] = useState('');
    const [movie, setMovie] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token=localStorage.getItem("token");
        // Add logic to send data to the server or update state
        const response = await axios.post(`${API_URL}/api/admin/addGenre`,
            {
                name: genre,
                token: token
            }
        );
        console.log(response.data);
        setGenre('');
        setMovie('');
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden" style={{
    backgroundImage: `url(${adminBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
}}>
            {/* Vignette overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.95) 100%)' }}></div>
            <form onSubmit={handleSubmit} className="relative z-10 bg-gradient-to-b from-black/80 to-red-900/80 p-8 rounded-lg shadow-lg w-full max-w-md border border-red-700">
                <h1 className="text-3xl font-bold mb-6 text-red-600 text-center">Add Genre and Movie</h1>
                <div className="mb-5">
                    <label htmlFor="genre" className="block text-gray-200 mb-1">Genre</label>
                    <input
                        type="text"
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="w-full px-3 py-2 border border-red-700 bg-black text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                        placeholder="Enter genre"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="movie" className="block text-gray-200 mb-1">Movie</label>
                    <input
                        type="text"
                        id="movie"
                        value={movie}
                        onChange={(e) => setMovie(e.target.value)}
                        className="w-full px-3 py-2 border border-red-700 bg-black text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                        placeholder="Enter movie name"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 font-semibold shadow-md transition-colors"
                >
                    Add
                </button>
            </form>
        </div>
    );
}
