'use client'
import Link from "next/link"
import { useState } from 'react'
import Image from "next/image";

export default function Header() {
    const [mobile, setMobile] = useState(false);

    return (
        <header className='bg-mb-black w-full z-10 top-0'>
            <nav className="container flex items-center py-4 justify-between">
                <div className="py-1">
                    <Link href={`/`}>
                        <Image 
                            src='/movie-buddy.png'
                            alt="logo"
                            width={40}
                            height={10}
                            className="hover:scale-110 cursor-pointer"
                        />
                    </Link>
                </div>
                <ul className='hidden md:flex flex-1 justify-end items-center gap-12 text-mb-text-blue uppercase font-bold'>
                    <li className='cursor-pointer hover:scale-110 text-white'>
                        <Link href={`/`}>Home</Link>
                    </li>
                    <li className='cursor-pointer hover:scale-110 text-white'>
                        <Link href={`/movies`}>Movies</Link>
                    </li>
                    <li className='cursor-pointer hover:scale-110 text-white'>
                        <Link href={`/tv`}>TV Shows</Link>
                    </li>
                    <li className='cursor-pointer hover:scale-110 text-white'>
                        <Link href={`/search`}>Search</Link>
                    </li>
                </ul>
                <div className="hamburger-menu flex flex-col items-end md:hidden flex-1 justify-end" onClick={() => setMobile(!mobile)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
            </nav>
            <div className={`${mobile ? '' : "hidden"} container md:hidden`}>
                <ul className=' md:block flex-1 justify-end items-center gap-12 text-mb-text-blue uppercase font-bold'>
                    <li className='cursor-pointer border-b pt-2 border-slate-300 md:hover:scale-110 text-white'>
                        <Link href={`/`}>Home</Link>
                    </li>
                    <li className='cursor-pointer border-b pt-2 border-slate-300 md:hover:scale-110 text-white'>
                        <Link href={`/movies`}>Movies</Link>
                    </li>
                    <li className='cursor-pointer border-b pt-2 border-slate-300 md:hover:scale-110 text-white'>
                        <Link href={`/tv`}>TV Shows</Link>
                    </li>
                    <li className='cursor-pointer border-b pt-2 border-slate-300 md:hover:scale-110 text-white'>
                        <Link href={`/search`}>Search</Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}