import React, { Dispatch, SetStateAction, useEffect } from 'react'

import { chatSessionsMock } from 'mocks/chatSessions'
import { ChatSessionType } from 'pages/mainpage/hooks/ChatSessionsHooks'


export interface ChatSessionContextType {
  state: ChatSessionType | null,
  setActiveSession: Dispatch<SetStateAction<ChatSessionType | null>>
}

export const ActiveChatSessionContext = React.createContext<ChatSessionContextType | null>(null)

type ActiveSessionProviderProps = { children: React.ReactNode }

// user context will not carry any reducer nor actions
// our backend will propagate all user's chat rooms
function ActiveChatSessionProvider({ children }: ActiveSessionProviderProps) {
  const [state, setActiveSession] = React.useState<ChatSessionType | null>(null)

  // we are initializing defualt activeSession as the register chat;
  // wenever a user already registered it should not default setActiveSession
  useEffect(() => {
    setActiveSession(chatSessionsMock[1])
  }, [])

  return (
    <ActiveChatSessionContext.Provider value={{ state, setActiveSession }}>
      {children}
    </ActiveChatSessionContext.Provider>
  )
}



export { ActiveChatSessionProvider }