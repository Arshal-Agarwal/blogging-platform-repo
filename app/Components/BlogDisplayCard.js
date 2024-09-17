import React from 'react';

export default function BlogDisplayCard({ title, content, category, tags = [], likeCount }) {
    return (
        <div className="max-w-6xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800 mx-auto mt-12">
            <div className="flex items-center justify-between">
                {/* Displaying tags */}
                <span className="text-xs font-light text-gray-600 dark:text-gray-400">
                    {Array.isArray(tags) ? tags.join(', ') : 'No tags'}
                </span>

                {/* Displaying category */}
                <a
                    className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
                    tabIndex={0}
                    role="button"
                >
                    {category || 'No category'}
                </a>
            </div>

            <div className="mt-2">
                <p className='text-2xl inline font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline'>
                    {title || 'Untitled'}
                </p>
                <p className="mt-4 ml-4 text-gray-600 dark:text-gray-300">
                    {content || 'No content available'}
                </p>
            </div>

            <button
                className="rounded-md mt-8 ml-4 bg-slate-700 p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-white hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
            </button>
            <p className='text-xs ml-4'>{likeCount || 0} Likes</p>
        </div>
    );
}
