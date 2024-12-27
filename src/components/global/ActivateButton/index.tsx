'use client';
import { activateAutomation } from '@/action/automations';
import { Button } from '@/components/ui/button'
import { useQueryAutomation } from '@/hooks/ueequery';
import { useMutationData } from '@/hooks/use-mutation';
import { ActiveAutomation } from '@/icons/active-automation'
import React from 'react'
import Loader from '../loader';
type props = {
    id: string
}
const ActivateButton = ({id}:props) => {
  const {data} = useQueryAutomation(id);   
  const {mutate, isPending} = useMutationData(
    ['active'], 
    (data:{state:boolean})=>activateAutomation(id, data.state), 
    'automation-info'
  )

  return (
    <Button onClick={()=>mutate({state:!data?.data?.active})} className='lg:px-10 bg-gradient-to-br hover:opacity-80 text-white  rounded-full from-[#3352CC] font-medium to-[#1C2D70] ml-4'>  
      <Loader state={isPending}>
      <ActiveAutomation/>  
      <p className='lg:inline hidden'>
         {data?.data?.active? "Disable":"Activate"}
      </p>
      </Loader>
        
    </Button>
  )
}

export default ActivateButton