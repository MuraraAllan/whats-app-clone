import React, { Dispatch, SetStateAction, useState } from 'react'
import { ChatSessionType } from 'pages/mainpage/hooks/ChatSessionsHooks'
import { userWithChatSessions } from 'mocks/userData'

export interface User {
  user_id: string,
  userName: string,
  chatSessions?: ChatSessionType[],
  isRegistering?: boolean
}

type RegisteringFormControl = {
  isRegisteringFormOpen: boolean,
  setIsRegisterFormOpen: Dispatch<SetStateAction<boolean>>
}

type UserContext = {
  user: User
} & RegisteringFormControl

export const LoggedUserContext = React.createContext<UserContext | null>(null)

type UserProviderProps = { children: React.ReactNode }

// user context will not carry any reducer nor actions
// our backend will propagate all user's chat rooms
// we are retrieving from MockData, mimicking user logged in
// and it's propertys

function LoggedUserProvider({ children }: UserProviderProps) {
  const [user,] = useState<User>(userWithChatSessions)
  const [isRegisteringFormOpen, setIsRegisterFormOpen] = useState<boolean>(false)

  return (
    <LoggedUserContext.Provider value={{ user, isRegisteringFormOpen, setIsRegisterFormOpen }}>
      {children}
    </LoggedUserContext.Provider>
  )
}

export { LoggedUserProvider }