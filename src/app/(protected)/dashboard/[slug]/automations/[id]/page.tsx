import { getAutomationInfo } from '@/action/automations'
import AutomationBreadcrumbs from '@/components/global/breadcrumb/automations'
import Trigger from '@/components/global/automations/trigger'
import { SheetTrigger } from '@/components/ui/sheet'
import { Warning } from '@/icons'
import { PrefetchUserAutnomation } from '@/react-query/prefetch'
import { dehydrate, HydrationBoundary, QueryClient, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import ThenNode from '@/components/global/automations/then/node'
import PostNode from '@/components/global/automations/posts/node'
type props ={
  
  params: { id: string }
}
export async function generateMetadata({params}:{params:{id:string}}){
  const info = await getAutomationInfo(params.id)    
  return{
     title:info.data?.name
  }
}
const page = async({params}:props) => {
  const query = new QueryClient()  
   await PrefetchUserAutnomation(query, params.id);
  return (
    <HydrationBoundary state={dehydrate(query)}>
     <div className='flex flex-col items-center gap-y-20'> 
    <AutomationBreadcrumbs id={params.id}/>  
    <div className=" w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">  
    <div className="flex gap-x-2">
      <Warning/> 
      When...
    </div>
    < Trigger id={params.id}/>
    </div> 
    <ThenNode id={params.id}/>  
    <PostNode id={params.id}/>

    </div> 
    </HydrationBoundary>
  )
}

export default page