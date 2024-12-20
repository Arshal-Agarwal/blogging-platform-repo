
import "./globals.css";
import Navbar from "./Components/Navbar";
import { MyProvider } from "./contexts/LogInContext";



export const metadata = {
  title: "Blog.",
  description: "Responsive Blogging Platform made using NextJS , Prisma ORM and MySQL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen bg-slate-200 dark:bg-black">
        <MyProvider>

        <Navbar />

        <main className="flex-grow pt-16 bg-slate-200 dark:bg-black">
          {children}
        </main>

        {/* <Footer /> */}
   
        </MyProvider>
      </body>
    </html>
  );
}
