import { Button } from '@/components/ui/button'
import { useSubscription } from '@/hooks/use-subscription'
import { CreditCardIcon } from 'lucide-react'
import React from 'react'
import Loader from '../loader'

const PaymentButton = () => {
    const {processing, onSubscribe} = useSubscription()
    return (
        <Button disabled={processing} onClick={onSubscribe} className=' bg-gradient-to-br text-white rounded-full from-[#6d60a3] via-[#9434E6] font-bold to-[#CC3BD4]'>
            <Loader state={processing}>
            <CreditCardIcon/>
            Upgrade
            </Loader>
        </Button>
    )
}

export default PaymentButton