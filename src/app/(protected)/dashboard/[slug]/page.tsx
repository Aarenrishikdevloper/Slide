import Chart from '@/components/global/chart'
import DoubleGradientCard from '@/components/global/doubleGradientCard'
import Metrics from '@/components/metrics_card'
import { DASHBOARD_CARDS } from '@/constants/dashboard'
import { BarDuoToneBlue } from '@/icons'
import React from 'react'

const Page = () => {
  return (
    <div className='flex flex-col gap-y-10 mt-5'>
      <div className="flex gap-5 lg:flex-row flex-col">
        {DASHBOARD_CARDS.map((card)=>(
          <DoubleGradientCard key={card.id} {...card}/>
        ))}
      </div>
      <div className="border-[1px] relative border-in-active/50 p-5 rounded-xl">
        <span className='flex gap-x-1 z-50 items-center'>
            <BarDuoToneBlue/> 
            <div className=" z-50">
              <h2 className='text-2xl font-medium text-white'> 
                Automated Activity

              </h2> 
              <p className='text-text-secondary text-sm'> 
                Automated 0 out of 1 interaction

              </p>
            </div>
        </span> 
        <div className="w-full flex lg:flex-row flex-col gap-5">
          <div className="lg:w-6/12"> 
           <Chart/>
          </div>
          <div className="lg:w-6/12">
          <Metrics/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page