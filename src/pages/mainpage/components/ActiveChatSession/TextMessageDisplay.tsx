import React from 'react'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'

import { BorderedContainer } from 'shared/components'
import Message from 'pages/mainpage/hooks/ChatSessionsHooks'
import InlineButtonsDisplay from './InlineButtonsDisplay'

const MessageContainer = styled(BorderedContainer)`max-width: 65%; overflow: hidden; padding: 10px;  background-color: #80808066;`

export default function TextMessageDisplay({ message }: { message: Message }) {

  return (
    <Grid container direction="column" style={{ maxWidth: '80%' }}>
      <MessageContainer>
        <span data-testid="textMessageDisplay" style={{ whiteSpace: 'pre-wrap' }}>
          {message.textMessage}
        </span>
      </MessageContainer>
      {message.inlineButtons != null ? <InlineButtonsDisplay inlineButtons={message.inlineButtons} /> : null}
    </Grid>
  )
}