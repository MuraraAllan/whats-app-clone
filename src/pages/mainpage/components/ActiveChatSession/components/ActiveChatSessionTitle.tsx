import React, { useMemo } from 'react'
import Grid from '@material-ui/core/Grid';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import styled from 'styled-components';

import { BorderedContainer, CircleContainer } from 'shared/components';
import { useActiveChatSession } from 'pages/mainpage/hooks'
import { useUser } from 'shared/hooks';

const Container = styled(BorderedContainer)`height: 72px`
const LimitedContainer = styled(Grid)`max-width: 50%`


// should render  the names of participants and the ActiveChatSession title
// when user not belong to ActiveChatSession doesn't render participants names

export default function ActiveChatSessionTitle() {
  const { activeChatSession } = useActiveChatSession()
  const { user } = useUser()

  const usersInChat = useMemo(() => {
    if (user == null || activeChatSession == null || activeChatSession.participants == null) {
      return null
    }
    // implement i18n
    const allUsers = activeChatSession.participants.map((participant) => participant.user_id === user.user_id ? 'Eu' : participant.userName)
    allUsers.sort((a, b) => a.localeCompare(b))
    return allUsers.join(', ')
  }, [activeChatSession, user])

  if (user == null || activeChatSession == null) {
    return null
  }

  return (
    <Container container
      justify="flex-start"
      alignItems="center"
      direction="row"
      style={{ backgroundColor: activeChatSession.userBelongsToSession ? 'white' : '#80808066' }}
    >
      <CircleContainer style={{ marginLeft: '10px', marginRight: '10px' }}>
        <PeopleAltIcon style={{ width: '75%', height: '75%' }} />
      </CircleContainer>
      <LimitedContainer container direction="column">
        <span data-testid="activeChatSessionTitleTitle"><b>{activeChatSession.title}</b></span>
        {/* implement i18n */}
        <span data-testid="activeChatSessionTitleUsers">{activeChatSession.userBelongsToSession ? usersInChat : "You can't see users in this chat session"}</span>
      </LimitedContainer>
    </Container>
  )
} 