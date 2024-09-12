import React from 'react'
import BlogThreadCard from '@/app/Components/BlogThreadCard';
import Sidebar from '@/app/Components/Sidebar';

export default function page() {
    return (
        <div className='threadBox'>
            <br />
            <br />
            <br />
            <Sidebar></Sidebar>
            <BlogThreadCard className="card"></BlogThreadCard>
            <BlogThreadCard className="card"></BlogThreadCard>
            <BlogThreadCard className="card"></BlogThreadCard>
            <BlogThreadCard className="card"></BlogThreadCard>
            <BlogThreadCard className="card"></BlogThreadCard>
            <BlogThreadCard className="card"></BlogThreadCard>
        </div>
    );
}
