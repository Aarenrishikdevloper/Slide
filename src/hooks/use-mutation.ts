import {MutationFunction, MutationKey, useMutation, useMutationState, useQueryClient} from '@tanstack/react-query'
import { toast } from './use-toast'
import { useRouter } from 'next/navigation'
 

export const useMutationData =(
    mutationKey:MutationKey,  
    mutationFn:MutationFunction<any,any>, 
    queryKey?:string, 
    onSucess?:()=>void,
    
)=>{
    const client = useQueryClient()
    const {mutate, isPending}= useMutation({
        mutationKey, 
        mutationFn, 
        onSuccess:(data)=>{
            if(onSucess) onSucess()  
             return toast(data.status ===200 ?"Sucess":"Error", { 
              description:data.data
            })
        }, 
        onSettled:async()=>{  
            await client.invalidateQueries({queryKey:[queryKey]})
            
        },
    })  
    
    return {mutate, isPending}
}  

export const useMutationDataState = (mutationKey:MutationKey)=>{
    const data = useMutationState({
        filters:{mutationKey}, 
        select:(mutation)=>{
            return{
                variables:mutation.state.variables as any,  
                status:mutation.state.status
            }
        }
    })  
    const latestVariable = data[data.length -1]  
    return {latestVariable}
}