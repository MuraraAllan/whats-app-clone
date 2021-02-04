import React from 'react'

import ChatContent from './ChatContent'
import { useUser } from 'shared/hooks/UserHooks'

export default function ChatsArea() {
  const user = useUser()
  return (
    <>
      {
        user.chatSessions.map(session => {
          return (
            <ChatContent session_id={session.session_id} user_id={user.user_id} />
          )
        })
      }
    </>
  )
}