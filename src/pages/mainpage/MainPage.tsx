import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { FullHeightBorderedContainer } from 'shared/components/BorderedContainer'
import UserArea from './components/UserArea'
import ChatsArea from './components/ChatsArea'
import FilterArea from './components/FilterArea'
import ActiveMessageScreen from './components/ActiveMessageScreen'


export default function MainPage() {
  return (
    <Grid container direction='row'>
      {/* LEFT AREA CONTAINER */}
      <FullHeightBorderedContainer direction="column" container xs={6} sm={5} md={3} lg={3} xl={2} >
        <UserArea />
        <FilterArea />
        <ChatsArea />
      </FullHeightBorderedContainer>
      {/* RIGHT AREA CONTAINER */}
      <FullHeightBorderedContainer container xs={6} sm={7} md={9} lg={9} xl={10}>
        <ActiveMessageScreen />
      </FullHeightBorderedContainer>
    </Grid>
  )
}