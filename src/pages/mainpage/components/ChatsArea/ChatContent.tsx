import React from 'react'
import styled from 'styled-components'

import { BorderedContainer } from 'shared/components/BorderedContainer'
import { useChatSession } from 'pages/mainpage/hooks/ChatSessionsHooks'



export default function ChatsArea({ session_id, user_id }: { session_id: string, user_id: string }): React.ReactElement {
  const { userBelongsToSession } = useChatSession(session_id, user_id)
  const MessageContainer = styled(BorderedContainer)`height: 72px`

  console.log('hey there from belongs to', userBelongsToSession, session_id)
  return (
    <MessageContainer >
      { userBelongsToSession ? "BELONGS" : "DISABLED"}
    </MessageContainer>
  )
}