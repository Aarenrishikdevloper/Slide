import { createAutomation, deleteKeyword, saveKeyWord, saveListner, savePosts, saveTrigger, updateAutomation } from "@/action/automations"
import { useMutationData } from "./use-mutation"
import React, { useEffect, useRef, useState } from "react"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"
import { TRIGGER } from "@/redux/slices/automation"
import {z} from 'zod'
import { useForm } from "react-hook-form"
import useZodForm from "./use-zod-schema"
export const useCreateAutomation=(id?:string)=>{
    const {isPending, mutate}=useMutationData(
        ['createAutomation'], 
        ()=>createAutomation(id),
        'user-automations'
    )  
    return {isPending, mutate}
} 

export const useEditAutomation = (automationId:string)=>{
    const [edit, setEdit] = useState(false); 
    const inputRef =useRef<HTMLInputElement | null>(null)  
    const enableEdit = ()=>setEdit(true)  
    const disableEdit = ()=>setEdit(false)  
    const {isPending, mutate} = useMutationData(
        ['update-automation'], 
        (data:{name:string})=>updateAutomation(
            automationId,  
            {name:data.name}  
        ),
        'automation-info' ,
        disableEdit,
    )  
    useEffect(()=>{
        function handleClickOutside(this:Document, event:MouseEvent){
            if(inputRef.current && !inputRef.current.contains(event.target as Node | null)){
                 if(inputRef.current.value !== ''){
                    mutate({name:inputRef.current.value})  
                 }else{
                    disableEdit()
                 }
            }
        }
        document.addEventListener('mousedown', handleClickOutside)  
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside)
        }
    },[])  
    return{
        edit, 
        enableEdit, 
        disableEdit, 
        inputRef, 
        isPending,
    }
} 
export  const useTriggers =(id:string) => {
    const types =  useAppSelector((state)=>state.AutomationReducer.trigger?.types)   
    const dispatch:AppDispatch = useDispatch()   
    const onSetTrigger =(type:'COMMENT' |"DM")=>dispatch(TRIGGER({trigger:{type}}))   
    const{isPending, mutate } = useMutationData(
        ['add-trigger'], 
        (data:{types:string[]})=>saveTrigger(id, data.types),  
        'automation-info'
    )  
    const onSaveTrigger = ()=>mutate({types})   
    return {types,onSetTrigger, onSaveTrigger, isPending}
}  

export const useKeywords =(id:string)=>{
    const [keyword, setkeyword] = useState('') 
    const onValueChange =(e:React.ChangeEvent<HTMLInputElement>)=>setkeyword(e.target.value)  
    const {mutate} = useMutationData(
        ['add-keyword'], 
        (data:{keyword:string})=>saveKeyWord(id,data.keyword),
        'automation-info',   
        ()=>setkeyword('')  

    ) 
    const onKeyPressed=(e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter'){
            console.log(keyword)
            mutate({keyword})   
            setkeyword('')  
        }
    }   
    const {mutate:deleteMutation}= useMutationData(
        ['delete-keyword'],  
        (data:{id:string})=>deleteKeyword(data.id), 
        'automation-info'

    )
    return{keyword, onValueChange,mutate, onKeyPressed, deleteMutation,setkeyword}
} 
export const useDeleteKeyword=()=>{
    const{mutate:deleteMutation,isPending}=useMutationData(
        ['delete-keyword'],  
        (data:{id:string})=>deleteKeyword(data.id),
        'automation-info'
    ) 
    return{deleteMutation,isPending}
}

export const useListner=(id:string)=>{
    const [listener, setlistner] = useState<"MESSAGE"|"SMARTAI"|null>(null); 
    const promptschema = z.object({
        prompt:z.string().min(1),  
        reply:z.string()

    })   
    const{isPending, mutate} = useMutationData( 
       ['create-listener'], 
       (data:{prompt:string, reply:string})=>saveListner(id, listener || "MESSAGE", data.prompt, data.reply), 
       'automation-info'

       
    ) 
    const {errors, register, onFormSubmit, reset, watch} = useZodForm(
        promptschema, 
        mutate
    )  
    const onSetListener =(type:'MESSAGE' |"SMARTAI")=>setlistner(type) 
    return {
        onSetListener,register,onFormSubmit,listener, isPending
    }
}   
export const useAutomationPosts =(id:string)=>{
    const [posts,setPosts] =useState<{
        postid:string, 
        caption?:string, 
        media:string,
        mediaType:"IMAGE"|"VIDEO"|"CAROSEL_ALBUM" 
    }[]>([])   
    const onSelectPost =(post:{
        postid:string, 
        caption?:string, 
        media:string,
        mediaType:"IMAGE"|"VIDEO"|"CAROSEL_ALBUM" 
    })=>{
       
         setPosts((previtems)=>{
            if(previtems.find((p)=>p.postid === post.postid)){
                return previtems.filter((item)=>item.postid !== post.postid) 
            }else{
                return [...previtems, post]
            }
         })   
        
    } 

    const{mutate, isPending} = useMutationData(
        ['attach-posts'], 
      
        ()=>savePosts(id, posts 
            
        ), 
        'automation-info',
        ()=>setPosts([])
     ) 
     return{posts, mutate, isPending, onSelectPost}
}


