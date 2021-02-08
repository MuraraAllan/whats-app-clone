import React, { useEffect, useMemo } from 'react'

import { chatSessionsMock } from 'mocks/chatSessions'
import { ChatSessionType, useChatSessions } from 'pages/mainpage/hooks/ChatSessionsHooks'
import { useUser } from 'shared/hooks'
import { User } from 'shared/context/LoggedUserContext'

export interface ActiveChatSessionType extends Partial<ChatSessionType> {
  isUploadingFile?: boolean
}

export interface ChatSessionContextType {
  activeSession: ActiveChatSessionType | null,
  setActiveSession: (session_id: string) => void,
  setIsUploadingFile: (status: boolean) => void
  userBelongsToActiveSession: boolean,
}

export const ActiveChatSessionContext = React.createContext<ChatSessionContextType | null>(null)

type ActiveSessionProviderProps = { children: React.ReactNode }

// user context will not carry any reducer nor actions
// our backend will propagate all user's chat rooms
function ActiveChatSessionProvider({ children }: ActiveSessionProviderProps) {
  const [activeSession, setActiveSessionState] = React.useState<ActiveChatSessionType | null>(null)
  const { chatSessions } = useChatSessions()
  const { user_id } = useUser()


  const setIsUploadingFile = (status: boolean) => {
    setActiveSessionState({ ...activeSession, isUploadingFile: status })
  }

  const setActiveSession = (session_id: string) => {
    if (activeSession?.session_id === session_id) {
      return
    }
    Object.values(chatSessions?.sessions ?? []).forEach(session => {
      if (session.session_id === session_id) {
        setActiveSessionState({ ...session })
      }
    })
  };

  // we are initializing defualt activeSession as the register chat;
  // wenever a user already registered it should not default setActiveSession
  useEffect(() => {
    setActiveSession("2")
  }, [])

  // move memo inside session context to avoid multiple pieces of state on children components 
  // whice were using context just to then create the activeSession states
  const userBelongsToActiveSession = useMemo(() => {
    if (activeSession == null || activeSession.session_id == null || user_id == null) {
      return false
    }

    const belongs = Object.values(activeSession?.participants ?? []).reduce<boolean>((prev: boolean, participant: User) => {
      if (participant.user_id === user_id) {
        return true
      }
      return prev
    }, false)

    return belongs
  }, [user_id, activeSession])

  return (
    <ActiveChatSessionContext.Provider value={{ activeSession, setActiveSession, userBelongsToActiveSession, setIsUploadingFile }}>
      {children}
    </ActiveChatSessionContext.Provider>
  )
}



export { ActiveChatSessionProvider }
