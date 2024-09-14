"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function BlogContentCard() {
  return (
    <div className="w-3/5  max-h-72 px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800 mb-10  mx-auto overflow-hidden">
      <div className="flex items-center justify-between">
        <Image className="hidden object-cover w-10 h-10 mr-4 rounded-full sm:block" src="/logo.png" height={100} width={100} alt="avatar" />
        <span className="text-sm font-light text-gray-600 dark:text-gray-400">u/Arshal11</span>
        <p className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-default hover:bg-gray-500" tabIndex="0" role="button">Design</p>
      </div>

      <div className="mt-2">
        <Link href="../Pages/DisplayBlog" className="text-xl underline font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" tabIndex="0" role="link">Blog Title</Link>
        <p className="mt-2 text-gray-600 dark:text-gray-300 overflow-hidden text-ellipsis max-h-24">Blog Content.....Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!</p>
        <p className="mt-2 text-gray-600 dark:text-gray-300 overflow-hidden text-ellipsis max-h-24">Blog Content.....Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!</p>
        <p className="mt-2 text-gray-600 dark:text-gray-300 overflow-hidden text-ellipsis max-h-24">Blog Content.....Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!</p>
      </div>

      <div className="flex items-center justify-between mt-4 ">
        <Link href="../Pages/DisplayBlog" className="text-blue-600 dark:text-blue-400  hover:underline " tabIndex="0" role="link">Read more</Link>
        <div className="flex items-center">
          <Link className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabIndex="0" role="link" href="../Pages/DisplayBlog">Arshal Agarwal</Link>
        </div>
      </div>
    </div>
  )
}
