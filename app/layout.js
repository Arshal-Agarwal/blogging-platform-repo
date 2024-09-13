
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

        <main className="flex-grow pt-16 pr-6 ">
          {children}
        </main>

        {/* <Footer /> */}
      </body>
    </html>
  );
}
