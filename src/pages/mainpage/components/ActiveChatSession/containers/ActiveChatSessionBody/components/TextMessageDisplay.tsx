import React, { useMemo } from 'react'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'


import { BorderedContainer, RotatedAttachFile } from 'shared/components'
import InlineButtonsDisplay from './InlineButtonsDisplay'
import { Message } from 'pages/mainpage/hooks/ChatSessionsHooks'

const MessageContainer = styled(BorderedContainer)`max-width: 90%; width: initial; overflow: hidden; padding: 10px; margin-bottom: 5px; background-color: #80808066;`

export default function TextMessageDisplay({ message, isCurrentUserMessage }: { message: Message, isCurrentUserMessage: boolean }) {

  // the way messages with files can be displayed is always 
  //   "FILE"  
  //  "fileName"
  // "textMessage"
  // so we are going to render checking if file is present ( a picture is also a file, so distinguish between picture and files and render accordingly)
  // also we check if the message contains inlineButtons so we can render them after the message

  const DisplayFile = useMemo(() => {
    if (message.file != null) {
      return <RotatedAttachFile width={60} height={60} />
    }
    if (message.picture != null) {
      // later it will be an cloud bucket address
      const blobSRC = URL.createObjectURL(message.picture.content);
      return <img alt="" src={blobSRC}></img>
    }
    return null
  }, [message.file, message.picture])

  const fileName = message.file?.name ?? message.picture?.name ?? 'noname'

  return (
    <Grid data-testid="textMessageDisplayGrid" container direction="column" style={{ maxWidth: '90%', alignItems: isCurrentUserMessage ? 'flex-end' : 'flex-start' }}>
      {message.textMessage != null || DisplayFile != null ? (
        <MessageContainer container direction="column" alignItems="center">
          {DisplayFile != null ?
            (
              <Grid container direction="column" alignContent="center">
                <BorderedContainer container justify="center" alignItems="center" margin={"auto"} width={'60px'} height={'60px'} >
                  {DisplayFile}
                </BorderedContainer>
                <span style={{ marginBottom: '5px' }}>{fileName}</span>
              </Grid>
            )
            : null}
          <span data-testid="textMessageDisplay" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
            {message.textMessage}
          </span>
        </MessageContainer>)
        : null}
      {message.inlineButtons != null ? <InlineButtonsDisplay inlineButtons={message.inlineButtons} isCurrentUserMessage={isCurrentUserMessage} /> : null}
    </Grid>
  )
}