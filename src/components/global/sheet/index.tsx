import React from 'react'
import {
    Sheet as ShadCnSheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
type props ={
    trigger:React.ReactNode 
    children:React.ReactNode   
    className?:string 
    side:"left" | "right"
}
const Sheet = ({trigger,children, className, side}:props) => {
  return ( 
   <ShadCnSheet>
     <SheetTrigger>{trigger}</SheetTrigger>  
     <SheetContent className='p-0' side={side}> 
        {children}
     </SheetContent>
   </ShadCnSheet>

  )
}

export default Sheet