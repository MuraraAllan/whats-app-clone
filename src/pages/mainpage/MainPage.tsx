import React from 'react'
import Grid from '@material-ui/core/Grid'

import { ActiveChatSession, ChatsArea, FilterArea, UserArea } from 'pages/mainpage/components'
import { ActiveChatSessionProvider } from 'pages/mainpage/context'
import { FullHeightBorderedContainer } from 'shared/components'

export default function MainPage() {
  return (
    <Grid container direction='row'>

      <ActiveChatSessionProvider>
        {/* LEFT AREA CONTAINER */}
        <FullHeightBorderedContainer direction="column" container xs={6} sm={5} md={3} lg={3} xl={2} >
          <UserArea />
          <FilterArea />
          <ChatsArea />
        </FullHeightBorderedContainer>
        {/* RIGHT AREA CONTAINER */}
        <FullHeightBorderedContainer container xs={6} sm={7} md={9} lg={9} xl={10} direction="column">
          <ActiveChatSession />
        </FullHeightBorderedContainer>
      </ActiveChatSessionProvider>
    </Grid>
  )
}