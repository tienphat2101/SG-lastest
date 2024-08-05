import { Link } from "react-router-dom";
import { useState } from "react";

import logo from "../../../components/svgs/main_logo.jpg";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        fullName: "",
        password: "",
    });
    const [usernameError, setUsernameError] = useState("");

    const queryClient = useQueryClient();

    const { mutate, isError, isPending, error } = useMutation({
        mutationFn: async ({ email, username, fullName, password }) => {
            try {
                const res = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, username, fullName, password }),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to create account");
                console.log(data);
                return data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        onSuccess: () => {
            toast.success("Account created successfully");
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault(); // page won't reload
        if (formData.username.trim().includes(" ")) {
            setUsernameError("Username cannot contain spaces.");
            return;
        }
        setUsernameError("");
        mutate(formData);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "username") {
            // Remove spaces from username while typing
            setFormData({ ...formData, [name]: value.replace(/\s+/g, '') });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <div className='max-w-screen-xl mx-auto flex h-screen px-10'>
            <div className='flex-1 hidden lg:flex items-center justify-center'>
                <a href="https://smartgram-information-page.vercel.app/" rel="noopener noreferrer">
                    <img
                        src={logo}
                        alt="Logo"
                        className='w-full max-w-xl transition-transform transform hover:scale-105'
                    />
                </a>
            </div>
            <div className='flex-1 flex flex-col justify-center items-center'>
                <form className='lg:w-2/3 mx-auto md:mx-20 flex gap-4 flex-col' onSubmit={handleSubmit}>
                    <a href="https://smartgram-information-page.vercel.app/" rel="noopener noreferrer">
                        <img
                            src={logo}
                            alt="Logo"
                            className='w-10/12 lg:hidden transition-transform transform hover:scale-105'
                        />
                    </a>
                    <h1 className='text-4xl font-extrabold text-white'>Join today.</h1>
                    <label className='input input-bordered rounded flex items-center gap-2'>
                        <MdOutlineMail />
                        <input
                            type='email'
                            className='grow'
                            placeholder='Email'
                            name='email'
                            onChange={handleInputChange}
                            value={formData.email}
                        />
                    </label>
                    <div className='flex gap-4 flex-wrap'>
                        <label className='input input-bordered rounded flex items-center gap-2 flex-1'>
                            <FaUser />
                            <input
                                type='text'
                                className='grow '
                                placeholder='Username'
                                name='username'
                                onChange={handleInputChange}
                                value={formData.username}
                            />
                        </label>
                        <label className='input input-bordered rounded flex items-center gap-2 flex-1'>
                            <MdDriveFileRenameOutline />
                            <input
                                type='text'
                                className='grow'
                                placeholder='Full Name'
                                name='fullName'
                                onChange={handleInputChange}
                                value={formData.fullName}
                            />
                        </label>
                    </div>
                    {usernameError && <p className='text-red-500'>{usernameError}</p>}
                    <label className='input input-bordered rounded flex items-center gap-2'>
                        <MdPassword />
                        <input
                            type='password'
                            className='grow'
                            placeholder='Password'
                            name='password'
                            onChange={handleInputChange}
                            value={formData.password}
                        />
                    </label>
                    <button className='btn rounded-full bg-teal-500 text-white hover:bg-teal-600'>
                        {isPending ? "Loading..." : "Sign up"}
                    </button>
                    {isError && <p className='text-red-500'>{error.message}</p>}
                </form>
                <div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
                    <p className='text-white text-lg'>Already have an account?</p>
                    <Link to='/login'>
                        <button className='btn rounded-full bg-grey-500 text-white hover:bg-grey-600 btn-outline w-full'>
                            Sign in
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default SignUpPage;
