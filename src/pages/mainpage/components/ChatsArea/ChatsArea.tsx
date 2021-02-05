import React from 'react'

import ChatContent from './ChatContent'
import { useUser } from 'shared/hooks/UserHooks'

export default function ChatsArea() {
  const user = useUser()

  if (user == null || user.chatSessions == null) {
    return null
  }

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