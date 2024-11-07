"use client";  // Marks this file as a Client Component

import React, { useEffect, useState, useContext } from 'react';
import Sidebar from 'app/Components/Sidebar';
import BlogContentCard from 'app/Components/BlogContentCard';
import { useRouter } from 'next/navigation';
import MyContext from 'app/contexts/LogInContext';

export default function Page() {

  const { LogInState } = useContext(MyContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // Fetch all posts from the API
  useEffect(() => {

    if (LogInState) {
      router.push('/Pages/SignIn');  // Redirect to sign-in page if not authenticated
      return;
    }

    async function fetchPosts() {
      try {
        // Retrieve email from localStorage
        const email = localStorage.getItem('user');

        const response = await fetch('/api/posts/getallbyuser', {  // Adjust the API route as per your setup
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-user-email': email, // Pass the email in custom header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          setError('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Error fetching posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [LogInState, router]);

  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main content area for displaying blog posts */}
      <div className="w-full ml-8">
        <br />
        {loading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : posts.length > 0 ? (
          posts.map(post => (
            <BlogContentCard
              key={post.id}
              title={post.title}
              content={post.content}
              category={post.category}
              author={post.author || 'Unknown Author'} // Dynamic author, fallback to 'Unknown Author'
              id={post.id} // Assuming `post.id` is used for unique URL slug
            />
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
}
