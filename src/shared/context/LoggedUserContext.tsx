import React, { Dispatch, SetStateAction, useState } from 'react'
import { ChatSessionType } from 'pages/mainpage/hooks/ChatSessionsHooks'
import { userWithChatSessions } from 'pages/../../mocks/userData'

export interface User {
  user_id: string,
  userName: string,
  chatSessions?: ChatSessionType[],
  isRegistering?: boolean
  avatar?: string | Blob
}

export type RegisteringFormControl = {
  isRegisteringFormOpen: boolean,
  setIsRegisterFormOpen: Dispatch<SetStateAction<boolean>>
}

type UserProviderProps = { children: React.ReactNode }

type UserContext = {
  user: User
} & RegisteringFormControl

// user context will not carry any reducer nor actions
// our backend will propagate all user's chat rooms
// we are retrieving from MockData, mimicking user logged in
// and it's propertys

export const LoggedUserContext = React.createContext<UserContext | null>(null)

function LoggedUserProvider({ children }: UserProviderProps) {
  // this is a top context we shouldnt rerender it
  // move state to useActiveSessionUserStates (?)
  const [user,] = useState<User>(userWithChatSessions)
  const [isRegisteringFormOpen, setIsRegisterFormOpen] = useState<boolean>(false)

  return (
    <LoggedUserContext.Provider value={{ user, isRegisteringFormOpen, setIsRegisterFormOpen }}>
      {children}
    </LoggedUserContext.Provider>
  )
}

export { LoggedUserProvider }