/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Filters from '../commons/Filters';
import { HiBars3 } from "react-icons/hi2";
import MobileFilters from '../commons/MobileFilters';


const Navbar = ({ filters, setFilters }) => {
    const [date, setDate] = useState("")
    const [open, setOpen] = useState(false)

    return (
        <nav className='sticky top-0 z-50 bg-background'>
            <div className='h-[var(--navbar-height)] px-[30px] sm:px-[50px] py-2 border-b-1 border-b-border flex flex-wrap items-center justify-between'>
                <h1 className='text-xl sm:text-2xl font-bold'>PineVox</h1>
                <div className='flex items-center gap-x-6'>
                    <p className='text-text-secondary text-xs'>{date}</p>
                    <Filters
                        filters={filters}
                        setFilters={setFilters}
                        setDate={setDate}
                        className='hidden sm:flex'
                    />
                </div>
                <button
                    className='cursor-pointer sm:hidden hover:text-text-secondary active:scale-90 transition-all duration-300'
                    onClick={() => setOpen(!open)}
                >
                    <HiBars3 className='size-6' />
                </button>
            </div>

            <MobileFilters open={open} setFilters={setFilters} setDate={setDate} />
        </nav>
    );
};

export default Navbar;