import React from "react";
import Sidebar from "./Components/Sidebar";
import BlogThreadCard from "./Components/BlogThreadCard";

export default function Home() {
  return (
    <>

      <div className='threadBox'>
       
        <br />
        <BlogThreadCard className="card"></BlogThreadCard>
        <BlogThreadCard className="card"></BlogThreadCard>
        <BlogThreadCard className="card"></BlogThreadCard>
        <BlogThreadCard className="card"></BlogThreadCard>
        <BlogThreadCard className="card"></BlogThreadCard>
        <BlogThreadCard className="card"></BlogThreadCard>
        <BlogThreadCard className="card"></BlogThreadCard>
        <BlogThreadCard className="card"></BlogThreadCard>
        <BlogThreadCard className="card"></BlogThreadCard>
        <BlogThreadCard className="card"></BlogThreadCard>
        <BlogThreadCard className="card"></BlogThreadCard>
      </div>


    </>
  );
}
