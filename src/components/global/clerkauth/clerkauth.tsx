import { ClerkLoading, SignedIn, SignedOut, SignIn, SignInButton, UserButton } from '@clerk/nextjs'
import React from 'react'

import { User } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ClerkAuth = () => {
  return (
    <>
      <ClerkLoading>
        loading....
      </ClerkLoading>
      <SignedOut>
        <SignInButton>
          <Button className='rounded-xl bg-[#252525] text-white hover:bg-[#252525]/70'>
            <User />
            Login
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton>
          <UserButton.UserProfileLink
            label="Dashboard"
            url='/dashboard'
            labelIcon={<User size={16} />}

          />
        </UserButton>
      </SignedIn>

    </>

  )
}

export default ClerkAuth