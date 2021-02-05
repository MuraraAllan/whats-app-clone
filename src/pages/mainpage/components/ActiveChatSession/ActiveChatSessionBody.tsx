import React from 'react'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import PersonIcon from '@material-ui/icons/Person';

import { CircleContainer } from 'shared/components'
import Message from 'pages/mainpage/hooks/ChatSessionsHooks';
import InlineButtonsDisplay from './InlineButtonsDisplay'
import TextMessageDisplay from './TextMessageDisplay'
import { useActiveChatSession } from 'pages/mainpage/hooks'

const GridPadded = styled(Grid)`padding: 10px`

export default function ActiveChatSessionBody() {
  const { activeSession } = useActiveChatSession()

  if (activeSession == null) {
    return null
  }
  // align gridPadded to the flex-end when message.user === loggedUser
  const UserAvatarWithName = ({ message }: { message: Message }) => (
    <CircleContainer container wrap="nowrap" direction="column" width={55} height={55}>
      <PersonIcon viewBox="0 0 24 14" style={{ width: '70%', height: '70%' }} />
      <span style={{ marginBottom: '10px' }}>{message.user.userName}</span>
    </CircleContainer>
  )

  // message can use 70 % of width 
  // inline buttons can use entire screen 

  // iterate over all messages, if there is a message with textMessage then render the message and it's inlineButtons if present
  // if not check for inlineButtons, render inlineButtons if present
  // when we implement sendAudio we should look for the presence in Message Object
  // and return it before rendering textMessages, side-effect is messages audio will not join the message loop 
  // this logic needs to be wrapped in a test that expects that container follows its logical behavior

  return <>
    {activeSession?.messages?.map((message, index) => {
      if (message.textMessage != null) {
        return (
          <GridPadded key={index} container direction="row" >
            <UserAvatarWithName message={message} />
            <TextMessageDisplay message={message} />
          </GridPadded>
        )
      }
      if (message.inlineButtons != null) {
        return (
          <GridPadded key={index} container direction="row" >
            <UserAvatarWithName message={message} />
            <InlineButtonsDisplay inlineButtons={message.inlineButtons} />
          </GridPadded>
        )
      }

      return <div></div>
    })}
  </>
}