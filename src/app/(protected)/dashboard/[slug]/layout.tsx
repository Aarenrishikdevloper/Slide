import Infobar from '@/components/global/infobar'
import Sidebar from '@/components/global/sidebar'
import { PrefetchUserAutnomations, PrefetchUserProfile } from '@/react-query/prefetch'

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'
type props = {
  children: React.ReactNode,
  params: { slug: string }
}

const Layout = async({ children, params }: props) => {
  const query = new QueryClient() 
  
await PrefetchUserProfile(query)  
 await PrefetchUserAutnomations(query)
 
  return (
    <HydrationBoundary state={dehydrate(query)}>
    <div className='p-3'>
      <Sidebar slug={params.slug} />
      
        
        <div className="lg:ml-[250px] lg:pl-10 lg:py-5 flex flex-col overflow-auto">
         <Infobar slug={params.slug}/>
        {children}   
        </div>
       
        
      </div>

    </HydrationBoundary>
  )
}

export default Layout