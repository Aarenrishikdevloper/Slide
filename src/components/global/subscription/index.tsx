
import { useQueryUser } from '@/hooks/ueequery'
import React from 'react'

type Props = {
    type:"FREE"| "PRO", 
    children:React.ReactNode
}

const Subcription = ({children, type}: Props) => {
    const {data} = useQueryUser() 
    console.log(data);
  return (
         data?.data?.subscription?.plan === type && children
  )
}  
export default Subcription