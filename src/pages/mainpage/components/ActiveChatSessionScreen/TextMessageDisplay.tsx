import React from 'react'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'

import { BorderedContainer } from 'shared/components'
import Message from 'pages/mainpage/hooks/ChatSessionsHooks'
import InlineButtonsDisplay from './InlineButtonsDisplay'




export default function TextMessageDisplay({ message }: { message: Message }) {
  // message can use 70 % of width 
  // inline buttons can use entire screen for right

  const MessageContainer = styled(BorderedContainer)`max-width: 65%; overflow: hidden; padding: 10px;  background-color: #80808066;`

  return (
    <Grid container direction="column" style={{ maxWidth: '80%' }}>
      <MessageContainer>
        <span style={{ whiteSpace: 'pre-wrap' }}>
          {message.textMessage}
        </span>
      </MessageContainer>
      {message.inlineButtons != null ? <InlineButtonsDisplay inlineButtons={message.inlineButtons} /> : null}
    </Grid>
  )

}