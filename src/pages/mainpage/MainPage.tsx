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
      <FullHeightBorderedContainer direction="column" container xs={5} sm={4} md={4} lg={3} xl={3} >
        <UserArea />
        <FilterArea />
        <ChatsArea />
      </FullHeightBorderedContainer>
      {/* RIGHT AREA CONTAINER */}
      <FullHeightBorderedContainer container xs={7} sm={8} md={8} lg={9} xl={9}>
        <ActiveMessageScreen />
      </FullHeightBorderedContainer>
    </Grid>
  )
}