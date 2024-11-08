"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import Sidebar from "app/Components/Sidebar";
import MyContext from 'app/contexts/LogInContext';

export default function Delete() {
  const { LogInState, setLogInState } = useContext(MyContext);
  const text_ref = useRef();
  const router = useRouter();

  async function submitClick() {
    const emailInput = text_ref.current.value.trim(); // Trim any extra spaces
    let storedEmail = localStorage.getItem("user")?.trim(); // Trim the stored value as well
    
    // Clean up the quotes around the stored email, if any
    // storedEmail = storedEmail?.substring(1, storedEmail.length - 1);

    // Compare without extra spaces
    if (storedEmail === emailInput) {
      console.log("Deleting user...");

      try {
        // Send DELETE request to backend to delete the user
        const response = await fetch("/api/users/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: emailInput }),
        });

        if (response.ok) {
          setLogInState(true);
          alert("User deleted successfully.");

          // Optionally, clear localStorage or redirect
          localStorage.removeItem("user");
          // Redirect to a different page if needed
          router.push("/Pages/SignIn")  // Redirect to login page or another page
        } else {
          const data = await response.json();
          alert(`Error: ${data.message || 'Unable to delete user'}`);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user.");
      }
    } else {
      console.log("Emails do not match");
    }
  }

  return (
    <div className="pr-32 ">
      <Sidebar></Sidebar>
      <div className="text-black flex mt-32 float-right mr-96 ">
        <div className="w-72">
          <label className="text-gray-700 dark:text-gray-200" htmlFor="email">
            Confirm Email
          </label>
          <br />
          <input
            id="email"
            type="email"
            ref={text_ref}
            className="block w-full px-4 py-2 mt-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring"
          />
          <button
            onClick={submitClick}
            className="mt-6 max-h-12 px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
