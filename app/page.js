"use client";  // Mark this as a Client Component

import React, { useEffect, useState } from "react";
import BlogContentCard from "./Components/BlogContentCard";
import Sidebar from "./Components/Sidebar";

export default function Home() {
  const [posts, setPosts] = useState([]);

  // Fetch all posts from the API
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts/getall');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, []);

  console.log(posts);
  

  return (
    <>
      <Sidebar></Sidebar>
      <div className='threadBox '>
        <br />
        {posts.length > 0 ? (
          posts.map(post => (
            <BlogContentCard
              id={post.id}
              key={post.id}
              title={post.title}
              content={post.content}
              category={post.category}
              tags={post.tags}
              createdAt={post.createdAt}
              author={post.author}
            />
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </>
  );
}
