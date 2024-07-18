import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function NavBar() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [error, setError] = useState(null);

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.delete(
        "https://blogapi-production-fb2f.up.railway.app/user/logout",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      window.location.href = "/login";
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <nav className="bg-white border-b-2 border-solid border-black shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-4xl font-bold">Blog Api docs</div>
        <ul className="flex space-x-4">
          <li className="hover:text-blue-500 font-bold cursor-pointer">
            <a
              href="https://blog-maker-two.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog Maker
            </a>
          </li>
          <li className="hover:text-blue-500 font-bold cursor-pointer">
            <a href="https://blogs-nine-steel.vercel.app">Blog showcase</a>
          </li>
        </ul>
        {token ? (
          <div className="flex gap-3">
            <a
              className="bg-zinc-500 flex justify-center gap-1 hover:bg-zinc-600 text-white py-2 px-4 rounded-md focus:outline-none"
              href="https://github.com/Florin12er/BlogApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                ></path>
              </svg>
              <a href="https://github.com/Florin12er/BlogApp">Source Code</a>
            </a>
            <button
              className="bg-blue-500 flex justify-center gap-1 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
              onClick={handleLogout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="M14.08 15.59L16.67 13H7v-2h9.67l-2.59-2.59L15.5 7l5 5l-5 5zM19 3a2 2 0 0 1 2 2v4.67l-2-2V5H5v14h14v-2.67l2-2V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.11.89-2 2-2z"
                ></path>
              </svg>
              <p>Logout</p>
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none">
              <Link to="/login">Login</Link>
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none">
              <Link to="/register">Register</Link>
            </button>
          </div>
        )}
      </div>
      {error && <div className="text-red-500 text-center">{error}</div>}
    </nav>
  );
}

export default NavBar;
