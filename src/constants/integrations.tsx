import { InstagramDuoToneBlue, SalesForceDuoToneBlue } from "@/icons"

type Props = {
  title: string
  icon: React.ReactNode
  description: string
  strategy: 'INSTAGRAM' | 'CRM'
}

export const INTEGRATION_CARDS: Props[] = [
  {
    title: 'Connect Instagram',
    description:
      'Easily link your Instagram account to streamline your social media managemen',
    icon: <InstagramDuoToneBlue />,
    strategy: 'INSTAGRAM',
  },
  {
    title: 'Connect Salesforce',
    description:
      'Integrate Salesforce to enhance your CRM capabilities and Customer relationship',
    icon: <SalesForceDuoToneBlue />,
    strategy: 'CRM',
  },
];