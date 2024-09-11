"use client"
import React, { useRef , useState} from 'react'



export default function Compose() {
    
    const [blogContent, setblogContent] = useState("");
    const [Title, setTitle] = useState("");


    let blog_ref=useRef();
    let title_ref=useRef();


    function submitClick(){
        let Blog_Content=blog_ref.current.value;               //When connecting backend , add this Blog_Content in db
        let Blog_Title=title_ref.current.value;                //When connecting backend , add this Blog_title in db
        console.log("Blog content : "+Blog_Content);
        console.log("Blog title " + Blog_Title);
    }

    function blogChange(e){
        setblogContent(e.target.value)
    }

    function titleChange(ev){
        setTitle(ev.target.value);
    }



    return (
        <div className=" min-w-64 pl-24">
            <label htmlFor=""></label>
            <input className="title w-3/4 p-2  border border-gray-300 rounded mt-10" ref={title_ref}type="text" value={Title} onChange={titleChange} placeholder='Input Title here' />

            <div className='pr-16 mt-8'>
                <label htmlFor="Description" className="block text-sm text-gray-500 dark:text-gray-300">Blog Content:</label>

                <textarea ref={blog_ref} id="content"onChange={(e)=>blogChange(e)} value={blogContent} placeholder="Blog Content" className="block  mt-2  w-full  placeholder-gray-400/70 dark:placeholder-gray-800 rounded-lg border border-gray-200 bg-white px-4 h-96 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600  dark:text-gray-300 dark:focus:border-blue-300"></textarea>
            </div>

            <button onClick={submitClick}    className="mt-6  px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                Submit
            </button>
            
            <button className="px-6 ml-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                Draft
            </button>

            <button className="px-6 ml-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                Delete
            </button>

            <button className="px-6 ml-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                Format
            </button>
        </div>
    )
}