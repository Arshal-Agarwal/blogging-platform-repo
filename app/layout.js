
import "./globals.css";
import Navbar from "./Components/Navbar";



export const metadata = {
  title: "Blog",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen">
        <Navbar />

        <main className="flex-grow pt-16 ">
          {children}
        </main>

        {/* <Footer /> */}
      </body>
    </html>
  );
}
