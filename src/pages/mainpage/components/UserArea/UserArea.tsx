import React from 'react'
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styled from 'styled-components';

import { BorderedContainer } from 'shared/components/BorderedContainer';

import { useUser } from 'shared/hooks/UserHooks';
import { CircleContainer } from 'shared/components/CircleContainer';


export default function UserArea() {
  const Container = styled(BorderedContainer)`height: 72px`
  const user = useUser()
  return (
    <Container container
      justify="space-evenly"
      alignItems="center"
      direction="row"
    >
      <CircleContainer>
        <PersonIcon style={{ width: '80%', height: '80%' }} />
      </CircleContainer>
      <Grid xs={7} sm={8} md={8} lg={9} xl={9}>
        <span>[{user.userName}]</span>
      </Grid>
      <Grid item>
        <MoreVertIcon viewBox="0 0 8 24" />
      </Grid>
    </Container>
  )
} 