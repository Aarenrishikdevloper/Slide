'use client'
import { ChevronRight, PencilIcon } from 'lucide-react'
import React from 'react'
import ActivateButton from '../../ActivateButton'
import { useQueryAutomation } from '@/hooks/ueequery'
import { useEditAutomation } from '@/hooks/use-automation'
import { useMutationDataState } from '@/hooks/use-mutation'
import { Input } from '@/components/ui/input'
type props ={
    id:string
}
const AutomationBreadcrumbs = ({id}:props) => {
    const{data} = useQueryAutomation(id)  
    const {edit, enableEdit, isPending, disableEdit,inputRef} = useEditAutomation(id)  
    const {latestVariable} = useMutationDataState(['update-automation'])  
  return (
    <div className='rounded-full w-full p-5 bg-[#18181B1A] flex items-center'>
        <div className="flex items-center gap-x-2 min-w-0">
            <p className='text-[#9B9CA0] truncate'>Automations</p>  
            <ChevronRight className='flex-shrink-0 ' color='#989CA0'/>   
            <span className='flex gap-x-3 items-center min-w-0'>  
               {edit ?(
                  <Input ref={inputRef} placeholder={
                    isPending?latestVariable.variables:"Add a new name" 
                    
                  }
                  className=' bg-transparent h-auto outline-none text-base border-none p-0'
                  />
               ):(
                <p className='text-[#9B9CA0] truncate'>
                {latestVariable?.variables ? latestVariable.variables.name :data?.data?.name}
                </p>
               )}
                {edit ?(
                    <></>
                ):(
                    <span className=' cursor-pointer hover:opacity-75 duration-100 transition flex-shrink-0 mr-4' onClick={enableEdit}> 
                    <PencilIcon size={14}/>

                </span>
                )}

            </span>
        </div>
        <div className="flex items-center gap-x-5 ml-auto">
            <p className='hidden md:block text-text-secondary/60 text-sm truncate min-w-0'>
              All states are automatically saved
            </p>
            <div className="flex gap-x-5 flex-shrink-0">
                <p className='text-text-secoundary text-sm truncate min-w-0'>Changes Saved</p>
            </div>
        </div>
        <ActivateButton id={id}/>
    </div>
  )
}

export default AutomationBreadcrumbs