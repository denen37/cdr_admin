/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { data } from "@/utils/filters"

const Filters = ({ filters, setFilters, setDate, className }) => {
    const [timeData, setTimeData] = useState(data.day);
    const [day, setDay] = useState(filters?.date?.day);
    const [week, setWeek] = useState("");
    const [month, setMonth] = useState(data.month[filters?.date?.month]);
    const [year, setYear] = useState(filters?.date?.year);
    const [value, setValue] = useState(day);
    const [category, setCategory] = useState("day");

    // const [dates, setDates] = useState([])

    //TODO - change the default value later
    const getCurrentIndex = () => timeData.indexOf(category === 'day' ? Number(value) : value)
    const hasNext = () => getCurrentIndex() < timeData.length - 1
    const hasPrev = () => getCurrentIndex() > 0

    const getDate = () => {
        let newDate

        if (week) {
            const [start, end] = week;
            newDate = `${start} - ${end} ${month}, ${year}`;
        } else {
            newDate = `${day ? day : ""} ${month}, ${year}`.trim();
        }

        return newDate;
    }

    const handleValueChange = (value) => {
        setValue(String(value));

        if (category === "day") {
            setDay(isNaN(Number(value)) ? "" : Number(value));
            setWeek("");
        } else if (category === "week") {
            setWeek(value.split("-"));
            setDay("");
        } else if (category === "month") {
            setMonth(value);
            setWeek("");
        }
    };

    useEffect(() => {
        let initialValue
        if (category === 'day')
            initialValue = day
        else if (category === 'week')
            initialValue = data[category][0]
        else if (category === 'month')
            initialValue = month

        setCategory(category)
        setTimeData(data[category])

        handleValueChange(initialValue)
    }, [category, day, week, month, year])

    useEffect(() => {
        setDay(filters?.date?.day ?? "")
        setWeek(filters?.date?.week ?? "")
        setMonth(data.month[filters?.date?.month] ?? "")
        setYear(filters?.date?.year ?? "")
    }, [filters])



    useEffect(() => {
        let newDate = getDate();

        setDate(newDate);

        setFilters({
            date: {
                day,
                week,
                month: data.month.indexOf(month),
                year,
            },
        });
    }, [day, week, month, year]);

    // useEffect(() => {
    //   console.log('dates', dates)
    // }, [dates])

    const activateBtn = (cat) =>
        category === cat ?
            'text-text-primary bg-accent' :
            'text-text-secondary'

    return (
        <div className={`items-center gap-4 ` + className}>
            <div className='flex items-center gap-1'>
                <Button
                    variant="outline"
                    size="sm"
                    className={"h-6 p-0 aspect-square text-text-secondary rounded-full"}
                    disabled={!hasPrev()}
                    onClick={() => handleValueChange(timeData[getCurrentIndex() - 1])}
                >
                    <FaAngleLeft />
                </Button>
                <Select
                    value={value ?? ""}
                    onValueChange={handleValueChange}>
                    <SelectTrigger className="text-text-primary bg-accent text-xs ">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                        position={"popper"}
                        sideOffset={0}
                        className="text-text-secondary text-xs"
                    >
                        <SelectGroup className="h-40">
                            {timeData.map((item) => (
                                <SelectItem
                                    key={item}
                                    value={item ? item.toString() : null}
                                    className="text-xs"
                                >
                                    {item ? item.toString() : "None"}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button
                    variant="outline"
                    size="sm"
                    className={"h-6 p-0 aspect-square text-text-secondary rounded-full"}
                    disabled={!hasNext()}
                    onClick={() => handleValueChange(timeData[getCurrentIndex() + 1])}
                >
                    <FaAngleRight />
                </Button>
            </div>

            <ButtonGroup>
                <Button
                    variant="outline"
                    size="sm"
                    className={`${activateBtn('day')}`}
                    onClick={() => setCategory("day")}
                >
                    Day
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className={`${activateBtn('week')}`}
                    onClick={() => setCategory("week")}
                >
                    Week
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className={`${activateBtn('month')}`}
                    onClick={() => setCategory("month")}
                >
                    Month
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default Filters;