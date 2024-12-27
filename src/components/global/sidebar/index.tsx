'use client';
import { usePath } from '@/hooks/usepath';
import { LogoSmall } from '@/svgs/logosmall'
import React from 'react'
import Item from './items';
import { Separator } from '@/components/ui/separator';
import { HelpDuoToneWhite } from '@/icons';
import ClerkAuth from '../clerkauth/clerkauth';
import Upgradecard from './Upgradecard';
import Subcription from '../subscription';


type props = {
  slug: string
}
const Sidebar = ({ slug }: props) => {
  const { page } = usePath() 
  
  return (
    <div className='w-[250px] border-[1px] radial fixed left-0 lg:inline-block border-[#545454] bg-gradient-to-b from-[#768BDD] via-[#171717] to-[#768BDD] hidden bottom-0 top-0 m-3 rounded-xl overflow-hidden'>
      <div className=" flex flex-col gap-y-5 w-full h-full p-3 bg-[#0e0e0e] bg-opacity-90 bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-2xl">
        <div className="flex gap-x-2 p-5 items-center justify-center">
          <LogoSmall />
        </div>
        <div className="flex flex-col py-3">
          <Item page={page} slug={slug} />
        </div>
        <div className="px-16">
          < Separator orientation={'horizontal'} className='bg-[#333336]' />
        </div>
        <div className="px-3 flex flex-col gap-y-5">
          <div className="flex gap-x-2">

            <ClerkAuth />
            <p className='text-[#9B9CA0]'>Profile</p>
          </div>

          <div className="flex gap-x-3">
            <HelpDuoToneWhite />
            <p className='text-[#9B9CA0]'>Help</p>
          </div>
        </div>
        <Subcription type={'FREE'}>
        <div className="flex-1 flex flex-col justify-end">
          <Upgradecard />


        </div>  
        </Subcription>
        
        
      </div>
    </div>
  )
}

export default Sidebar