
import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";


export const metadata = {
  title: "Blog",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen">
        <Navbar />

        {/* Main container with flex-grow to take up remaining space */}
        <div className="mx-auto px-0 w-full h-full ">
          {children}
        </div>

        {/* <Footer /> */}
      </body>
    </html>
  );
}
