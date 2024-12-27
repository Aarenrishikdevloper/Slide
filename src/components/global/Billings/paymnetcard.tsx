
import { Button } from '@/components/ui/button'
import { PLANS } from '@/constants/pages'

import { cn } from '@/lib/utils'
import { CircleCheck } from 'lucide-react'
import React from 'react'
import Loader from '../loader';
type props ={
    label : string  
    currrent:"PRO" | "FREE"
    landing?:boolean  
    customerId?:string
}
const PaymentCard = ({label,currrent,landing,customerId}:props) => { 
   
    console.log(customerId);
    
  return (
    <div className={cn(label !== currrent ?"bg-in-active":"bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ", 'p-[2px] rounded-xl overflow-hidden')}>
        <div className={cn(landing && 'radial--gradient-pink', 'flex flex-col rounded-xl pl-5 py-5 pr-10 bg-background-90 h-full')}>
            {landing ?(
                <h2 className='text-2xl'>  
                  {label === "PRO" && "Premium Plan"}  
                  {label === "FREE" && "Standard"}   


                </h2>
            ):(
                <h2 className='text-2xl'> 
                  {label === currrent ?"Your Current Plan":currrent === "PRO"?"Downgrade":"Upgrade"}

                </h2>
            )}  
            <p className='text-text-secoundary text-sm mb-2'>This is what your plan covers for automationand Ai Features</p>  
            {label === "PRO"?(
                <span className='bg-gradient-to-r text-3xl from-indigo-500 via-purple-500 font-bold to-pink-500 bg-clip-text text-transparent'>
                    Smart AI
                </span>
            ):(
                <p className='font-bold mt-2 text-text-secondary'>
                   Standard
                </p>
            )}   
            {label === "PRO"?(
                <p className='mb-2'> 
                <b className='text-xl'> 
                    $99

                </b>/month

                </p>
            ):(
                <p className='text-xl mb-2'>
                    Free
                </p>
            )}  
            {PLANS[label === "PRO"?1:0].features.map((i)=>(
                <p key={i} className='mt-2 text-muted-foreground flex gap-2'>  
                   <CircleCheck className='text-indigo-500'/>
                    {i}
                </p>
            ))}  
            {landing?(
                <Button className={cn('rounded-full mt-5', label==="PRO"?"bg-gradient-to-r from-indigo-500 text-white via-purple-500 to-pink-500":"bg-background-80 text-white hover:text-background-80")}>  
                  {label === currrent ?"Get Started":currrent === "PRO"?"Free":"Get Started"}
                     
                </Button>
            ):(
                <Button  className={'rounded-full mt-5 bg-background-80 text-white hover:text-background-80'}>  
                 
                 
                 {label === currrent ?"Active":currrent === "PRO"?"Downgrade":"Upgrade"}
                 
                  
                   
              </Button>
            )}
        </div>

    </div>
  )
}

export default PaymentCard