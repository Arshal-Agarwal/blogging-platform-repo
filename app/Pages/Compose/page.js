"use client"
import React, { useRef, useState } from 'react'




export default function Compose() {

    const [showAlert, setshowAlert] = useState(false);
    const [showTagInput, setshowTagInput] = useState(false);
    const [blogContent, setblogContent] = useState("");
    const [Title, setTitle] = useState("");
    const [Tags, setTags] = useState("");


    let blog_ref = useRef();
    let title_ref = useRef();
    let tag_ref = useRef();


    function submitClick() {
        let Blog_Content = blog_ref.current.value;               //When connecting backend , add this Blog_Content in db
        let Blog_Title = title_ref.current.value;                //When connecting backend , add this Blog_title in db
        console.log("Blog title " + Blog_Title);
        console.log("Blog content : " + Blog_Content);
        setshowAlert(true);
        setTimeout(() => {
            setshowAlert(false);
        }, 1500);

    }

    function onClearClick() {
        setTitle("");
        setblogContent("");
    }

    function onTagClick() {
        setTimeout(() => {
            tag_ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 0);
        setshowTagInput(true);

    }


    function blogChange(e) {
        setblogContent(e.target.value)
    }

    function titleChange(ev) {
        setTitle(ev.target.value);
    }

    function onSubmitTagClick() {

        setshowTagInput(false);
    }

    function tagsChange(e1) {
        setTags(e1.target.value);
    }



    return (
        <div className=" min-w-64  pl-24">
            <br /><br /> <br /> <br />
            <label className='username text-xs' htmlFor="">User : u/Arshal11</label>
            <input className="title w-3/4 p-2  border border-gray-300 rounded mt-2 block" ref={title_ref} type="text" value={Title} onChange={titleChange} placeholder='Input Title here' />

            <div className='pr-16 mt-8'>
                <label htmlFor="Description" className="block text-xs text-gray-500 dark:text-gray-300">Tags:  </label>

                <textarea ref={blog_ref} id="content" onChange={(e) => blogChange(e)} value={blogContent} placeholder="Enter blog content" className="block  mt-2  w-full  rounded-lg border border-gray-200 bg-white px-4 h-96 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600  dark:text-gray-300 dark:focus:border-blue-300"></textarea>
            </div>

            <button onClick={submitClick} className="mt-6  px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                {/* <Link href="/"> */}
                Submit
                {/* </Link> */}
            </button>

            <button onClick={submitClick} className="px-6 ml-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80" >
                Draft
            </button>

            <button onClick={onClearClick} className="px-6 ml-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                Clear
            </button>

            <button className="px-6 ml-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80" onClick={onTagClick}>
                Add Tags
            </button>

            <button className="px-6 ml-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80" >
                Image
            </button>

            {showTagInput && <div className="tags">
                <input className="tags w-3/4 p-2  border border-gray-300 rounded mt-10" ref={tag_ref} type="text" placeholder='Input Tags here , Separate them with a space' value={Tags} onChange={(e) => tagsChange(e)} />
                <button className="px-6 ml-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80" onClick={onSubmitTagClick}>
                    Submit Tags
                </button>
            </div>
            }


            {showAlert && <div className="flex ml-auto mr-16  max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
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
            </div>}
        </div>

    )
}