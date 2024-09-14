"use client"
import React, { useRef } from 'react';
import Link from 'next/link';
export default function Page() {
    const emailRef = useRef(null);
    const newEmailRef = useRef(null);
    const passwordRef = useRef(null);
    const newPasswordRef = useRef(null);

    function handleSubmitEmail(event) {
        event.preventDefault();
        if (emailRef.current) emailRef.current.value = '';
        if (newEmailRef.current) newEmailRef.current.value = '';
    }

    function handleSubmitPassword(event) {
        event.preventDefault();
        if (passwordRef.current) passwordRef.current.value = '';
        if (newPasswordRef.current) newPasswordRef.current.value = '';
    }

    return (
        <div className=' flex h-full'>

            <div className='inline-block fixed border-r-8  border-gray-800 clear-both'>
                <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
                    <div className="flex flex-col items-center mt-6 -mx-2">

                        <h4 className="mx-2 mt-2  font-bold text-gray-800 dark:text-gray-200">Arshal Agarwal</h4>
                        <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">arshal.agarwal23@vit.edu</p>
                    </div>

                    <div className="flex flex-col justify-between flex-1 mt-6">
                        <nav>
                            <Link className="flex items-center px-4 py-2 text-gray-700 rounded-lg dark:text-gray-200" href="/Pages/Profile">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <span className="mx-4 font-medium">My Blogs</span>
                            </Link>


                            <Link className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform rounded-lg  text-gray-700 bg-gray-100  dark:bg-gray-800 dark:text-gray-200" href="../Pages/ManageAcc">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <span className="mx-4 font-medium">Manage Account</span>
                            </Link>

                            <Link className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="/">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <span className="mx-4 font-medium">Scroll Blogs</span>
                            </Link>

                            <button className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" >


                                <span className="mx-4 font-medium">Toggle Mode</span>
                            </button>
                        </nav>
                    </div>
                </aside>
            </div>

            {/* <Sidebar></Sidebar> */}
            <section className="max-w-4xl mt-32 p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Account Settings</h2>

                <form>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Current Email</label>
                            <input
                                id="username"
                                type="text"
                                ref={emailRef}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">New Email</label>
                            <input
                                id="emailAddress"
                                type="email"
                                ref={newEmailRef}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Current Password</label>
                            <input
                                id="password"
                                type="password"
                                ref={passwordRef}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="passwordConfirmation">New Password</label>
                            <input
                                id="passwordConfirmation"
                                type="password"
                                ref={newPasswordRef}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            onClick={handleSubmitEmail}
                            className="px-8 mr-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        >
                            Update email
                        </button>

                        <button
                            onClick={handleSubmitPassword}
                            className="px-8 py-2.5 mr-8 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        >
                            Update password
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}
