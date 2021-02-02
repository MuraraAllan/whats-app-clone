import React from 'react'
import { useChatSession } from 'pages/mainpage/hooks/ChatSessionsHooks'

export default function ActiveMessageScreen() {
  const { chatSession } = useChatSession("1")
  console.log('all chat sessions is', chatSession)
  return <div> Active Message Screen</div>
}