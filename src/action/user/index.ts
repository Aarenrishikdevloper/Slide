'use server'
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { createuser, finduser, updateSubscription } from "./queries"
import { refreshToken } from "@/lib/fetch"
import { updateIntegration } from "../integration/queris"
import { stripe } from "@/lib/stripe"

  

export const onCurrentUser = async()=>{
    const user = await currentUser()   
    if(!user) return redirect('/sign-in')  
    return user

}  

export const onBoardUser = async()=>{
    const user = await onCurrentUser()   
    try {
    
    const found = await finduser(user.id)   
    if(found){
        if(found.integrations.length > 0){
            const today = new Date() 
            const time_left = found.integrations[0].expiresAt?.getTime()! - today.getTime()  
            const days = Math.round(time_left / (1000*3600*24))   
            if(days < 5){
                console.log("refresh"); 
                // refresh integration token  hrer  
                const refresh = await refreshToken(found.integrations[0].token);    
                const today = new Date()  
                const expiry_date = today.setDate(today.getDate());  
                const update_token= await updateIntegration(
                    refresh.access_token, 
                    new Date(expiry_date),
                    found.integrations[0].id
                )
                if(!update_token){
                   console.log("Something went wrong")
                }
            }
        }  
         return {
            status:200, 
            data:{
                firstname:found.firstname,
                lastname:found.lastname
            }
         }   
        
        }  
        const created = await createuser(
            user.id, 
            user.firstName!, 
            user.lastName!, 
            user.emailAddresses[0].emailAddress
         )
         return {
            status:200, 
            data:created
         }  
    } catch (error) {
        console.log(error)   
        return{status:500}
    }
}  

export const onUserInfo = async()=>{ 
   try {
    const user = await onCurrentUser(); 
    const profile = await finduser(user.id); 
    if(profile) return{status:200, data:profile}  
    return {status:404}  

    
   } catch (error) {
      return{status:500}
   }

}  

export const OnSubscribe = async(session_id:string)=>{  
    const user  = await onCurrentUser(); 
    try {
         const session = await stripe.checkout.sessions.retrieve(session_id);   
         const subscribe = await updateSubscription(user.id,{
            customerId:session.customer as string, 
            plan:"PRO"
         }) 
         if(subscribe) return{status:200} 
         return {status:401}
         
    } catch (error) {
       return {status:500}
    }
    
   }