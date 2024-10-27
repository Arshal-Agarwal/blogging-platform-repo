"use client"
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { isAuthenticated } from 'app/utility/auth';
import { useRouter } from 'next/navigation';
import Sidebar from 'app/Components/Sidebar';

export default function Page() {
    const emailRef = useRef(null);
    const newEmailRef = useRef(null);
    const passwordRef = useRef(null);
    const newPasswordRef = useRef(null);

    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    const router = useRouter();

    useEffect(() => {
        // Redirect to sign-in page if not authenticated
        if (!isAuthenticated()) {
            router.push('/Pages/SignIn');
        }
    }, [router]);

    async function handleSubmitEmail(event) {
        event.preventDefault();
        const email = emailRef.current?.value;
        const newEmail = newEmailRef.current?.value;

        if (!email || !newEmail) {
            setEmailMessage('Please provide both current and new email.');
            return;
        }

        try {
            const response = await fetch('/api/users/profile/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newEmail }),
            });

            const data = await response.json();
            if (response.ok) {
                setEmailMessage(data.message);
                emailRef.current.value = '';
                newEmailRef.current.value = '';
            } else {
                setEmailMessage(data.message || 'Failed to update email.');
            }
        } catch (error) {
            setEmailMessage('An error occurred.');
        }
    }

    async function handleSubmitPassword(event) {
        event.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const newPassword = newPasswordRef.current?.value;

        if (!email || !password || !newPassword) {
            setPasswordMessage('Please provide current email, password, and new password.');
            return;
        }

        try {
            const response = await fetch('/api/users/profile/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, newPassword }),
            });

            const data = await response.json();
            if (response.ok) {
                setPasswordMessage(data.message);
                passwordRef.current.value = '';
                newPasswordRef.current.value = '';
            } else {
                setPasswordMessage(data.message || 'Failed to update password.');
            }
        } catch (error) {
            setPasswordMessage('An error occurred.');
        }
    }

    return (
        <div className='flex h-full'>
            <Sidebar/>
            <section className="max-w-4xl mt-32 p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Account Settings</h2>

                <form>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="email">Current Email</label>
                            <input
                                id="email"
                                type="text"
                                ref={emailRef}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="newEmail">New Email</label>
                            <input
                                id="newEmail"
                                type="email"
                                ref={newEmailRef}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Current Password</label>
                            <input
                                id="password"
                                type="password"
                                ref={passwordRef}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="newPassword">New Password</label>
                            <input
                                id="newPassword"
                                type="password"
                                ref={newPasswordRef}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            onClick={handleSubmitEmail}
                            className="px-8 py-2.5 mr-8 leading-5 text-white transition-colors bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        >
                            Update email
                        </button>
                        <span className="text-red-500">{emailMessage}</span>

                        <button
                            onClick={handleSubmitPassword}
                            className="px-8 py-2.5 leading-5 text-white transition-colors bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        >
                            Update password
                        </button>
                        <span className="text-red-500">{passwordMessage}</span>
                    </div>
                </form>
            </section>
        </div>
    );
}
