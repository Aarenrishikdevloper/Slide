import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
    children:React.ReactNode  
    type:'BUTTON' | 'LINK' 
    href?:string  
    className?:string
}

const GradientButton = ({className, children, type, href}:Props) => {  
    const gradient = 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-[2x]' 
     switch (type) {
        case 'BUTTON':
              return (
                <div className={gradient}>
                    <Button className={cn(className, 'rounded-xl')}>
                        {children}
                    </Button>
                </div>
                )
        case 'LINK':  
        return (
            <div className={gradient}>
                <Link href={href!} className={cn(className, 'rounded-xl')}>
                    {children}
                </Link>
            </div>
            )  
        

     }
}

export default GradientButton