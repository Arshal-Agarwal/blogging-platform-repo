"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogContentCard({ title, content, category, author, id }) {

  console.log(author);
  

  return (
    <div className="w-4/6 max-h-72 px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800 mb-10 float-right mr-16 overflow-hidden">
      <div className="flex items-center justify-between">
        <Image className="hidden object-cover w-10 h-10 mr-4 rounded-full sm:block" src="/logo.png" height={100} width={100} alt="avatar" />
        <span className="text-sm font-light text-gray-600 dark:text-gray-400">u/{author}</span>
        <p className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-default hover:bg-gray-500" tabIndex={0} role="button">{category}</p>
      </div>

      <div className="mt-2">
        {/* Link to the dynamic post page by ID */}
        <Link href={`/Pages/blog/${id}`} className="text-xl underline font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">
          {title}
        </Link>
        <p className="mt-2 text-gray-600 dark:text-gray-300 overflow-hidden text-ellipsis max-h-24">{content.length > 200 ? content.substring(0, 500) + '...' : content}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Link href={`/Pages/blog/${id}`} className="text-blue-600 dark:text-blue-400 hover:underline">Read more</Link>
        <div className="flex items-center">
          <Link className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" href={`/Pages/blog/${id}`}>
            {author}
          </Link>
        </div>
      </div>
    </div>
  );
}
