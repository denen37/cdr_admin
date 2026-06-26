/* eslint-disable no-unused-vars */
import React from 'react';
import Filters from './Filters';

const MobileFilters = ({ filters, setFilters, setDate, open }) => {
    return (
        <div className={`
        overflow-hidden transition-all duration-300 ease-in-out flex justify-center flex-wrap
        ${open ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"}`}>
            <Filters
                filters={filters}
                setFilters={setFilters}
                setDate={setDate}
                className={'flex'}
            />
        </div>
    );
};

export default MobileFilters;