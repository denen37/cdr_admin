/* eslint-disable no-unused-vars */
import React from 'react';
import KPISection from '../commons/KPISection';
import DurationChart from '../commons/DurationChart';

const CallSummary = ({ data }) => {
    return (
        <section className='flex flex-wrap gap-8 items-start justify-center' style={{ paddingTop: '20px' }}>
            <KPISection data={data} />
            <DurationChart data={data} />
        </section>
    );
};

export default CallSummary;