import React, { useMemo } from 'react'
import Grid from '@material-ui/core/Grid';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import styled from 'styled-components'

import { BorderedContainer, CircleContainer } from 'shared/components/'
import { useChatSession, useActiveChatSession } from 'pages/mainpage/hooks/'
import { ChatSessionType } from 'pages/mainpage/hooks/ChatSessionsHooks'
import { timeStampToTimeConverter } from 'pages/mainpage/utils/timeStampToTimeConverter';
import { AttachFile, CameraAlt, Mic } from '@material-ui/icons';

export const findLastMessageChatPreview = (lastMessage: ChatSessionType['lastMessage']) => {

}

const Container = styled(BorderedContainer)`height: 72px; cursor: pointer;`

export default function ChatContent({ session_id }: { session_id: string }): React.ReactElement {
  const { chatSession, userBelongsToSession } = useChatSession(session_id)
  const { activeSession, setActiveSession } = useActiveChatSession()
  // console.log('chat sesison is', chatSession)
  const isCurrentActiveSession = useMemo(() => activeSession != null && activeSession.session_id === session_id, [activeSession, session_id])
  const chatPreview = useMemo(() => {
    if (chatSession?.lastMessage == null) {
      return null
    }
    const lastMessage = chatSession.lastMessage

    if (lastMessage?.audio != null) {
      return <div style={{ display: 'flex', alignItems: 'center' }}><Mic /> <span>Audio</span></div>
    }

    if (lastMessage?.file != null) {
      return <div style={{ display: 'flex', alignItems: 'center' }}><AttachFile /> <span>Arquivo</span></div>
    }

    if (lastMessage?.picture != null) {
      return <div style={{ display: 'flex', alignItems: 'center' }}><CameraAlt /> <span>Foto</span></div>
    }
    if (lastMessage?.textMessage != null) {
      const breakLine = lastMessage.textMessage.substring(0, 10).indexOf('\n')
      return breakLine !== -1 ? lastMessage.textMessage.substring(0, breakLine).concat('...')
        : lastMessage.textMessage.substring(0, 10).concat('...')
    }
    if (lastMessage?.inlineButtons != null) {
      return lastMessage.inlineButtons[0].label.substring(0, 10).concat('...')
    }
    return null
  }, [chatSession?.lastMessage])

  if (chatSession == null || activeSession == null) {
    return (<div></div>)
  }
  // render a preview of the message containing the chat picture, title, lastMessagePreview and unreadMessages
  return (
    <Container container
      justify="space-evenly"
      alignItems="center"
      direction="row"
      data-testid="chatAreaContainer"
      style={{ backgroundColor: isCurrentActiveSession ? "#80808066" : 'white' }}
      onClick={() => setActiveSession(session_id)}
    >
      {/* chatContent Picture Display */}
      <CircleContainer style={{
        opacity: userBelongsToSession === false ? '50%' : '100%'
      }}>
        <PeopleAltIcon style={{ width: '75%', height: '75%' }} />
      </CircleContainer>
      <Grid container item xs={5} sm={4} md={5} lg={6} xl={6} direction="column" style={{ opacity: userBelongsToSession === false ? '50%' : '100%' }}>
        {/* title Display */}
        <span data-testid="chatAreaTitle"><b>{chatSession.title}</b></span>
        { /* implement i18n */}
        {/* content Display */}
        <span data-testid="chatAreaLastMessage">{userBelongsToSession ? chatPreview : 'disabled'}</span>
      </Grid>
      {/* unreadMessages Display */}
      <Grid container item xs={4} sm={5} md={4} lg={3} xl={3}
        justify="space-evenly"
        direction="column"
        alignItems="flex-end"
      >
        <span style={{ opacity: '50%' }}>{chatSession.lastMessage != null ? timeStampToTimeConverter(chatSession.lastMessage.timeStamp) : null}</span>
        <CircleContainer width={27} height={27} border={4} opacity='100%'>
          <span data-testid="chatAreaUnreadMessages">{chatSession.unreadMessages}</span>
        </CircleContainer>
      </Grid>
    </Container>
  )
}