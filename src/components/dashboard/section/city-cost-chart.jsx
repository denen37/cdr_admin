/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import CityChart from '../commons/CityChart';
import CostChart from '../commons/CostChart';

const CityCostChart = ({ data }) => {
    const [selected, setSelected] = useState('cost')

    if (!data.length) return null;

    return (
        <section className=''>
            <div className='p-4 border-1 border-border rounded-lg'>
                <div className='flex flex-wrap gap-x-6 gap-y-2'>
                    <div className='flex gap-2 items-center'>
                        <input
                            type="radio"
                            name="city"
                            id="cost_city"
                            value="cost"
                            checked={selected === 'cost'}
                            onChange={(e) => setSelected(e.target.value)}
                        />
                        <label htmlFor="cost_city" className='text-xs text-text-secondary'>Cost per City</label>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <input
                            type="radio"
                            name="city"
                            id="num_calls_city"
                            value="count"
                            checked={selected === 'count'}
                            onChange={(e) => setSelected(e.target.value)}
                        />
                        <label htmlFor="num_calls_city" className='text-xs text-text-secondary'>Number of Calls per city</label>
                    </div>
                </div>

                <div>
                    {
                        selected === 'cost' ? <CostChart data={data} /> : <CityChart data={data} />
                    }
                </div>
            </div>
        </section>
    );
};

export default CityCostChart;