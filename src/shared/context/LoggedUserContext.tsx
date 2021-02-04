import React from 'react'
import { ChatSession } from 'pages/mainpage/hooks/ChatSessionsHooks'
import { userWithChatSessions } from 'mocks/userData'

export interface User {
  user_id: string,
  userName: string,
  chatSessions?: ChatSession[],
}

export const LoggedUserContext = React.createContext<User | null>(null)

type UserProviderProps = { children: React.ReactNode }

// user context will not carry any reducer nor actions
// our backend will propagate all user's chat rooms
// we are retrieving from MockData, mimicking user logged in
// and it's propertys

function LoggedUserProvider({ children }: UserProviderProps) {
  const [state,] = React.useState<User | null>(userWithChatSessions)
  return (
    <LoggedUserContext.Provider value={state}>
      {children}
    </LoggedUserContext.Provider>
  )
}

export { LoggedUserProvider }