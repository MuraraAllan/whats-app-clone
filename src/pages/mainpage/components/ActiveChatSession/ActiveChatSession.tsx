import React from 'react'
import styled from 'styled-components'

import { ActiveChatSessionActionBar, ActiveChatSessionBody, ActiveChatSessionTitle } from '.'
import { BorderedContainer } from 'shared/components'
// import { useActiveSession } from 'pages/mainpage/hooks'

export default function ActiveChatSessionScreen() {
  // this is not the most ideal scenario is it forces re-render ActiveChatSessionScreen and childrens each time activeSession switchs
  // although it is better to rerender and show something when a registered user recently logged in and don't have an ActiveSession yet
  // this will remain commented in case we don't finish the extra firebase/firestore task, to avoid unecessary rerender

  // const { activeSession } = useActiveSession()
  // if (activeSession == null) {
  //   return <div style={{ width: '100%', textAlign: 'center' }}>
  //     <span>Pick a chat on the left to start chating...</span>
  //   </div>
  // }

  const Container = styled(BorderedContainer)`height: 72px;`
  const FitIntoContainer = styled(BorderedContainer)`height: calc(100vh - 74px)`
  const FullWidthContainer = styled(BorderedContainer)`max-width: 100%`

  return (
    <>
      <Container item>
        <ActiveChatSessionTitle />
      </Container>
      <FitIntoContainer container direction="column">
        <FullWidthContainer container direction="column" sm={11} md={11} lg={11} xl={11}>
          <ActiveChatSessionBody />
        </FullWidthContainer>
        <FullWidthContainer container sm={1} md={1} lg={1} xl={1}  >
          <ActiveChatSessionActionBar />
        </FullWidthContainer>
      </FitIntoContainer>
    </>
  )
}