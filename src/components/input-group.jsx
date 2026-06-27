import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { X } from 'lucide-react'

export const CustomInputGroup = ({ id, placeholder, value, setValue, setKey, maxWidth }) => {
    return (
        <InputGroup className={`${maxWidth ? `max-w-${maxWidth}` : ''}`}>
            <InputGroupInput
                id={id}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => setKey(e.key)}
                type="text"
                placeholder={placeholder}
            />
            <InputGroupAddon
                align="inline-end"
                className='cursor-default group'
                onClick={() => {setValue(''); setKey('Enter')}}>
                <X className="text-red-500 group-active:scale-95 transition-all duration-300" />
            </InputGroupAddon>
        </InputGroup>
    )
}