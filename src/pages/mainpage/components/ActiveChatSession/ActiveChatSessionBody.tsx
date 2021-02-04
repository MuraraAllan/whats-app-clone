import React from 'react'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import PersonIcon from '@material-ui/icons/Person';

import { CircleContainer } from 'shared/components'
import Message from 'pages/mainpage/hooks/ChatSessionsHooks';
import InlineButtonsDisplay from './InlineButtonsDisplay'
import TextMessageDisplay from './TextMessageDisplay'
import { useActiveSession } from 'pages/mainpage/hooks'





export default function ActiveChatSessionBody() {
  const { activeSession } = useActiveSession()

  if (activeSession == null) {
    return null
  }
  // align gridPadded to the flex-end when message.user === loggedUser
  const GridPadded = styled(Grid)`padding: 10px`
  // message can use 70 % of width 
  // inline buttons can use entire screen 
  const UserAvatarWithName = ({ message }: { message: Message }) => (
    <CircleContainer container wrap="nowrap" direction="column" width={55} height={55}>
      <PersonIcon viewBox="0 0 24 14" style={{ width: '70%', height: '70%' }} />
      <span style={{ marginBottom: '10px' }}>{message.user.userName}</span>
    </CircleContainer>
  )
  return <>
    {activeSession?.messages?.map(message => {

      if (message.textMessage != null) {
        return (
          <GridPadded container direction="row" >
            <UserAvatarWithName message={message} />
            <TextMessageDisplay message={message} />
          </GridPadded>
        )
      }
      if (message.inlineButtons != null) {
        return (
          <GridPadded container direction="row" >
            <UserAvatarWithName message={message} />
            <InlineButtonsDisplay inlineButtons={message.inlineButtons} />
          </GridPadded>
        )
      }

      return <div></div>
    })}
  </>
}