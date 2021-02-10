import React from 'react'

import ChatContent from './ChatContent'
import { useUser } from 'shared/hooks/UserHooks'

export default function ChatsArea() {
  const user = useUser()

  if (user == null || user.chatSessions == null) {
    return null
  }
  // iterate over all user messages and render its content as preview
  return (
    <>
      {
        user.chatSessions.map((session, index) => {
          return (
            <ChatContent key={index} session_id={session.session_id} />
          )
        })
      }
    </>
  )
}