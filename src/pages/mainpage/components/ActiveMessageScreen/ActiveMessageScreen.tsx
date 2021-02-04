import React from 'react'
import styled from 'styled-components'


import { ActiveMessageScreenBody } from './ActiveMessageScreenBody'
import { ActiveMessageScreenActionBar } from './ActiveMessageScreenActionBar'
import { ActiveMessageScreenTitle } from './ActiveMessageScreenTitle'
import { BorderedContainer } from 'shared/components/BorderedContainer'
import { useActiveSession } from 'pages/mainpage/hooks/ChatSessionsHooks'

export default function ActiveMessageScreen() {
  const { activeSession } = useActiveSession()

  if (activeSession == null) {
    return <div style={{ width: '100%', textAlign: 'center' }}>
      <span>Pick a chat on the left to start chating...</span>
    </div>
  }

  const Container = styled(BorderedContainer)`height: 72px;`
  const FitIntoContainer = styled(BorderedContainer)`height: calc(100vh - 74px)`
  const FullWidthContainer = styled(BorderedContainer)`max-width: 100%`

  return (
    <>
      <Container item>
        <ActiveMessageScreenTitle activeSession={activeSession} />
      </Container>
      <FitIntoContainer container direction="column">
        <FullWidthContainer container sm={11} md={11} lg={11} xl={11}>
          <ActiveMessageScreenBody />
        </FullWidthContainer>
        <FullWidthContainer container sm={1} md={1} lg={1} xl={1}  >
          <ActiveMessageScreenActionBar />
        </FullWidthContainer>
      </FitIntoContainer>
    </>
  )
}