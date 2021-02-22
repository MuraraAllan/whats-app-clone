import React from 'react'
import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import styled from 'styled-components';

import { BorderedContainer, UserAvatar } from 'shared/components';
import { useUser } from 'shared/hooks/UserHooks';

const Container = styled(BorderedContainer)`height: 72px`

export default function UserArea() {
  const { user } = useUser()

  if (user == null) {
    return null
  }

  return (
    <Container container
      justify="space-evenly"
      alignItems="center"
      direction="row"
    >
      <UserAvatar avatar={user.avatar} />
      <Grid item xs={7} sm={8} md={8} lg={9} xl={9}>
        <span>[{user.userName}]</span>
      </Grid>
      <Grid item>
        <MoreVertIcon viewBox="0 0 8 24" />
      </Grid>
    </Container>
  )
} 