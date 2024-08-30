import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../../components/svgs/main_logo.jpg";

import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const queryClient = useQueryClient();

  const {
    mutate: loginMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      // refetch the authUser
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen bg-gray-900">
      <div className="flex-1 hidden lg:flex items-center justify-center">
        <a
          href="https://smartgram-information-page.vercel.app/"
          rel="noopener noreferrer"
        >
          <img
            src={logo}
            alt="Logo"
            className="w-full max-w-xl transition-transform transform hover:scale-105"
          />
        </a>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form
          className="flex gap-4 flex-col w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <a
            href="https://smartgram-information-page.vercel.app/"
            rel="noopener noreferrer"
          >
            <img
              src={logo}
              alt="Logo"
              className="w-10/12 lg:hidden transition-transform transform hover:scale-105 mx-auto mb-4"
            />
          </a>
          <h1 className="text-4xl font-extrabold text-white text-center mb-6">
            {"Let's"} go.
          </h1>
          <label className="input input-bordered rounded flex items-center gap-2 bg-gray-700 text-white">
            <MdOutlineMail className="text-gray-400" />
            <input
              type="text"
              className="grow bg-transparent focus:outline-none"
              placeholder="Username"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
            />
          </label>
          <label className="input input-bordered rounded flex items-center gap-2 bg-gray-700 text-white">
            <MdPassword className="text-gray-400" />
            <input
              type="password"
              className="grow bg-transparent focus:outline-none"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <button className="btn rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors duration-300">
            {isPending ? "Loading..." : "Login"}
          </button>
          {isError && (
            <p className="text-red-500 text-center">{error.message}</p>
          )}
        </form>
        <div className="flex flex-col gap-2 mt-6 w-full max-w-md">
          <p className="text-gray-300 text-lg text-center">
            {"Don't"} have an account?
          </p>
          <Link to="/signup" className="w-full">
            <button className="btn rounded-full bg-gray-700 text-white hover:bg-gray-600 btn-outline w-full transition-colors duration-300">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
