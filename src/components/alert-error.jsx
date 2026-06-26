import { CircleX } from "lucide-react"
import {
    Alert,
    AlertDescription,
} from "@/components/ui/alert"

//<CircleX size={16} strokeWidth={1.75} /> <CircleX size={16} color="#70af23" strokeWidth={1.75} />

const AlertError = ({ messages }) => {
    return (
        <Alert className="max-w-md bg-red-100 py-1 my-2 rounded-sm">
            {
                messages.map((message, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <CircleX size={16} color="#fb2c36" strokeWidth={1.75} />
                        <AlertDescription className='text-red-500 text-xs pt-1'>
                            {message}
                        </AlertDescription>
                    </div>
                ))
            }
        </Alert>
    )
}

export default AlertError