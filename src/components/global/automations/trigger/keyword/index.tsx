'use client';
import { Input } from '@/components/ui/input'
import { useQueryAutomation } from '@/hooks/ueequery'
import { useDeleteKeyword, useKeywords } from '@/hooks/use-automation'
import { useMutationDataState } from '@/hooks/use-mutation'
import { X } from 'lucide-react'



type Props = {
    id:string
}

const Keyword = ({id}: Props) => {
   const {onValueChange, keyword,mutate, setkeyword} = useKeywords(id);   
   const{latestVariable} = useMutationDataState(['add-keyword'])    
   const{data} =useQueryAutomation(id); 
  const{deleteMutation} =useDeleteKeyword()
    const onKeyPressed=(e:React.KeyboardEvent<HTMLInputElement>)=>{
        
           if(e.key === 'Enter'){
               console.log(keyword)
               mutate({keyword})     
               setkeyword("")
                 
           }
       }   
    
  return (
    <div className=' bg-background-80 flex flex-col  gap-y-3 p-3 rounded-xl'>
      <p className='text-sm text-text-secondary'>
        Add words that trigger automations
      </p>  
        <div className="flex flex-wrap gap-2 justify-start items-center">
        {data?.data?.keywords &&
          data.data.keywords.map((word) => (
            <div
              key={word.id}
              className="bg-background-90 flex items-center gap-y-2 gap-x-1 capitalize text-text-secondary py-1 px-4 rounded-full"
            >
              <p>{word.word}</p>
              <div className=' cursor-pointer' onClick={()=>deleteMutation({id:word.id})}>
                <X size={16}/>
              </div>
            </div>
          ))}

        {latestVariable && latestVariable.status === 'pending' && (
          <div className="bg-background-90 flex items-center gap-y-2 gap-x-1 capitalize text-text-secondary py-1 px-4 rounded-full">
            <p>{latestVariable.variables.keyword}</p>
            <div  onClick={()=>deleteMutation({id:latestVariable.variables.id})}>
              <X className='cursor-pointer' size={18}/>
            </div>
          </div>
        )}
            
          
          
 
            <Input  
               placeholder='Add Keyword'  
               className='p-0 bg-transparent ring-0 border-none outline-none'  
               value={keyword}  
               onChange={onValueChange}  
               onKeyPress={onKeyPressed}
            /> 
        </div> 
    </div> 
  )
}
 
export default Keyword