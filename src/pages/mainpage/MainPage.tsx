import React, { useCallback } from 'react'
import Grid from '@material-ui/core/Grid'

import { ActiveChatSession, ChatsArea, FilterArea, UserArea } from 'pages/mainpage/components'
import { ActiveChatSessionProvider, ChatSessionsProvider, MainPageProvider, UploadFileProvider } from 'pages/mainpage/context'
import { FullHeightBorderedContainer } from 'shared/components'

export default function MainPage() {

  return (
    <Grid container direction='row'>
      <ChatSessionsProvider>
        {/* activechatsession provider should be removed and become a group of getters */}
        {/* from MainPageProvider */}
        <ActiveChatSessionProvider>
          <MainPageProvider>
            <UploadFileProvider>
              {/* LEFT AREA CONTAINER */}
              <FullHeightBorderedContainer item direction="column" container xs={6} sm={5} md={3} lg={3} xl={2} >
                <UserArea />
                <FilterArea />
                <ChatsArea />
              </FullHeightBorderedContainer>
              {/* RIGHT AREA CONTAINER */}
              <FullHeightBorderedContainer container item xs={6} sm={7} md={9} lg={9} xl={10} direction="column">
                <ActiveChatSession />
              </FullHeightBorderedContainer>
            </UploadFileProvider>
          </MainPageProvider>
        </ActiveChatSessionProvider>
      </ChatSessionsProvider>
    </Grid>
  )
}