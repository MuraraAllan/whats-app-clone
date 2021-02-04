import React from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import { BorderedContainer } from 'shared/components/BorderedContainer'
import { CircleContainer } from 'shared/components/CircleContainer';
import { ChatSession, useChatSession, useActiveSession } from 'pages/mainpage/hooks/ChatSessionsHooks'
import { timeStampToTimeConverter } from 'pages/mainpage/utils/timeStampToTimeConverter';

const findLastMessageChatPreview = (lastMessage: ChatSession['lastMessage']) => {
  if (lastMessage.textMessage != null) {
    const breakLine = lastMessage.textMessage.substring(0, 10).indexOf('\n')
    return breakLine !== -1 ? lastMessage.textMessage.substring(0, breakLine).concat('...')
      : lastMessage.textMessage.substring(0, 10).concat('...')
  }
  if (lastMessage.inlineButtons != null) {
    return lastMessage.inlineButtons[0].label.substring(0, 10).concat('....')
  }
  return null
}


export default function ChatsArea({ session_id, user_id }: { session_id: string, user_id: string }): React.ReactElement {
  const { userBelongsToSession, chatSession } = useChatSession(session_id, user_id)
  const Container = styled(BorderedContainer)`height: 72px; cursor: pointer;`
  const { setActiveSession } = useActiveSession()

  if (chatSession == null) {
    return null
  }

  return (
    <Container container
      justify="space-evenly"
      alignItems="center"
      direction="row"
      onClick={() => setActiveSession(session_id)}
    >
      <CircleContainer lg={3} xl={3} style={{
        opacity: userBelongsToSession === false ? '50%' : null
      }}>
        <PeopleAltIcon style={{ width: '75%', height: '75%' }} />
      </CircleContainer>
      <Grid container xs={5} sm={4} md={5} lg={6} xl={6} direction="column"
        style={{
          opacity: userBelongsToSession === false ? '50%' : null
        }}>
        <span><b>{chatSession.title}</b></span>
        <span>{userBelongsToSession ? findLastMessageChatPreview(chatSession.lastMessage) : 'archived'}</span>
      </Grid>
      <Grid container xs={4} sm={5} md={4} lg={3} xl={3}
        justify="space-evenly"
        direction="column"
        alignItems="flex-end"
      >
        <span style={{
          opacity: '50%'
        }}>{timeStampToTimeConverter(chatSession.lastMessage.timeStamp)}</span>
        <CircleContainer width="27" height="27" border="4" style={{ opacity: '100%' }}>
          <span>{chatSession.unreadMessages}</span>
        </CircleContainer>
      </Grid>
    </Container>

  )
}