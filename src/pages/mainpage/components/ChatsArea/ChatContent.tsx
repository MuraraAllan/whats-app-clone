import React, { useMemo } from 'react'
import { AttachFile, CameraAlt, Mic } from '@material-ui/icons';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components'

import { BorderedContainer, CircleContainer } from 'shared/components/'
import { ChatSessionType, useUserBelongsToSession } from 'pages/mainpage/hooks/ChatSessionsHooks';
import { useGetChatSession, useActiveChatSessionID, useMainPageDispatchers } from 'pages/mainpage/hooks';


export const findLastMessageChatPreview = (lastMessage: ChatSessionType['lastMessage']) => {
  if (lastMessage?.textMessage != null) {
    const breakLine = lastMessage.textMessage.substring(0, 10).indexOf('\n')
    return breakLine !== -1 ? lastMessage.textMessage.substring(0, breakLine).concat('...')
      : lastMessage.textMessage.substring(0, 10).concat('...')
  }
  if (lastMessage?.inlineButtons != null) {
    return lastMessage.inlineButtons[0].label.substring(0, 10).concat('...')
  }
}

const Container = styled(BorderedContainer)`height: 72px; cursor: pointer;`

export const ChatContent = function ChatContent({ session_id }: { session_id: ChatSessionType["session_id"] }): React.ReactElement {
  const { getChatSession } = useGetChatSession()
  const activeSessionID = useActiveChatSessionID()
  const { setActiveChatSession } = useMainPageDispatchers()

  const chatSession = getChatSession(session_id)
  const userBelongsToSession = useUserBelongsToSession(session_id)
  const isCurrentActiveSession = activeSessionID != null && activeSessionID === session_id

  const chatPreview = useMemo(() => {
    // if lastMessage has a file then we should check for its type
    // and render a respective icon
    // otherwise render text
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
    if (lastMessage?.textMessage != null || lastMessage.inlineButtons != null) {
      return findLastMessageChatPreview(lastMessage)
    }
    return null
  }, [chatSession?.lastMessage])

  const ChatPreviewTime = useMemo(() => {
    if (chatSession?.lastMessage != null) {
      const messageTimestamp = chatSession.lastMessage.timeStamp
      const messageDate = new Date(messageTimestamp)
      const now = new Date()
      const isToday = messageDate.getDate() === now.getDate() && messageDate.getMonth() === now.getMonth() && messageDate.getFullYear() === now.getFullYear()
      // if is today return currentDate
      if (isToday) {
        return messageDate.toLocaleString('en-us', { hour: 'numeric', minute: 'numeric', hour12: true })
      }
      return messageDate.toLocaleDateString()
    }
    return null
  }, [chatSession?.lastMessage])


  if (chatSession == null) {
    return (<div></div>)
  }

  // render a preview of the message containing the chat picture, title, lastMessagePreview and unreadMessages
  return (
    <Container container
      justify="space-evenly"
      alignItems="center"
      direction="row"
      data-testid={`chatAreaContainer${session_id}`}
      style={{ backgroundColor: isCurrentActiveSession ? "#80808066" : 'white' }}
      onClick={() => setActiveChatSession(session_id)}
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
        <span data-testid="chatAreaLastMessagePreview">{userBelongsToSession ? chatPreview : 'disabled'}</span>
      </Grid>
      {/* unreadMessages Display */}
      <Grid container item xs={4} sm={5} md={4} lg={3} xl={3}
        justify="space-evenly"
        direction="column"
        alignItems="flex-end"
      >
        <span style={{ opacity: '50%' }}>{chatSession.lastMessage != null ? ChatPreviewTime : null}</span>
        <CircleContainer width={27} height={27} border={4} opacity='100%'>
          <span data-testid="chatAreaUnreadMessages">{chatSession.unreadMessages}</span>
        </CircleContainer>
      </Grid>
    </Container>
  )
}