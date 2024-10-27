"use client";

import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import MyContext from 'app/contexts/LogInContext';

export default function Sidebar() {
    const { LogInState, setLogInState } = useContext(MyContext);
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
    };

    function LogOutClick() {
        // Add log out backend logic here - Arshal
        setLogInState(false);
        window.location.href = '/';
    }

    return (
        <div className='inline-block fixed border-r-8 border-gray-800 clear-both'>
            <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
                <div className="flex flex-col items-center mt-6 -mx-2">
                    <h4 className="mx-2 mt-2 font-bold text-gray-800 dark:text-gray-200">Arshal Agarwal</h4>
                    <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">arshal.agarwal23@vit.edu</p>
                </div>

                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav>
                        {/* <Link className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200" href="">
                            <span className="mx-4 font-medium">My Blogs</span>
                        </Link> */}

                        <Link className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="../Pages/ManageAcc">
                            <span className="mx-4 font-medium">Manage Account</span>
                        </Link>

                        <Link className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="/">
                            <span className="mx-4 font-medium">Scroll Blogs</span>
                        </Link>

                        {!LogInState && <button className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" onClick={LogOutClick}>
                            <span className="mx-4 font-medium">Log Out</span>
                        </button>}

                        <button className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" onClick={toggleDarkMode}>
                            <span className="mx-4 font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                        </button>
                    </nav>
                </div>
            </aside>
        </div>
    );
}
