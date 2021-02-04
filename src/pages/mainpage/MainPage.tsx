import React from 'react'
import Grid from '@material-ui/core/Grid'

import ActiveMessageScreen from './components/ActiveMessageScreen'
import ChatsArea from './components/ChatsArea'
import FilterArea from './components/FilterArea'
import { FullHeightBorderedContainer } from 'shared/components/BorderedContainer'
import UserArea from './components/UserArea'

import { ActiveSessionProvider } from './context/ActiveSessionContext'


export default function MainPage() {
  return (
    <Grid container direction='row'>
      {/* LEFT AREA CONTAINER */}
      <ActiveSessionProvider>
        <FullHeightBorderedContainer direction="column" container xs={6} sm={5} md={3} lg={3} xl={2} >
          <UserArea />
          <FilterArea />
          <ChatsArea />
        </FullHeightBorderedContainer>
        {/* RIGHT AREA CONTAINER */}
        <FullHeightBorderedContainer container xs={6} sm={7} md={9} lg={9} xl={10} direction="column">
          <ActiveMessageScreen />
        </FullHeightBorderedContainer>
      </ActiveSessionProvider>
    </Grid>
  )
}