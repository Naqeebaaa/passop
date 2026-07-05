import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-blue-950 text-white'>
            <div className="mycontainer flex justify-between items-center py-3 h-14">

                <div className="logo font-bold text-2xl">
                    <span className="text-blue-600">&lt;</span>
                    Pass
                    <span className='text-blue-600'>OP/&gt;</span>
                </div>

                <button className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 px-4 py-2 rounded-full ring-white ring-1">
                    <img
                        className="invert w-6 h-6"
                        src="icons/github.svg"
                        alt="GitHub"
                    />
                    <span className="text-white font-medium">GitHub</span>
                </button>

            </div>
        </nav>
    )
}

export default Navbar