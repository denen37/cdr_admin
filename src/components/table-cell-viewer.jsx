import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { useIsMobile } from "@/hooks/use-mobile"
import { TrendingUpIcon } from "lucide-react"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DatePickerTime } from "@/components/datetime-picker"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {format} from 'date-fns'
import {useEffect, useState, useMemo} from "react"
import { useUpdateCallMutation } from "@/services/callApi"


export function TableCellViewer({ item, children}) {
    const isMobile = useIsMobile()
    const id = item.id
    const [callerName, setCallerName] = useState(item.callerName)
    const [callerNo, setCallerNo] = useState(item.callerNumber)
    const [receiverNo, setReceiverNo] = useState(item.receiverNumber)
    const [callStatus, setCallStatus] = useState(item.callStatus)
    const [callCost, setCallCost] = useState(item.callCost)
    const [callDuration, setCallDuration] = useState(item.callDuration)
    const [callDirection, setCallDirection] = useState(item.callDirection)
    const [city, setCity] = useState(item.city)
    const [startTime, setStartTime] = useState(item.callStartTime)
    const [endTime, setEndTime] = useState(item.callEndTime)
    const [edited, setEdited] = useState(false)
    const [updated] = useUpdateCallMutation();

    const initialValues = useMemo(() => ({
        callerName: item.callerName,
        callerNo: item.callerNo,
        receiverNo: item.receiverNo,
        callStatus: item.callStatus,
        callDirection: item.callDirection,
        city: item.city,
        callCost: item.callCost,
        callDuration: item.callDuration,
        startTime: item.startTime,
        endTime: item.endTime,
      }), [item]);


    const handleSubmit = async () => {
        const formValues = {
            callerName: callerName,
            callerNumber: callerNo,
            receiverNumber: receiverNo,
            callStatus,
            callDirection,
            city,
            callCost,
            callDuration,
            callStartTime: startTime,
            callEndTime: endTime,
        }

        try {
            const response = await updated({id: id, ...formValues,}).unwrap();
        
            window.alert("Update successful")

            // console.log(response)
        } catch (error) {
            console.log(error)
            if(error.status == 403){
                window.alert("Forbidden: You do not have permission to perform this action")
            }else if(error.status == 403){
                window.alert("Unauthorized !")
            }else{
                window.alert("Update Failed! Something went wrong")
            }
        }
    }


    return (
        <Drawer direction={isMobile ? "bottom" : "right"}>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="gap-1">
                    <DrawerTitle>Edit this record</DrawerTitle>
                    <DrawerDescription>
                        
                    </DrawerDescription>
                </DrawerHeader>
                <div className="no-scrollbar overflow-y-auto px-4">
                    <form className="flex flex-col gap-4 px-4">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="callerName">Caller Name</Label>
                            <Input id="callerName" 
                                defaultValue={callerName} 
                                className='text-muted-foreground'
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if(value !== initialValues.callerName){
                                        setCallerName(e.target.value)
                                        setEdited(true)
                                    }
                                }}
                                />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="callerNo">Caller Number</Label>
                                <Input id="callerNo" 
                                    defaultValue={callerNo} 
                                    className='text-muted-foreground'
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if(value !== initialValues.callerNo){
                                            setCallerNo(value)
                                            setEdited(true)
                                        }
                                    }}
                                    />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="receiverNo">Receiver Number</Label>
                                <Input id="receiverNo" 
                                    defaultValue={receiverNo} 
                                    className='text-muted-foreground'
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if(value !== initialValues.receiverNo){
                                            setReceiverNo(value)
                                            setEdited(true)
                                        }
                                    }}
                                    />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="status">Status</Label>

                                <Field orientation="horizontal">
                                    <Checkbox id="status" 
                                        name="status" 
                                        checked={callStatus}
                                        onCheckedChange={(e) => {
                                            if(e !== initialValues.callStatus){
                                                setCallStatus(e)
                                                setEdited(true)
                                            }
                                        }}
                                        />
                                    <FieldLabel htmlFor="status" className="text-muted-foreground">
                                        Success
                                    </FieldLabel>
                                </Field>
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="dir">Direction</Label>

                                <Field orientation="horizontal">
                                    <Checkbox id="direction" 
                                        name="direction" 
                                        checked={callDirection}
                                        onCheckedChange={(e) => {
                                            if(e !== initialValues.callDirection){
                                                setCallDirection(e)
                                                setEdited(true)
                                            }
                                        }}
                                        />
                                    <FieldLabel htmlFor="direction" className="text-muted-foreground">
                                        Forwarded
                                    </FieldLabel>
                                </Field>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" 
                                defaultValue={city} 
                                className="text-muted-foreground"
                                onChange={(e)=> {
                                    const value = e.target.value;
                                    if(value !== initialValues.city){
                                        setCallerNo(value)
                                        setEdited(true)
                                    }
                                }}
                                />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="callCost">Cost</Label>
                                <Input id="callCost" 
                                    defaultValue={callCost} 
                                    className="text-muted-foreground"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if(value !== initialValues.callCost){
                                            setCallCost(value)
                                            setEdited(true)
                                        }
                                    }}
                                    />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="callDuration">Duration</Label>
                                <Input id="callDuration" 
                                    defaultValue={callDuration} 
                                    className="text-muted-foreground"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if(value !== initialValues.callDuration){
                                            setCallDuration(value)
                                            setEdited(true)
                                        }
                                    }}
                                    />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="startTime">Start Time</Label>
                            <DatePickerTime 
                                defaultDate={new Date(startTime)}
                                defaultTime={format(new Date(startTime), 'hh:mm:ss')}
                                onDateChange={(e) => {
                                    if(e !== initialValues.startTime){
                                        setStartTime(e)
                                        setEdited(true)
                                    }
                                }}
                                />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="endTime">End Time</Label>
                            <DatePickerTime
                                defaultDate={new Date(endTime)}
                                defaultTime={format(new Date(endTime), 'hh:mm:ss')}
                                onDateChange={(e) => {
                                    if(e !== initialValues.endTime){
                                        setEndTime(e)
                                        setEdited(true)
                                    }
                                }}
                            />
                        </div>
                    </form>
                </div>
                <DrawerFooter>
                    <Button onClick={handleSubmit} disabled={!edited}>Submit</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
