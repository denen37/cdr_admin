import { CircleX } from "lucide-react"
import {
    Alert,
    AlertDescription,
} from "@/components/ui/alert"

//<CircleX size={16} strokeWidth={1.75} /> <CircleX size={16} color="#70af23" strokeWidth={1.75} />

const AlertError = ({ message }) => {
    return (
        <Alert className="max-w-md bg-red-100 py-1 my-2 rounded-sm flex items-center">
            <CircleX size={16} color="#fb2c36" strokeWidth={1.75} />
            <AlertDescription className='text-red-500 text-xs pt-1'>
                {message}
            </AlertDescription>
        </Alert>
    )
}

export default AlertError