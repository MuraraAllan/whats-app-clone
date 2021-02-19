import React from 'react'

import ChatContent from './ChatContent'
import { useUser } from 'shared/hooks/UserHooks'

export default function ChatsArea() {
  const { user } = useUser()

  if (user == null || user.chatSessions == null) {
    return null
  }
  // iterate over all user messages and render its content as preview
  // chatcontent should receive props instead of invoking hooks in the last level
  return (
    <>
      {
        user.chatSessions.map((session) => {
          if (session.session_id == null) {
            return null
          }
          return (
            <ChatContent key={session.session_id} session_id={session.session_id} />
          )
        })
      }
    </>
  )
}