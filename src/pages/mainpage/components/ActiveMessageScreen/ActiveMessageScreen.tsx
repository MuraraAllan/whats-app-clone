import React from 'react'
import { useChatSession } from 'pages/mainpage/hooks/ChatSessionsHooks'

export default function ActiveMessageScreen() {
  const { chatSession } = useChatSession("1")
  return <div> Active Message Screen</div>
}