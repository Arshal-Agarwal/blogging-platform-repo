"use client";  // Marks this file as a Client Component

import React, { useEffect, useState } from 'react';
import Sidebar from 'app/Components/Sidebar';
import BlogContentCard from 'app/Components/BlogContentCard';

export default function Page() {
  const [posts, setPosts] = useState([]);

  // Fetch all posts from the API
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts/getall');  // Adjust the API route as per your setup
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
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main content area for displaying blog posts */}
      <div className="w-full ml-8">
        <br />
        {posts.length > 0 ? (
          posts.map(post => (
            <BlogContentCard
              key={post.id}
              title={post.title}
              content={post.content}
              category={post.category}
              author="Arshal11"  // Assuming a static author for now, replace with dynamic author if needed
              id={post.id}      // Assuming `post.id` is used for unique URL slug
            />
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
}
