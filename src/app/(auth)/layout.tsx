import React from 'react'
type props ={
    children:React.ReactNode
}
const Layout = ({children}:props) => {
  return (
    <div className='h-screen  flex items-center justify-center'>{children}</div>
  )
}

export default Layout 