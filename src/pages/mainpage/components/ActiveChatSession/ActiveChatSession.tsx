import React from 'react'
import styled from 'styled-components'

import { ActiveChatSessionActionBar, ActiveChatSessionBody, ActiveChatSessionTitle } from '.'
import { BorderedContainer } from 'shared/components'

// import { useActiveChatSession } from 'pages/mainpage/hooks'
const ActionContainer = styled(BorderedContainer)`height:60px;`
// We need to calculate how much is left in user screen, considering that
// ActionBar and Title will use 74px and 60 px, it should be all screen - 134px
const CalcContainer = styled(BorderedContainer)`height: calc(100vh - 134px)`
const Container = styled(BorderedContainer)`height: 72px;`
const FullWidthContainer = styled(BorderedContainer)`max-width: 100%`

export default function ActiveChatSessionScreen() {
  // this is not the most ideal scenario as it forces re-render ActiveChatSessionScreen and childrens each time activeSession switchs
  // although it is better to rerender and show something when a registered user recently logged in and don't have an ActiveSession yet
  // this will remain commented in case we don't finish the extra firebase/firestore task, to avoid unecessary rerender

  // const { activeSession } = useActiveChatSession()
  // if (activeSession == null) {
  //   return <div style={{ width: '100%', textAlign: 'center' }}>
  //     <span>Pick a chat on the left to start chating...</span>
  //   </div>
  // }

  return (
    <>
      <Container item>
        <ActiveChatSessionTitle />
      </Container>
      <CalcContainer container direction="column">
        <FullWidthContainer container item direction="column" xs={12} sm={12} md={12} lg={12} xl={12}>
          <ActiveChatSessionBody />
        </FullWidthContainer>
      </CalcContainer>
      <ActionContainer item border={2}>
        <ActiveChatSessionActionBar />
      </ActionContainer>
    </>
  )
}