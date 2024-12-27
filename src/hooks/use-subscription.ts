import axios from "axios";
import { useState } from "react"
import { useMutationData } from "./use-mutation";

export const useSubscription =()=>{
    const [processing, setprocessing] =useState(false); 
    const onSubscribe = async()=>{
        setprocessing(true); 
        const res = await axios.get('/api/payment')  
        if(res.data.status === 200){
            return(window.location.href =`${res.data.session_url}`)
        } 
        setprocessing(false);
    }  
    return{onSubscribe, processing}
} 

