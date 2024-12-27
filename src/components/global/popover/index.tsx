import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils'
type props = {
    trigger: JSX.Element
    children: React.ReactNode,
    className?: string
}
const PopOver = ({ trigger, children, className }: props) => {
    return (
        <Popover>
            <PopoverTrigger asChild>{trigger}</PopoverTrigger>
            <PopoverContent className={cn('bg-[#1d1D1D] shadow-lg rounded-xl' , className)} align={'end'} side={'bottom'}>
                {children}
            </PopoverContent>
        </Popover>
    )
}

export default PopOver