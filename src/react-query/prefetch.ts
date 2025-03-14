import { getAllAutomations, getAutomationInfo} from '@/action/automations'
import { onUserInfo } from '@/action/user'
import { QueryClient, QueryFunction } from '@tanstack/react-query'

const prefetch = async (
  client: QueryClient,
  action: QueryFunction,
  key: string
) => {
  return await client.prefetchQuery({
    queryKey: [key],
    queryFn: action,
    staleTime: 60000,
  })
}

export const PrefetchUserProfile = async (client: QueryClient) => {
  return await prefetch(client, onUserInfo, 'user-profile')
}

export const PrefetchUserAutnomations = async (client: QueryClient) => {
  return await prefetch(client, getAllAutomations, 'user-automations')
}
export const PrefetchUserAutnomation = async (client: QueryClient,automationId:string) => {  
  return await prefetch(client, ()=>getAutomationInfo(automationId), 'automation-info')


}
