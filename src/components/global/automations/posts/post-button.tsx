import React from 'react'
import TriggerButton from '../trigger-button'
import { useQueryAutomationPosts } from '@/hooks/ueequery'
import { Return } from '@prisma/client/runtime/library'
import { InstagramPostProps } from '@/types/types'
import { CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'
import { useAutomationPosts } from '@/hooks/use-automation'
const PostButton = ({id}:{id:string}) => {
  const {data} = useQueryAutomationPosts()
  const{posts, mutate, isPending,onSelectPost} = useAutomationPosts(id)
  return ( 
     <TriggerButton label='Attach a post'>
         {data?.status === 200 ?(
            <div className=" flex flex-col gap-y-3 w-full"> 
            <div className="flex flex-wrap w-full gap-3">
              {data.data.data.map((post:InstagramPostProps)=>(
                <div className=" relative w-4/12 aspect-square rounded-lg cursor-pointer overflow-hidden" key={post.id}  
                onClick={()=>onSelectPost(
                  {
                    postid:post.id, 
                    media:post.media_url, 
                    mediaType:post.media_type, 
                    caption:post.caption
                  }
                )}
                > 
                {posts.find((p)=>p.postid === post.id)&&(
                   <CheckCircle fill='white' stroke="black" className=' absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'/>
                )}
                  
                 <Image fill sizes='100vw' src={post.media_url} className={cn('hover:opacity-75 transition duration-100',posts.find((p)=>p.postid === post.id)&& 'opacity-80')} alt='instagram_image'/>    

                   
                </div>
              ))}
            </div>  
            <Button className='bg-gradient-to-br text-white w-full from-[#3352CC] font-medium to-[#1C2D70]' onClick={mutate} disabled={posts.length === 0}> 
              <Loader state={isPending}>Attach Posts</Loader>
            </Button>

            </div>
         ):(
          <p className='text-text-secondary text-center'>No posts found!</p>
         )}
     </TriggerButton>
  )
}

export default PostButton