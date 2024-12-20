"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import MyContext from 'app/contexts/LogInContext';

const SignInPage = () => {
  const { LogInState, setLogInState } = useContext(MyContext);

  const email_ref = useRef();
  const password_ref = useRef();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const phrases = ["Blog.", "Think it.", "Express it."];
  const [displayText, setDisplayText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [isTypingPaused, setIsTypingPaused] = useState(false);

  useEffect(() => {
    if (isTypingPaused) {
      const pauseTimeout = setTimeout(() => setIsTypingPaused(false), 100); // Longer pause duration
      return () => clearTimeout(pauseTimeout);
    }

    const timeout = setTimeout(() => {
      if (isErasing) {
        if (charIndex > 0) {
          setDisplayText((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        } else {
          setIsErasing(false);
          setIsTypingPaused(true); // Pause after erasing
          setDisplayText(""); // Empty display between phrases
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      } else {
        if (charIndex < phrases[currentPhraseIndex].length) {
          setDisplayText((prev) => prev + phrases[currentPhraseIndex][charIndex]);
          setCharIndex((prev) => prev + 1);
        } else {
          setIsErasing(true);
          setIsTypingPaused(true); // Pause after typing
        }
      }
    }, isErasing ? 200 : 200); // Slower effect

    return () => clearTimeout(timeout);
  }, [charIndex, isErasing, currentPhraseIndex, isTypingPaused, phrases]);

  async function SignInClick(e) {
    e.preventDefault();
    const email = email_ref.current.value;
    const password = password_ref.current.value;
  
    try {
      const response = await fetch('/api/users/signin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccess('Sign-in successful!');
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
  
        // Store user information in localStorage
        localStorage.setItem('user', email);
        console.log("Logged-in User:", email);
        
  
        setLogInState(false);
        router.push('/');
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to sign in. Please try again.');
    }
  }
  

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)'
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Blog.</h2>
              <p className="max-w-xl mt-3 text-gray-300">
                Welcome to Blog — where every voice finds its stage. Share your stories, insights, and passions with a vibrant community of readers and writers. Seamlessly blend creativity with simplicity, and let your words make an impact.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <Image
                  className="sm:w-32 sm:h-32 rounded-xl"
                  src="/logo.png"
                  alt="Logo"
                  width={1024}
                  height={1024}
                />
              </div>

              <br />
              <br />

              <div className="h-8"> {/* Fixed height to prevent shifting */}
                <p className="text-black text-3xl font-bold font-serif  dark:text-white">{displayText}</p>
              </div>

              <br />

            </div>

            <div className="mt-8">
              <form>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    ref={email_ref}
                    placeholder="example@example.com"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    ref={password_ref}
                    placeholder="Your Password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    onClick={SignInClick}
                  >
                    Sign in
                  </button>
                </div>

                {error && (
                  <div className="mt-4 text-red-500">{error}</div>
                )}
                {success && (
                  <div className="mt-4 text-green-500">{success}</div>
                )}
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">Don’t have an account yet? <Link href="../Pages/SignUp" className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
