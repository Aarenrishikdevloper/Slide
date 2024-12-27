'use client';
import { onAuthInstagram } from '@/action/integration'
import { onUserInfo } from '@/action/user'
import { Button } from '@/components/ui/button'
import { useQueryUser } from '@/hooks/ueequery';

import React from 'react'

type Props = {
    title: string 
    description: string 
    icon: React.ReactNode 
    strategy:"INSTAGRAM" | "CRM"
}

const Integrationcard = ({title, description,icon,strategy}: Props) => {
  const onInstaOauth =()=>onAuthInstagram(strategy)  
  
 const{data} = useQueryUser()
  const integrated = data?.data?.integrations.find((integration)=>integration.name === strategy)
  return (
    <div className=' mt-5 border-2 border-[#3352CC] rounded-2xl gap-x-5 p-5 flex items-center justify-between'>
         {icon}  
         <div className="flex flex-col flex-1">
            <h3 className='text-xl'>
                {title}
            </h3>  
            <p className='text-[#9d9D9D] text-base'>{description}</p>
           
         </div> 
         <Button onClick={onInstaOauth} disabled={integrated?.name === strategy} className=' bg-gradient-to-br text-white rounded-full text-lg from-[#3352CC]  to-[#1C2D70] font-medium hover:opacity-70 transition duration-100'>
                {integrated ?  "Connected":'Connect'}
            </Button>
    </div>
  )
} 
export default Integrationcard