import React from 'react'
import Grid from '@material-ui/core/Grid'

import { ActiveChatSession, ChatsArea, FilterArea, UserArea } from 'pages/mainpage/components'
import { MainPageProvider, UploadFileProvider } from 'pages/mainpage/context'
import { FullHeightBorderedContainer } from 'shared/components'
import { useActiveChatSessionID } from './hooks'

export function MobileMainPage() {
  const sessionID = useActiveChatSessionID()

  return (
    <Grid container direction='row'>
      {/* activechatsession provider should be removed and become a group of getters */}
      {/* from MainPageProvider */}

      <UploadFileProvider>
        {sessionID == null ?
          (<FullHeightBorderedContainer item direction="column" container>
            <UserArea />
            <FilterArea />
            <ChatsArea />
          </FullHeightBorderedContainer>)
          : (
            <FullHeightBorderedContainer container item direction="column">
              <ActiveChatSession />
            </FullHeightBorderedContainer>
          )}
      </UploadFileProvider>
    </Grid>
  )
}


export default function MainPage() {
  return (
    <Grid container direction='row'>
      {/* activechatsession provider should be removed and become a group of getters */}
      {/* from MainPageProvider */}

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

    </Grid>
  )
}