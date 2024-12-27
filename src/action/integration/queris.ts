'use sever'
import { client } from "@/lib/prisma"

 
export const updateIntegration = async (token:string, expiry:Date, id:string) => {  
    return await client.integrations.update({
        where: { id },
        data: { token, expiresAt:expiry},
    })

} 

export const getIntegration = async(clerkId:string)=>{
    return await client.user.findUnique({
        where:{
            clerkId:clerkId
        }, 
        select:{
            integrations:{
                where:{
                    name:'INSTAGRAM'
                }
            }
        }
    })
} 
export const createIntegration = async(clerkId:string, token:string,expiry:Date,igId?:string)=>{
    return await client.user.update({
        where:{
            clerkId:clerkId
        }, 
        data:{
            integrations:{
                create:{
                    token, 
                    expiresAt:expiry, 
                    instagramId:igId
                }
            }
        }, 
        select:{
            firstname:true, 
            lastname:true,
        }
    })
}