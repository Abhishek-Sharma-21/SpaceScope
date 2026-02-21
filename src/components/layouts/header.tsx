'use client'

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="w-full px-6 py-4 text-white shadow-md backdrop-blur-md bg-transparent">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="text-3xl font-extrabold tracking-widest">
                    <Link href={"/"}>

                        SPACESCOPE
                    </Link>
                </div>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex gap-6 text-lg font-medium">
                    <Link href="/apod" className="hover:text-indigo-400 transition-colors duration-200">
                        Picture of the Day
                    </Link>
                    <Link href="/mars-rover" className="hover:text-indigo-400 transition-colors duration-200">
                        Natural Disaster Events
                    </Link>
                    <Link href="/asteroids" className="hover:text-indigo-400 transition-colors duration-200">
                        Asteroid Tracker
                    </Link>
                    <Link href="/earth" className="hover:text-indigo-400 transition-colors duration-200">
                        Space Weather Notifications
                    </Link>
                    <Link href="/missions" className="hover:text-indigo-400 transition-colors duration-200">
                        Missions
                    </Link>
                </div>

                {/* Hamburger Menu */}
                <div className="flex items-center">
                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="flex flex-col gap-4 mt-4 text-base font-medium md:hidden">
                    <Link href="/apod" className="hover:text-indigo-400">Picture of the Day</Link>
                    <Link href="/mars-rover" className="hover:text-indigo-400">Mars Rover Photos</Link>
                    <Link href="/asteroids" className="hover:text-indigo-400">Asteroid Tracker</Link>
                    <Link href="/earth" className="hover:text-indigo-400">Earth Imagery</Link>
                    <Link href="/missions" className="hover:text-indigo-400">Missions</Link>
                </div>
            )}
        </nav>
    )
}
