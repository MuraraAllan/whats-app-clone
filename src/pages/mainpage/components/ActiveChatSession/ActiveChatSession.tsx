import React from 'react'
import styled from 'styled-components'

import { ActiveChatSessionActionBar, ActiveChatSessionBody, ActiveChatSessionTitle } from '.'
import { BorderedContainer } from 'shared/components'
import { useActiveChatSessionID } from '../../hooks'

// ActiveChatSessionBody is the centered area in the screen.
// ActiveChatSessionActionBar is the ActionBar down the screen.

const ActionContainer = styled(BorderedContainer)`min-height:60px;`
// We need to calculate how much is left in user screen, considering that
// ActionBar and Title will use 74px and 60 px, it should be all screen - 134px
const CalcContainer = styled(BorderedContainer)`height: calc(100vh - 134px); overflow-x: hidden; overflow-y: auto; position: relative;`
const Container = styled(BorderedContainer)`height: 72px;`

export default function ActiveChatSession() {
  const sessionId = useActiveChatSessionID()

  if (sessionId == null) {
    return <div style={{ width: '100%', textAlign: 'center' }}>
      <span>Pick a chat on the left to start chating...</span>
    </div>
  }

  return (
    <>
      <Container item>
        <ActiveChatSessionTitle />
      </Container>
      <CalcContainer container >
        <ActiveChatSessionBody />
      </CalcContainer>
      <ActionContainer item border={2}>
        <ActiveChatSessionActionBar />
      </ActionContainer>
    </>
  )
}