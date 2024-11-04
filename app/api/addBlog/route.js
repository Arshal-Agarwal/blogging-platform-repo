import pool from "lib/db";

export async function POST(request) {
  try {
    const { blog_title, blog_content } = await request.json();
    console.log(blog_title + "  " +blog_content);
    
    // Validate input
    if (!blog_title || !blog_content) {
      return new Response(
        JSON.stringify({ message: 'Blog title and content are required.' }),
        { status: 400 }
      );
    }

    // Insert blog data into the database
    const query = 'INSERT INTO posts (id,category,ownerid,title,content) VALUES (?,?,?,?, ?)';
    const values = ["1","test","1",blog_title, blog_content];
    await pool.execute(query, values);

    return new Response(
      JSON.stringify({ message: 'Blog added successfully!' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Database error:', error);
    return new Response(
      JSON.stringify({ message: 'Something went wrong: ' + error.message }),
      { status: 500 }
    );
  }
}
