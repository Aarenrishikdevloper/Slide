import { findAutomation } from '@/action/automations/queries'
import {
  createChatHistory,
  getChatHistory,
  getKeywordAutomation,
  getKeyWordPost,
  matchKeyword,
  trackedResponse,
} from '@/action/webhook/queries'
import { sendDm, sendPrivateMessage } from '@/lib/fetch'
import { HfInference } from "@huggingface/inference";
import { client } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SmartAi } from '@/icons';
const inferrence = new HfInference("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")
const genAI = new GoogleGenerativeAI(process.env.HF_ACESS_TOKEN as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function GET(req: NextRequest) {
  const hub = req.nextUrl.searchParams.get('hub.challenge')
  return new NextResponse(hub)
}

export async function POST(req: NextRequest) {
  const webhook_payload = await req.json()
  let matcher
  try {
    if (webhook_payload.entry[0].messaging) {
      matcher = await matchKeyword(
        webhook_payload.entry[0].messaging[0].message.text
      )
    }

    if (webhook_payload.entry[0].changes) {
      matcher = await matchKeyword(
        webhook_payload.entry[0].changes[0].value.text
      )
    }

    if (matcher && matcher.automationId) {
      console.log('Matched')
      // We have a keyword matcher

      if (webhook_payload.entry[0].messaging) {
        const automation = await getKeywordAutomation(
          matcher.automationId,
          true
        )

        if (automation && automation.trigger && automation.active === true) {
          if (
            automation.listener &&
            automation.listener.listener === 'MESSAGE'
          ) {
            const direct_message = await sendDm(
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              automation.listener?.prompt,
              automation.User?.integrations[0].token!
            )

            if (direct_message.status === 200) {
              const tracked = await trackedResponse(automation.id, 'DM')
              if (tracked) {
                return NextResponse.json(
                  {
                    message: 'Message sent',
                  },
                  { status: 200 }
                )
              }
            }
          }

          if (
            automation.listener &&
            automation.listener.listener === 'SMARTAI' &&
            automation.User?.subscription?.plan === 'PRO' && automation.active == true
          ) {
            
            const smart_ai_message  = await model.generateContent(`${automation.listener.prompt}: Keep responses under 2 sentences`)
                  
                   

                  
               console.log("Sending message")
               console.log(smart_ai_message.response.text());
               
         
            if (smart_ai_message.response.text()) {
              
                
              const reciever = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                webhook_payload.entry[0].messaging[0].message.text
              )

              const sender = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.response.text()
              )

              await client.$transaction([reciever, sender]) 
              const direct_message = await sendDm(
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.response.text(),
                automation.User?.integrations[0].token!
              )
               console.log(direct_message);
              if (direct_message.status === 200) {
                
                const tracked = await trackedResponse(automation.id, 'DM')
                if (tracked) {
                  return NextResponse.json(
                    {
                      message: 'Message sent',
                    },
                    { status: 200 }
                  )
                }
              }  

            }
          }
        }
      }

      if (
        webhook_payload.entry[0].changes &&
        webhook_payload.entry[0].changes[0].field === 'comments'
      ) {
        const automation = await getKeywordAutomation(
          matcher.automationId,
          false
        )

        console.log('geting the automations')

        const automations_post = await getKeyWordPost(
          webhook_payload.entry[0].changes[0].value.media.id,
          automation?.id!
        )

        console.log('found keyword ', automations_post)

        if (automation && automations_post && automation.trigger && automation?.active === true) {
          console.log('first if')
          if (automation.listener) {
            console.log('first if')
            if (automation.listener.listener === 'MESSAGE') {
              console.log(
                'SENDING DM, WEB HOOK PAYLOAD',
                webhook_payload,
                'changes',
                webhook_payload.entry[0].changes[0].value.from
              )

              console.log(
                'COMMENT VERSION:',
                webhook_payload.entry[0].changes[0].value.from.id
              )

              const direct_message = await sendPrivateMessage(
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].changes[0].value.id,
                automation.listener?.prompt,
                automation.User?.integrations[0].token!
              )

              console.log('DM SENT', direct_message.data)
              if (direct_message.status === 200) {
                const tracked = await trackedResponse(automation.id, 'COMMENT')

                if (tracked) {
                  return NextResponse.json(
                    {
                      message: 'Message sent',
                    },
                    { status: 200 }
                  )
                }
              }
            }
            if (
              automation.listener.listener === 'SMARTAI' &&
              automation.User?.subscription?.plan === 'PRO' && automation.active === true
            ) {
                const smart_ai_message  =   await model.generateContent(`${automation.listener.prompt}: Keep responses under 2 sentences`)
                   console.log(smart_ai_message.response.text());
              if (smart_ai_message.response.text()) {
                const reciever = createChatHistory(
                  automation.id,
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.from.id,
                  webhook_payload.entry[0].changes[0].value.text
                )

                const sender = createChatHistory(
                  automation.id,
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.from.id,
                  smart_ai_message.response.text(),
                )

                await client.$transaction([reciever, sender])

                const direct_message = await sendPrivateMessage(
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.id,
                  automation.listener?.prompt,
                  automation.User?.integrations[0].token!
                )

                if (direct_message.status === 200) {
                  const tracked = await trackedResponse(automation.id, 'COMMENT')

                  if (tracked) {
                    return NextResponse.json(
                      {
                        message: 'Message sent',
                      },
                      { status: 200 }
                    )
                  }
                }
              }
            }
          }
        }
      }
    }

    if (!matcher) {
      const customer_history = await getChatHistory(
        webhook_payload.entry[0].messaging[0].recipient.id,
        webhook_payload.entry[0].messaging[0].sender.id
      )
      console.log(customer_history);
      if (customer_history.history.length > 0) {
        const automation = await findAutomation(customer_history.automationId!)

        if (
          automation?.User?.subscription?.plan === 'PRO' &&
          automation.listener?.listener === 'SMARTAI' && automation?.active === true
        ) 
        {
        
           
       
            
        const smart_ai_message = await model.generateContent(`${customer_history.history[1].content },${webhook_payload.entry[0].messaging[0].message.text}:Keep responses under 2 sentences`)

        
        console.log(smart_ai_message);
               

          if (smart_ai_message.response.text()) {
            const direct_message = await sendDm(
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              smart_ai_message.response.text(),
              automation!.User?.integrations[0].token!
            )
            const reciever = createChatHistory(
              automation!.id,
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              webhook_payload.entry[0].messaging[0].message.text
            )

            const sender = createChatHistory(
              automation!.id,
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              smart_ai_message.response.text(),
            )
            await client.$transaction([reciever, sender])
           
            console.log(direct_message);

            if (direct_message.status === 200) {
             
              return NextResponse.json(
                {
                  message: 'Message sent',
                },
                { status: 200 }
              )
            }
          }
        }
      }

      return NextResponse.json(
        {
          message: 'No automation set',
        },
        { status: 200 }
      )
    }
  }
   catch (error) {
    return NextResponse.json(
      {
        message: 'No automation set',
      },
      { status: 200 }
    )
  }
}