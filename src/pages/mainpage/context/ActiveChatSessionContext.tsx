import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

import { chatSessionsMock } from 'pages/../../mocks/chatSessions'
import { ChatSessionType } from 'pages/mainpage/hooks/ChatSessionsHooks'


export interface ChatSessionContextType {
  state: ChatSessionType | null,
  setActiveSession: Dispatch<SetStateAction<ChatSessionType | null>>
  setShouldDispatchForm: Dispatch<SetStateAction<boolean>>
  shouldDispatchForm: boolean
}

export const ActiveChatSessionContext = React.createContext<ChatSessionContextType | null>(null)

type ActiveSessionProviderProps = { children: ReactNode }

// user context will not carry any reducer nor actions
// our backend will propagate all user's chat rooms
function ActiveChatSessionProvider({ children }: ActiveSessionProviderProps) {
  const [state, setActiveSession] = useState<ChatSessionType | null>(null)
  const [shouldDispatchForm, setShouldDispatchForm] = useState<boolean>(false)
  // we are initializing defualt activeSession as the register chat;
  // wenever a user already registered it should not default setActiveSession
  useEffect(() => {
    setActiveSession(chatSessionsMock[1])
  }, [])

  return (
    <ActiveChatSessionContext.Provider value={{ state, setActiveSession, shouldDispatchForm, setShouldDispatchForm }}>
      {children}
    </ActiveChatSessionContext.Provider>
  )
}



export { ActiveChatSessionProvider }
