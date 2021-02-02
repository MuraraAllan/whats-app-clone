import * as React from 'react'
import { ChatSession } from './ChatSessionsContext'

export interface User {
  user_id: string,
  userName: string,
  chatSessions?: ChatSession[]
}

const LoggedUserContext = React.createContext<User | null>(null)

type UserProviderProps = { children: React.ReactNode }

// user context will not carry any reducer nor actions
// our backend will propagate all user's chat rooms
function LoggedUserProvider({ children }: UserProviderProps) {
  const [state] = React.useState<User | null>(null)

  return (
    <LoggedUserContext.Provider value={state}>
      {children}
    </LoggedUserContext.Provider>
  )
}

export { LoggedUserProvider }