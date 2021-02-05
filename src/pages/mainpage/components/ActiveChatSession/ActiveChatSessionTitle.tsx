import React, { useMemo } from 'react'
import Grid from '@material-ui/core/Grid';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import styled from 'styled-components';

import { BorderedContainer, CircleContainer } from 'shared/components';
import { useUser } from 'shared/hooks';
import { useActiveSession } from 'pages/mainpage/hooks'


export default function ActiveChatSessionTitle() {
  const { activeSession, userBelongsToActiveSession } = useActiveSession()
  const user = useUser()

  const usersInChat = useMemo(() => {
    if (user == null || activeSession == null) {
      return null
    }
    // implement i18n
    const allUsers = activeSession.participants.map(participant => participant.user_id === user.user_id ? 'Eu' : participant.userName)
    allUsers.sort((a, b) => a.localeCompare(b))
    return allUsers.join(',')
  }, [activeSession, user])

  if (user == null || activeSession == null) {
    return null
  }

  const Container = styled(BorderedContainer)`height: 72px`
  const LimitedContainer = styled(Grid)`max-width: 50%`

  return (
    <Container container
      justify="flex-start"
      alignItems="center"
      direction="row"
      style={{ backgroundColor: userBelongsToActiveSession ? 'white' : '#80808066' }}
    >
      <CircleContainer style={{ marginLeft: '10px', marginRight: '10px' }}>
        <PeopleAltIcon style={{ width: '75%', height: '75%' }} />
      </CircleContainer>
      <LimitedContainer container direction="column">
        <span><b>{activeSession.title}</b></span>
        {/* implement i18n */}
        <span>{userBelongsToActiveSession ? usersInChat : "You can't see users in this chat session"}</span>
      </LimitedContainer>
    </Container>
  )
} 