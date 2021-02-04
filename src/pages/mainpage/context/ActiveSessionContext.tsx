import React, { Dispatch, SetStateAction } from 'react'
import { ChatSessionType } from 'pages/mainpage/hooks/ChatSessionsHooks'


export interface ChatSessionContextType {
  state: ChatSessionType | null,
  setActiveSession: Dispatch<SetStateAction<ChatSessionType | null>>
}

export const ActiveSessionContext = React.createContext<ChatSessionContextType | null>(null)

type ActiveSessionProviderProps = { children: React.ReactNode }

// user context will not carry any reducer nor actions
// our backend will propagate all user's chat rooms
function ActiveSessionProvider({ children }: ActiveSessionProviderProps) {
  const [state, setActiveSession] = React.useState<ChatSessionType | null>(null)

  return (
    <ActiveSessionContext.Provider value={{ state, setActiveSession }}>
      {children}
    </ActiveSessionContext.Provider>
  )
}



export { ActiveSessionProvider }