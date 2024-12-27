'use client'
import React from 'react'
import PaymentCard from './paymnetcard'
import { useQueryUser } from '@/hooks/ueequery'

const Billings = () => {
  const{data} = useQueryUser()
  return (
    <div className='flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container mt-6'>
       <PaymentCard currrent={data?.data?.subscription?.plan!} label='PRO' customerId={data?.data?.subscription?.customerId!}/>
       <PaymentCard currrent={data?.data?.subscription?.plan!} label='FREE'/>
    </div>
  )
}

export default Billings