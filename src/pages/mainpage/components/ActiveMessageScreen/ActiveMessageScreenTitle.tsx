import React, { useMemo } from 'react'
import Grid from '@material-ui/core/Grid';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import styled from 'styled-components';

import { BorderedContainer } from 'shared/components/BorderedContainer';
import { ChatSession } from 'pages/mainpage/hooks/ChatSessionsHooks'
import { CircleContainer } from 'shared/components/CircleContainer';
import { useUser } from 'shared/hooks/UserHooks';


export function ActiveMessageScreenTitle({ activeSession }: { activeSession: ChatSession }) {
  const user = useUser()

  const usersInChat = useMemo(() => {
    if (user == null) {
      return null
    }
    //this is a pontential spot for i18n
    const allUsers = activeSession.participants.map(participant => participant.user_id === user.user_id ? 'Eu' : participant.userName)
    allUsers.sort((a, b) => a.localeCompare(b))
    return allUsers.join(',')
  }, [activeSession, user])

  const Container = styled(BorderedContainer)`height: 72px`
  const LimitedContainer = styled(Grid)`max-width: 50%`

  return (
    <Container container
      justify="flex-start"
      alignItems="center"
      direction="row"
    >
      <CircleContainer container style={{ marginLeft: '10px', marginRight: '10px' }}>
        <PeopleAltIcon style={{ width: '75%', height: '75%' }} />
      </CircleContainer>
      <LimitedContainer container direction="column">
        <span><b>{activeSession.title}</b></span>
        <span>{usersInChat}</span>
      </LimitedContainer>
    </Container>
  )
} 