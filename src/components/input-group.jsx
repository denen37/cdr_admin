import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { X } from 'lucide-react'

export const CustomInputGroup = ({ id, placeholder, maxWidth }) => {
    return (
        <InputGroup className={`${maxWidth ? `max-w-${maxWidth}` : ''}`}>
            <InputGroupInput
                id={id}
                type="text"
                placeholder={placeholder}
            />
            <InputGroupAddon
                align="inline-end"
                className='cursor-default group'
                onClick={() => { }}>
                <X className="text-red-500 group-active:scale-95 transition-all duration-300" />
            </InputGroupAddon>
        </InputGroup>
    )
}