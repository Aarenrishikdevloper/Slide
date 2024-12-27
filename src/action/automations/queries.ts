'use server '
import { client } from "@/lib/prisma"

 
export const createAutomations = async(clerKId:string, id?:string)=>{
    return await client.user.update({
        where:{
            clerkId:clerKId
        }, 
        data:{
            automations:{
                create:{
                    ...(id && {id})
                }
            }
        }
    })
}  
export const getAutomations = async(clerkId:string)=>{
    return await client.user.findUnique({
        where:{
            clerkId:clerkId
        }, 
        select:{
            automations:{
                orderBy:{
                    createdAt:'asc'
                }, 
                include:{
                    keywords:true, 
                    listener:true
                }
                
            }
        }
    })
}  

export const findAutomation  = async(id:string)=>{
    return await client.automation.findUnique({
        where:{
            id:id
        }, 
        include:{
            keywords:true, 
            trigger:true, 
            posts:true, 
            listener:true, 
            User:{
                select:{
                    subscription:true,   
                    integrations:true,
                }
            }
        }
    })
} 
export const update = async(id:string, updates:{
    name?:string, 
    active?:boolean
}

)=>{
    return await client.automation.update({
        where:{
            id:id,
        }, 
        data:{
            name:updates.name, 
            active:updates.active,
        }
    })
} 
export const createTrigger = async(automationId:string, trigger:string[])=>{
    if(trigger.length === 2){
        return await client.automation.update({
            where:{
                id:automationId
            }, 
            data:{
                trigger:{
                    createMany:{
                        data:[{type:trigger[0]},{type:trigger[1]}],
                    }
                }
            }
        })
    } 
    return await client.automation.update({
        where:{
            id:automationId
        }, 
        data:{
            trigger:{
                create:{
                    type:trigger[0]
                }
            }
        }
    })
}   
export const createKeyword=async(automationId:string, keyword:string)=>{
    return await client.automation.update({
        where:{
            id:automationId
        }, 
        data:{
            keywords:{
                create:{
                    word:keyword
                }
            }
        }
    })
} 
export const deletekeyword = async(id:string)=>{
    return await  client.keyword.delete({
        where:{
            id:id,
        }
    })
} 

export const createListener = async(automationId:string, listener:"SMARTAI"|"MESSAGE", prompt:string, reply?:string)=>{
    return await client.automation.update({
        where:{
            id:automationId,
        }, 
        data:{
            listener:{
                create:{
                    listener:listener,
                    prompt, 
                    commentReply:reply,

                }
            }
        }
    })
} 
export const addPost = async(
    automationId:string, 
    posts:{
        postid:string, 
        caption?:string, 
        media:string, 
        mediaType:"IMAGE"|"VIDEO"|"CAROSEL_ALBUM" 
      }[]
)=>{
    return await client.automation.update({
        where:{
            id:automationId
        }, 
        data:{
            posts:{
                createMany:{
                    data:posts
                }
            }
        }
    })
}