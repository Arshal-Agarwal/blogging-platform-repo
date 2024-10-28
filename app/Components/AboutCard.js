import Image from 'next/image';

const AboutCard = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">Technologies Used</h1>

          {/* <p className="max-w-lg mx-auto mt-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt, laudantium quia
            tempore delect
          </p> */}
        </div>

        <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
          <div>
            <div className="relative z-10 w-full h-96 rounded-md overflow-hidden">
              <Image
                src="/MySQL.png"
                alt="Blog post image"
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
              <p className="font-semibold text-gray-800 dark:text-white md:text-xl">
                MySQL
              </p>

              <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
              MySQL is an open-source relational database management system known for its reliability, performance, and ease of use in data storage.  
              </p>

              <p className="mt-3 text-sm text-blue-500">Oracle</p>
            </div>
          </div>

          <div>
            <div className="relative z-10 w-full h-96 rounded-md overflow-hidden">
              <Image
                src="/NextJS.png"
                alt="Blog post image"
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
              <p  className="font-semibold text-gray-800  dark:text-white md:text-xl">
                NextJS
              </p>

              <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
              Next.js is a powerful React framework that enables server-side rendering, static site generation, and optimized performance for  web applications.
              </p>

              <p className="mt-3 text-sm text-blue-500">Vercel</p>
            </div>
          </div>
        </div>

            <br />

        <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
          <div>
            <div className="relative z-10 w-full h-96 rounded-md overflow-hidden">
              <Image
                src="/Prisma.jpeg"
                alt="Blog post image"
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
              <p className="font-semibold text-gray-800 dark:text-white md:text-xl">
                Prisma
              </p>

              <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
              Prisma is an open-source database toolkit that simplifies database access for Node.js applications, providing type safety and intuitive query building.
              </p>

              <p className="mt-3 text-sm text-blue-500">Prisma Labs</p>
            </div>
          </div>

          <div className=''>
            <div className="relative z-10 w-full h-96 border-2 rounded-md overflow-hidden border-zinc-400">
              <Image
                src="/NextAuth.webp"
                alt="Blog post image"
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
              <p  className="font-semibold text-gray-800  dark:text-white md:text-xl">
                NextAuth
              </p>

              <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
              NextAuth is a flexible authentication solution for Next.js applications, offering support for various providers and easy session management.
              </p>

              <p className="mt-3 text-sm text-blue-500">NextAuth Core</p>
            </div>
          </div>
        </div>
      </div>

            

      <div className="container px-6 py-6 mx-auto">
        
        


          
      </div>

      
    </section>
  );
};

export default AboutCard;
