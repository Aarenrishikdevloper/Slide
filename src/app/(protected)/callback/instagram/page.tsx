import { onIntegrate } from '@/action/integration'
import { redirect } from 'next/navigation'

import React from 'react'

type Props = {
    searchParams:{
        code:string
    }
}

const page = async({searchParams:{code}}: Props) => {
  if(code){
    console.log(code); 
    const user = await onIntegrate(code.split('#_')[0]); 
    if(user?.status === 200){
        redirect(`/dashboard/${user.data?.firstname}${user.data?.lastname}/integrations`)
    }
  } 
  return redirect('/sign-up')
}

export default page