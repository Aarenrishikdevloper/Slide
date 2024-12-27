'use client';
import { Button } from '@/components/ui/button'

import { AutomationDuoToneWhite } from '@/icons'
import React, { useMemo } from 'react'
import { v4 } from 'uuid';
import Loader from '../loader';
import { usecreateAutomation } from '@/hooks/use-automation';
import { useRouter } from 'next/navigation';

const CreateAutomation = () => {
  const mutationId = v4()
  const{mutate, isPending} = usecreateAutomation(mutationId)   
  const router = useRouter()
  const create=()=>{
     mutate({
      name:"Untitled",
      id:mutationId, 
      createdAt:new Date(), 
      keywords:[]
     }) 
     router.refresh();
  }
  return (
    <Button className='lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] to-[#1C2D70]' onClick={()=>create()
      
      
    }>  
       <Loader state={isPending}>
       <AutomationDuoToneWhite/> 
       <p className='lg:inline hidden'>Create an Automation</p> 
       </Loader>

    </Button>
  )
}

export default CreateAutomation