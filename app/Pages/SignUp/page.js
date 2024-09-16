"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignupSection = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        bio: ''
    });
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setShowAlert(false);
        setError('');
        setSuccess('');

        try {
            const res = await fetch('/api/users/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess('User created successfully!');
                setFormData({
                    fullName: '',
                    username: '',
                    email: '',
                    password: '',
                    bio: ''
                });
                router.push('signin');

            } else {
                setError(data.error || 'Something went wrong');
            }
        } catch (err) {
            setError('Failed to create user. Try again later.');
        } finally {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 1500);
        }
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="flex justify-center min-h-screen">
                <div
                    className="hidden bg-cover lg:block lg:w-2/5"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')",
                    }}
                />
                <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                    <div className="w-full">
                        <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                            Sign Up Now for free
                        </h1>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                            Set Up your Account
                        </p>
                        <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" onSubmit={handleSubmit}>
                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Bio</label>
                                <input
                                    type="text"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>
                            <br />
                            <button
                                type="submit" // Changed to submit to trigger form submission
                                className="flex items-center justify-between w-28 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                            >
                                Sign Up
                            </button>
                            {showAlert && success && (
                                <div className="flex float-right ml-auto mr-16 max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                                    <div className="flex items-center justify-center w-12 bg-emerald-500">
                                        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                                        </svg>
                                    </div>
                                    <div className="px-4 py-2 -mx-3">
                                        <div className="mx-3">
                                            <span className="font-semibold text-emerald-500 dark:text-emerald-400">Success</span>
                                            <p className="text-sm text-gray-600 dark:text-gray-200">Account Created</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {showAlert && error && (
                                <div className="flex float-right ml-auto mr-16 max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                                    <div className="flex items-center justify-center w-12 bg-red-500">
                                        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM20 30.8333C18.7 30.8333 17.5833 29.7166 17.5833 28.3333C17.5833 26.95 18.7 25.8333 20 25.8333C21.3 25.8333 22.4167 26.95 22.4167 28.3333C22.4167 29.7166 21.3 30.8333 20 30.8333ZM20 14.1666C18.7 14.1666 17.5833 15.2833 17.5833 16.6666V21.6666C17.5833 23.05 18.7 24.1666 20 24.1666C21.3 24.1666 22.4167 23.05 22.4167 21.6666V16.6666C22.4167 15.2833 21.3 14.1666 20 14.1666Z" />
                                        </svg>
                                    </div>
                                    <div className="px-4 py-2 -mx-3">
                                        <div className="mx-3">
                                            <span className="font-semibold text-red-500 dark:text-red-400">Error</span>
                                            <p className="text-sm text-gray-600 dark:text-gray-200">{error || 'Something went wrong'}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignupSection;
