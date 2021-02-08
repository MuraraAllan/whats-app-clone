import React from 'react'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'

import { BorderedContainer } from 'shared/components'
import { Message } from 'pages/mainpage/hooks/ChatSessionsHooks'
import InlineButtonsDisplay from './InlineButtonsDisplay'

const MessageContainer = styled(BorderedContainer)`max-width: 90%; overflow: hidden; padding: 10px; margin-bottom: 5px; background-color: #80808066;`

export default function TextMessageDisplay({ message, isCurrentUserMessage }: { message: Message, isCurrentUserMessage: boolean }) {

  return (
    <Grid data-testid="textMessageDisplayGrid" container direction="column" style={{ maxWidth: '90%', alignItems: isCurrentUserMessage ? 'flex-end' : 'flex-start' }}>
      <MessageContainer>
        <span data-testid="textMessageDisplay" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
          {message.textMessage}
        </span>
      </MessageContainer>
      {message.inlineButtons != null ? <InlineButtonsDisplay inlineButtons={message.inlineButtons} isCurrentUserMessage={isCurrentUserMessage} /> : null}
    </Grid>
  )
}