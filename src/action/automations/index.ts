'use server'

import { onCurrentUser } from "../user"
import { finduser } from "../user/queries";
import { addPost, createAutomations, createKeyword, createListener, createTrigger, deletekeyword, findAutomation, getAutomations, update } from "./queries";

export const getAllAutomations = async () => {
    const user = await onCurrentUser()
    try {
      const automations = await getAutomations(user.id)
      if (automations) return { status: 200, data: automations.automations }
      return { status: 404, data: [] }
    } catch (error) {
      return { status: 500, data: [] }
    }
  }
export const createAutomation = async(id?:string)=>{
    const user = await onCurrentUser(); 

//try{
       const create = await createAutomations(user.id, id); 
       if(create) return {status:200, data:"Automation created", res:create} 
         return {status:404, data:"Oops! something went Wrong!"};  
    //} catch (error) {
//return {status:500, data:"Internal Server Error"}; 
        
    //}

}  

export const getAutomationInfo = async(id:string)=>{
  await onCurrentUser(); 
  try {
      const automation = await findAutomation(id); 
      if(automation) return{status:200, data:automation} 
      return {status:404,}
  } catch (error) {
     return {status:500}
  }
}  

export const updateAutomation = async(id:string, data:{
  name?:string,  
  active?:boolean  
  automation?:string
})=>{
  await onCurrentUser(); 
  try {
      const updates = await update(id, data); 
      if(updates) return {status:200, data:"Automation updated", res:updates} 
         return {status:404, data:"Oops! something went Wrong!"};  
    //
  } catch (error) {
     return {status:500,data:"Oops! something went Wrong!"}   
  }
}  

export const saveTrigger = async(automationId:string, 
  trigger:string[]
)=>{
  await onCurrentUser(); 
  try {  
    const create = await createTrigger(automationId, trigger); 
    if(create) return {status:200, data:"Trigger created", res:create}
      
         return {status:404, data:"Oops! something went Wrong!"};  
    
  } catch (error) {
     return {status:500,data:"Oops! something went Wrong!"}   
  }
}  
export const saveKeyWord =async(automationId:string,keyword:string)=>{
  await onCurrentUser(); 
  try {
     const create = await createKeyword(automationId,keyword);  
     if(create) return {status:200, data:"Keyword created"}  
      return {status:404, data:"Oops! something went Wrong!"};
  } catch (error) {
    return {status:500,data:"Oops! something went Wrong!"} 
  }
}

export const deleteKeyword = async(id:string)=>{
  await onCurrentUser();
  try { 
    console.log(id);
      const deleted = await deletekeyword(id); 
      if(deleted) return {status:200, data:"Keyword deleted"} 
      return{status:404, data:"Oops! something went Wrong!"};
  } catch (error) { 
    console.log(error);
    return {status:500,data:"Oops! something went Wrong!"} 
  }
}

export const saveListner = async(automationId:string, listener:"SMARTAI"|"MESSAGE", prompt:string, reply?:string)=>{
  await onCurrentUser();  
  try {
      const create = await createListener(automationId, listener, prompt, reply);  
      if(create) return {status:200, data:"Listener created"}  
      return {status:404, data:"Oops! something went Wrong!"};
  } catch (error) {
     return {status:500,data:"Oops! something went Wrong!"}
  }

}  

export const activateAutomation = async(id:string,state:boolean)=>{
   await onCurrentUser();   
   try {  
    const update = await updateAutomation(id, {active:state});  
    if(update) return {status:200, data:`Automation ${state? 'activated':'disabled'}`}; 
    return {status:404, data:"Automation not found"}; 

    
   } catch (error) {
    return {status:500,data:"Internal Server Error"};
   }
} 

export const getProfilePosts = async()=>{
  const user = await onCurrentUser(); 
  try {
    const profile = await finduser(user.id); 
    const posts = await fetch(`${process.env.INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_url,media_type,timestamp&limit=10&access_token=${profile?.integrations[0].token}`) 
    const parsed = await posts.json() 
    if(parsed) return {status:200, data:parsed} 
    return {status:404}   
  } catch (error) {
     return {status:500}
    
  }
} 
export const savePosts = async(automationId:string, posts:{
  postid:string, 
  caption?:string, 
  media:string, 
  mediaType:"IMAGE"|"VIDEO"|"CAROSEL_ALBUM" 
}[])=>{
   await onCurrentUser() 
   try {
      const create = await addPost(automationId, posts);  
      if(create) return {status:200, data:"Posts saved"}  
      return {status:404, data:"Oops! something went Wrong!"};
   } catch (error) {
    console.log(error)
     return {status:500,data:"Oops! something went Wrong!"}  
   }
}