/* eslint-disable no-unused-vars */
import React from "react";
import { formatCost } from "@/utils/general";

const KPISection = ({ data }) => {
    const totalCalls = data.length;
    const totalCost = Math.round(data.reduce((acc, call) => acc + Number(call.callCost), 0));
    const avgDuration = Math.round(data.reduce((acc, call) => acc + Number(call.callDuration), 0) /
        (totalCalls === 0 ? 1 : totalCalls));
    const totalSucess = data.filter(call => call.callStatus).length;
    const totalFailed = data.filter(call => !call.callStatus).length;
    const successRate = Math.round(totalSucess / (totalCalls === 0 ? 1 : totalCalls) * 100);


    return (<div className="flex gap-4 items-center justify-center flex-wrap">
        <div className="p-4 flex flex-col items-center gap-1 bg-card w-fit rounded-lg border-1 border-border">
            <p className="text-xs text-text-secondary">Total Calls</p>
            <h1 className="text-3xl font-bold text-primary">{totalCalls}</h1>
        </div>
        <div className="p-4 flex flex-col items-center gap-1 bg-card w-fit rounded-lg border-1 border-border">
            <p className="text-xs text-text-secondary">Total Cost</p>
            <h1 className="text-3xl font-bold text-primary">{formatCost(totalCost)}</h1>
        </div>
        <div className="p-4 flex flex-col items-center gap-1 bg-card w-fit rounded-lg border-1 border-border">
            <p className="text-xs text-text-secondary">Avg Duration</p>
            <h1 className="text-3xl font-bold text-primary">{`${avgDuration}s`}</h1>
        </div>
        <div className="p-4 flex flex-col items-center gap-1 bg-card w-fit rounded-lg border-1 border-border">
            <p className="text-xs text-text-secondary">Success</p>
            <h1 className="text-3xl font-bold text-success">{totalSucess}</h1>
        </div>
        <div className="p-4 flex flex-col items-center gap-1 bg-card w-fit rounded-lg border-1 border-border">
            <p className="text-xs text-text-secondary">Failed</p>
            <h1 className="text-3xl font-bold text-danger">{totalFailed}</h1>
        </div>
        <div className="p-4 flex flex-col items-center gap-1 bg-card w-fit rounded-lg border-1 border-border">
            <p className="text-xs text-text-secondary">Success Rate</p>
            <h1 className="text-3xl font-bold text-success">{`${successRate}%`}</h1>
        </div>
    </div>)
}

export default KPISection

