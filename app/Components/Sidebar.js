"use client";

import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import MyContext from 'app/contexts/LogInContext';
import Image from 'next/image';


export default function Sidebar() {
    const { LogInState, setLogInState } = useContext(MyContext);
    const [username, setUsername] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Load dark mode preference from localStorage on component mount
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(savedMode);
        if (savedMode) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    // Toggle dark mode and save the preference in localStorage
    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        document.documentElement.classList.toggle('dark', newMode);
        localStorage.setItem('darkMode', newMode);
    };

    // Fetch the username based on the email stored in localStorage
    useEffect(() => {
        let email = localStorage.getItem('user');
        email = email.substring(1,email.length-1);
        console.log(email);
        

        const fetchUsername = async () => {
            if (email) {
                try {
                    const response = await fetch('/api/users/getName', {
                        method: 'GET',
                        headers: {
                            'x-user-email': email,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUsername(data.username);
                    } else {
                        console.error('Failed to fetch username');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };

        fetchUsername();
    }, []);

    function LogOutClick() {
        setLogInState(false);
        localStorage.setItem('user', '');
        window.location.href = '/';
    }

    return (
        <div className='inline-block fixed border-r-2 border-neutral-100 clear-both dark:border-black'>
            <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
                <Image
                    className="sm:w-32 sm:h-32 rounded-xl ml-10"
                    src="/logo.png"
                    alt="Logo"
                    width={1024}
                    height={1024}
                />

                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav>
                        {/* Display fetched username */}
                        <div className="flex items-center text-2xl font-extrabold px-4 py-2 mt-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400">
                            <span className="mx-4 font-2xl">{username ? `${username}` : ""}</span>
                        </div>
                        
                        <div className="flex items-center  py-2  text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400">
                            <span className="mx-4 font-2xl">{localStorage.getItem('user').substring(1,(localStorage.getItem('user')).length-1)}</span>
                        </div>

                        {!LogInState && (
                            <Link className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="/Pages/ManageAcc">
                                <span className="mx-4 font-medium">Manage Account</span>
                            </Link>
                        )}

                        <Link className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="/">
                            <span className="mx-4 font-medium">Scroll Blogs</span>
                        </Link>

                        {!LogInState && (
                            <button className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" onClick={LogOutClick}>
                                <span className="mx-4 font-medium">Log Out</span>
                            </button>
                        )}

                        {!LogInState && (
                            <Link href="/Pages/Delete" className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                                <span className="mx-4 font-medium">Delete Account</span>
                            </Link>
                        )}

                        <button className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" onClick={toggleDarkMode}>
                            <span className="mx-4 font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                        </button>
                    </nav>
                </div>
            </aside>
        </div>
    );
}
