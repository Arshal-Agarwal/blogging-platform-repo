"use client";  // Mark this as a Client Component

import React, { useEffect, useState } from "react";
import BlogThreadCard from "./Components/BlogThreadCard";

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

  return (
    <>
      <div className='threadBox mr-48'>
        <br />
        {posts.length > 0 ? (
          posts.map(post => (
            <BlogThreadCard
              key={post.id}
              title={post.title}
              content={post.content}
              category={post.category}
              tags={post.tags}
              createdAt={post.createdAt}
            />
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </>
  );
}
