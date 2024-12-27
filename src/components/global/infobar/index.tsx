'use client'
import React from 'react'
import Sheet from '../sheet'
import { Menu } from 'lucide-react'
import Upgradecard from '../sidebar/Upgradecard'
import { HelpDuoToneWhite } from '@/icons'
import ClerkAuth from '../clerkauth/clerkauth'
import { Separator } from '@/components/ui/separator'
import Item from '../sidebar/items'
import { usepath } from '@/hooks/usepath'
import { LogoSmall } from '@/svgs/logosmall'
import Search from '../search'
import CreateAutomation from '../createautomation'
import Alert from './notification'
import BreadCrumbs from '../breadcrumb/main_braidcrumb'
import { PAGE_BREAD_CRUMBS } from '@/constants/pages'
type props = {
    slug: string
}

const Infobar = ({ slug }: props) => {
    const { page } = usepath()  
    const currentpage = PAGE_BREAD_CRUMBS.includes(page)|| page === slug
    return (
        currentpage && (
        <div className='flex flex-col'>
            <div className="flex gap-x-3 lg:gap-x-5 justify-end">
                <span className='lg:hidden flex items-center flex-1 gap-x-2'>
                    <Sheet trigger={<Menu />} side={'left'}>
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
                            <div className="flex-1 flex flex-col justify-end">
                                <Upgradecard />


                            </div>
                        </div>

                    </Sheet>

                </span>
                <Search />
                <CreateAutomation />
                <Alert />
            </div>
            <BreadCrumbs slug={slug} page={page === slug ? "Home" : page} />

        </div>
    ) 
)
}

export default Infobar