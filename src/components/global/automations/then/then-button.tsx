"use client"
import React from 'react'
import TriggerButton from '../trigger-button'
import { AUTOMATION_LISTENERS } from '@/constants/automation'
import Subcription from '../../subscription'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'
import { useListner } from '@/hooks/use-automation'

const ThenButton = ({id}:{id:string}) => { 
  const{onSetListener, onFormSubmit,register, isPending, listener:Listner} = useListner(id); 
  return ( 
    <TriggerButton label='Then'>
        <div className="flex flex-col gap-y-2">
         {AUTOMATION_LISTENERS.map((listner)=>listner.type === "SMARTAI"?(
             <Subcription key={listner.type} type={'PRO'}>  
             <div onClick={()=>onSetListener(listner.type)} className={cn('p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100', Listner === listner.type ? "bg-gradient-to-br from-[#3352CC] to-[#1C2D70]":'bg-background-80')}>
               <div className="flex gap-x-2 items-center">
                 {listner.icon}  
                 <p>{listner.label}</p>
               </div> 
               <p>{listner.description}</p>
             </div>
   
             </Subcription>
         ):(
           
          <div onClick={()=>onSetListener(listner.type)} className={cn('p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100',Listner === listner.type ? "bg-gradient-to-br from-[#3352CC] to-[#1C2D70]":'bg-background-80')}>
          <div className="flex gap-x-2 items-center">
            {listner.icon}  
            <p>{listner.label}</p>
          </div> 
          <p>{listner.description}</p>
        </div>
         ))}
         <form className='flex flex-col gap-y-2' onSubmit={onFormSubmit}>
           <Textarea  
             placeholder={
              Listner === "SMARTAI"?"Add a prompt that your smart ai can use": "Add a message you want sent to your customer"  

             }  
             {...register('prompt')}
             className=' bg-background-80 outline-none border-none ring-0 focus:ring-0'
           />
           <Input   
           placeholder='Add a reply for comments (Optional)' 
           className=' bg-background-80 outline-none  border-none ring-0 focus:ring-0'  
           {...register('reply')}
           /> 
           <Button className='bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70] '>
            <Loader state={isPending}>
              Add listner
            </Loader>
           </Button>
         </form>
        </div>
    </TriggerButton>
  )
}

export default ThenButton