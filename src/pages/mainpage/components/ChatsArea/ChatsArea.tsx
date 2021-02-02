import React from 'react'

import { BorderedContainer } from 'shared/components/BorderedContainer'
import { useUser } from '../../../../shared/hooks/UserHooks'
import ChatContent from './ChatContent'

export default function ChatsArea() {
  const user = useUser()
  console.log('hey there from chatsare', user.chatSessions)
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