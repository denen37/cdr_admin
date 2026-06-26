// /* eslint-disable no-unused-vars */
// import { useEffect, useState, useMemo } from 'react';
// import CityCostChart from '../components/dashboard/section/city-cost-chart';
// import TimelineChart from '../components/dashboard/section/timeline-chart';
// import Navbar from '../components/dashboard/section/navbar';
// import CallLogsTable from '../components/dashboard/section/call-logs-table';
// import CallSummary from '@/components/dashboard/section/call-summary';
// import { filterByDate } from "@/utils/charts";
// import { getDefaultDate } from '@/utils/filters'
// import { columns } from '@/components/commons/Column'
// import { transformsCallRecords } from '@/utils/general';
// import { LoaderIcon } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { useGetCallsQuery } from '@/services/callApi';

// function Dashboard() {
//     const [filters, setFilters] = useState({});
//     const [getCalls] = useGetCallsQuery()
//     // const { data: calls, isLoading, isError } = useGetCallsQuery();
//     const [calls, setCalls] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const handleGetCall = async (callData) => {
//         try {
//             const response = await getCalls().unwrap();
//             console.log("Call added successfully:", response);
//         } catch (error) {
//             console.error("Adding call failed:", error);
//         }
//     };

//     useEffect(() => {
//         handleGetCall();
//     }, [])

//     const filteredCalls = useMemo(() => {
//         return filterByDate(calls, filters.date);
//     }, [calls, filters]);

//     const callRecords = useMemo(() => {
//         return transformsCallRecords(filteredCalls)
//     }, [filteredCalls])

//     if (loading) return <div className='h-screen flex items-center justify-center'>
//         <LoaderIcon
//             role="status"
//             aria-label="Loading"
//             className="size-6 animate-spin"
//         />
//     </div>;

//     if (error) return <p className={cn("text-center text-red-500")}>
//         Error loading data...
//     </p>;

//     return (
//         <>
//             <Navbar filters={filters} setFilters={setFilters} />
//             <CallSummary data={filteredCalls} />
//             <CityCostChart data={filteredCalls} />
//             <TimelineChart data={filteredCalls} />
//             <CallLogsTable columns={columns} data={callRecords} />
//             <div>
//                 This is just a placeholder
//             </div>
//         </>
//     )
// }

// export default Dashboard

import { useGetCallsQuery } from "@/services/callApi";

function Dashboard() {
    const {
        data: calls = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useGetCallsQuery();

    if (isLoading) return <p>Loading...</p>;

    if (isError) {
        console.log(error);
        return <p>Failed to load calls</p>;
    }

    return (
        <div>
            <h1>Total Calls: {calls.count}</h1>

            <button onClick={refetch}>
                Refresh Calls
            </button>
        </div>
    );
}

export default Dashboard;
