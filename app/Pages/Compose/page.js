"use client";  // Marks this file as a Client Component

import React, { useEffect, useRef, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import MyContext from 'app/contexts/LogInContext';

export default function Compose() {
    const { LogInState, setLogInState } = useContext(MyContext);
    const [showAlert, setshowAlert] = useState(false);
    const [blogContent, setblogContent] = useState("");
    const [Title, setTitle] = useState("");
    const [Tags, setTags] = useState("");
    const [Category, setCategory] = useState("");

    const blog_ref = useRef();
    const title_ref = useRef();
    const tag_ref = useRef();
    const cat_ref = useRef();
    const router = useRouter();

    useEffect(() => {
        // Redirect to sign-in page if not authenticated
        if (LogInState) {
            router.push('/Pages/SignIn');
        }
    }, [router]);

    // Submit form and send data to backend
    async function submitClick() {
        let Blog_Content = blog_ref.current.value;
        let Blog_Title = title_ref.current.value;
        let Blog_tags = tag_ref.current.value;
        let Blog_category = cat_ref.current.value;

        // Retrieve email from localStorage
        const userEmail = localStorage.getItem("user");

        // Check if email is available
        if (!userEmail) {
            console.error("User email not found in localStorage.");
            return;
        }

        console.log("Blog title: " + Blog_Title);
        console.log("Blog content: " + Blog_Content);
        console.log("Blog tags: " + Blog_tags);
        console.log("Blog category: " + Blog_category);

        // Send data to backend
        try {
            const response = await fetch('/api/posts/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: Blog_Title,
                    content: Blog_Content,
                    category: Blog_category,
                    tags: Blog_tags.split(','), // Convert to an array
                    email: userEmail,            // Pass the email here
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Post created:", data);
                setshowAlert(true);
                
                await delay(1000);

                onClearClick();
                router.push("/Pages/Profile") // Clear form after success
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    function onClearClick() {
        setTitle("");
        setblogContent("");
        setTags("");
        setCategory("");
    }

    function blogChange(e) {
        setblogContent(e.target.value);
    }

    function titleChange(ev) {
        setTitle(ev.target.value);
    }

    function tagsChange(e1) {
        setTags(e1.target.value);
    }

    function catsChange(e2) {
        setCategory(e2.target.value);
    }

    return (
        <div className="min-w-64 pl-24 mt-4">
            <label className='username text-xs' htmlFor="">User : u/Arshal11</label>
            <input className="title w-3/4 p-2 text-slate-950 dark:bg-slate-200 border border-gray-300 rounded mt-2 block"
                ref={title_ref}
                type="text"
                value={Title}
                onChange={titleChange}
                placeholder='Enter Title here'
            />

            <input className="tags w-1/4 p-2 border text-slate-950 dark:bg-slate-200 border-gray-300 rounded mt-10"
                ref={tag_ref}
                type="text"
                placeholder='Enter Tag'
                value={Tags}
                onChange={(e) => tagsChange(e)}
            />

            <input className="tags w-1/4 p-2 ml-12 border text-slate-950 dark:bg-slate-200 border-gray-300 rounded mt-10"
                ref={cat_ref}
                type="text"
                placeholder='Enter Category'
                value={Category}
                onChange={(e) => catsChange(e)}
            />

            <div className='pr-16 mt-8'>
                <textarea ref={blog_ref} id="content"
                    onChange={(e) => blogChange(e)}
                    value={blogContent}
                    placeholder="Enter blog content"
                    className="block mt-2 w-full text-slate-950 rounded-lg border dark:bg-slate-200 px-2 h-96 py-2.5 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:text-gray-300 dark:focus:border-blue-300">
                </textarea>
            </div>

            <button onClick={submitClick} className="mt-6 px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                Submit
            </button>

            <button onClick={onClearClick} className="px-6 ml-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                Clear
            </button>

            {showAlert &&
                <div className="flex float-right ml-auto mr-16 max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className="flex items-center justify-center w-12 bg-emerald-500">
                        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                        </svg>
                    </div>
                    <div className="px-4 py-2 -mx-3">
                        <div className="mx-3">
                            <span className="font-semibold text-emerald-500 dark:text-emerald-400">Success</span>
                            <p className="text-sm text-gray-600 dark:text-gray-200">Your Blog is submitted</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
