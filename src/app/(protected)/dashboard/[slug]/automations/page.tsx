import AutomationList from '@/components/global/automation-list'
import CreateAutomation from '@/components/global/createautomation'
import { Check } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-6 gap-5'> 
     <div className="lg:col-span-4">
         <AutomationList/>
        </div>  
       <div className="lg:col-span-2">
       <div className="hidden sm:flex flex-col rounded-lg bg-background-80 gap-y-6 p-5 border-[1px] overflow-hidden border-in-active">
        <div>
            <h2 className='text-xl'>Automations</h2> 
            <p className='text-text-secondary'>Your live Automation will show here</p>
        </div>
        <div className="flex flex-col gap-y-3">
            {[1,2,3].map((item)=>(
                <div className="flex items-start justify-between" key={item}>
                   <div className=" flex flex-col">
                   <h3 className=' font-medium'>Direct Traffic towards website</h3>  
                   <p className=' text-text-secondary text-sm'>December 11th 2024</p>
                   </div>  
                   <Check/>
                </div>
            ))}
        </div>
        <CreateAutomation/>
       </div>
     </div>

    </div>
  )
}

export default page