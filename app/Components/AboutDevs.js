import React from 'react';
import Image from 'next/image';

const AboutDevs = () => {
    return (
        <div>

            <div className="flex  space-x-48 pt-12 pl-48 mb-12">
                <div className='pt-12  bg-slate-100 pb-6 w-96 rounded-md shadow-xl flex flex-col items-center'>
                    <Image
                        alt="none"
                        src="/Darshan.jpg"
                        height={250}
                        width={250}
                        className="rounded-xl"
                    />
                    <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl text-center">Darshan Atkari</h3>
                    <p className="mt-2 max-w-sm text-sm text-gray-700 text-center">
                        Backend Expert with extensive knowledge of NodeJS and Databases.
                    </p>
                </div>

                <div className='pt-12  bg-slate-100 pb-6 w-96 rounded-md shadow-xl  flex flex-col items-center'>
                    <Image
                        alt="none"
                        src="/Arshal.jpg"
                        height={250}
                        width={250}
                        className="rounded-xl"
                    />
                    <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl text-center">Arshal Agarwal</h3>
                    <p className="mt-2 max-w-sm text-sm text-gray-700 text-center">
                        Full-Stack Web Developer with boundless expertise in Front-end Development and Data-Structures.
                    </p>
                </div>
            </div>


            <div className="flex  space-x-48 pt-12 pl-48 mb-12">
                <div className='pt-12  bg-slate-100 pb-6 w-96 rounded-md shadow-xl flex flex-col items-center'>
                    <Image
                        alt="none"
                        src="/avishkar.jpg"
                        height={250}
                        width={250}
                        className="rounded-xl"
                    />
                    <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl text-center">Avishkar Sonpipare</h3>
                    <p className="mt-2 max-w-sm text-sm text-gray-700 text-center">
                        ML prodigy and backend enthusiast with comprehensive knowledge of MySQL and Ml algorithms. 
                    </p>
                </div>

                <div className='pt-12  bg-slate-100 pb-6 w-96 rounded-md shadow-xl  flex flex-col items-center'>
                    <Image
                        alt="none"
                        src="/"
                        height={250}
                        width={250}
                        className="rounded-xl"
                    />
                    <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl text-center">Avanti Patil</h3>
                    <p className="mt-2 max-w-sm text-sm text-gray-700 text-center">
                    Tech enthusiast with a focus on IoT, MySQL, and automation, creating efficient, data-driven solutions.
                    </p>
                </div>
            </div>

        </div>
    );
};

export default AboutDevs;
