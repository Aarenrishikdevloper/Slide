import { getAllAutomations, getAutomationInfo, getProfilePosts } from "@/action/automations"
import { onUserInfo } from "@/action/user"
import { useQuery } from "@tanstack/react-query"

export const useQueryAutomations = () => {
    return useQuery({
      queryKey: ['user-automations'],
      queryFn: getAllAutomations,
    })
  } 

  export const useQueryAutomation =(id:string)=>{
    return useQuery({
       queryKey:['automation-info'], 
       queryFn:()=>getAutomationInfo(id)
    })
  }  

  export const useQueryUser = ()=>{
    return useQuery({
      queryKey:['user-profile'], 
      queryFn:onUserInfo
    })
  }  
  export const useQueryAutomationPosts=()=>{
    const fetchposts = async()=>await getProfilePosts()
    return useQuery({
      queryFn:fetchposts, 
      queryKey:['instagram-media']
    })
  }