"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

export default function BlogDisplayCard({ title, content, category, tags, likeCount, email, id }) {
    const [showDelete, setShowDelete] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false);

    const router=useRouter();
    // Capitalize text content
    title = title.charAt(0).toUpperCase() + title.slice(1);
    tags = tags.charAt(0).toUpperCase() + tags.slice(1);
    content = content.charAt(0).toUpperCase() + content.slice(1);

    // Check if user has permission to delete (only show delete button if email matches)
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            if (email === localStorage.getItem('user')) {
                setShowDelete(true);
            }
        }
    }, [email]);

    // Delete post function
    async function onClickDelete() {
        // Get the last segment of the current URL path
        const currentUrl = window.location.pathname;
        const urlParts = currentUrl.split('/');
        const postId = urlParts[urlParts.length - 1]; // Get the last part of the URL (post ID)
    
        console.log('Deleting post with id:', postId); // Log the id to ensure it's correct
    
        try {
            const response = await fetch(`/api/posts/deletePost?id=${postId}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                setShowAlert(true);
                
                await delay(1000); 
                // alert('Post deleted successfully!');
                router.push("/Pages/Profile");
                // Optionally, remove the post from the UI without refreshing
            } else {
                const data = await response.json();
                // alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('An error occurred while deleting the post.');
        }
    }
    
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    

    return (
        <div>
            <div className="max-w-6xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800 mx-auto mt-12">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-light text-gray-600 dark:text-gray-400">{tags}</span>
                    <a
                        className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
                        tabIndex={0}
                        role="button"
                    >
                        {category || 'No category'}
                    </a>
                </div>
                <br />
                <div className="mt-2">
                    <div className='bg-slate-200 pt-2 pl-2 pr-2 pb-1 border-zinc-900 border-2 rounded-md'>
                        <p className='text-2xl inline font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 '>
                            {title || 'Untitled'}
                        </p>
                    </div>
                    <br />
                    <div className='rounded-md'>
                        <p className="mt-2 ml-1 text-gray-600 dark:text-gray-300">
                            {content || 'No content available'}
                        </p>
                    </div>
                </div>

                {/* <button
                    className="rounded-md mt-8 ml-4 bg-slate-700 p-1 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-white hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                </button>
                <p className='text-xs ml-4'>{likeCount || 0} Likes</p> */}

                {/* Show Delete button only if user owns the post */}
                {showDelete && (
                    <button
                        onClick={onClickDelete}
                        className="px-6 mt-6 mr-10 inline float-right py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                    >
                        Delete blog
                    </button>
                )}
                {showAlert &&
                <div className="flex float-right mt-6 ml-auto mr-16 max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className="flex items-center justify-center w-12 bg-red-500">
                        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                        </svg>
                    </div>
                    <div className="px-4 py-2 -mx-3">
                        <div className="mx-3">
                            <span className="font-semibold text-red-500 dark:text-red-400">Success</span>
                            <p className="text-sm text-gray-600 dark:text-gray-200">Blog deleted successfully</p>
                        </div>
                    </div>
                </div>
            }
            </div>
        </div>
    );
}
