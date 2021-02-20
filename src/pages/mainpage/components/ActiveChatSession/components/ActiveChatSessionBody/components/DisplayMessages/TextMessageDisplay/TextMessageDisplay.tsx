import React, { useMemo } from 'react'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'


import { BorderedContainer, RotatedAttachFile } from 'shared/components'
import InlineButtonsDisplay from './InlineButtonsDisplay'
import { Message } from 'pages/mainpage/hooks/ChatSessionsHooks'
import { useMainPageDispatchers } from 'pages/mainpage/hooks'

interface TextMessageDisplayProps {
  message: Message,
  isCurrentUserMessage: boolean,
}

const MessageContainer = styled(BorderedContainer)`max-width: 90%; width: initial; overflow: hidden; padding: 10px; background-color: #80808066;`

export default function TextMessageDisplay({ message, isCurrentUserMessage }: TextMessageDisplayProps) {
  // the way messages with files can be displayed is always 
  //   "FILE"  
  //  "fileName"
  // "textMessage"
  // so we are going to render checking if file is present ( a picture is also a file, so distinguish between picture and files and render accordingly)
  // also we check if the message contains inlineButtons so we can render them after the message
  const { finishMainPageState } = useMainPageDispatchers()

  const DisplayFile = useMemo(() => {
    if (message.file != null) {
      const blobSRC = URL.createObjectURL(message.file.content);
      return (
        <BorderedContainer container item width="70px" height="70px" justify="center" alignItems="center" margin={"auto"} >
          <a data-testid="TextMessageDisplayFile" style={{ color: 'inherit', width: 'fit-content' }} href={blobSRC} download={message.file.name}>
            <RotatedAttachFile width={90} height={90} />
          </a>
        </BorderedContainer>)
    }
    if (message.picture != null) {
      // later it will be an cloud bucket address
      const blobSRC = URL.createObjectURL(message.picture.content);
      return (
        <BorderedContainer container maxwidth={"200px"} justify="center" alignItems="center" margin={"auto"}  >
          <img data-testid="TextMessageDisplayPicture" onClick={() => finishMainPageState({ picture: message.picture, message_id: message.message_id })} alt="" width="150" height="150" src={blobSRC}></img>
        </BorderedContainer>)
    }
    return null

  }, [message.file, message.picture, finishMainPageState])

  const fileName = message.file?.name ?? null

  return (
    <Grid data-testid={`textMessageDisplayGrid${message.message_id}`} container item xs={12} sm={9} md={10} lg={9} xl={9} direction="column" alignItems={isCurrentUserMessage ? 'flex-end' : 'flex-start'}>
      {message.textMessage != null || DisplayFile != null ? (
        <MessageContainer container direction="column" alignItems="center">
          {DisplayFile != null ?
            (
              <Grid container direction="column" alignContent="center" style={{ textAlign: 'center' }}>
                {DisplayFile}
                <span style={{ marginBottom: '5px', marginTop: '5px' }}>{fileName}</span>
              </Grid>
            )
            : null}
          <span data-testid="textMessageDisplay" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
            {message.textMessage}
          </span>
        </MessageContainer>)
        : null}
      {message.inlineButtons != null ? <InlineButtonsDisplay textMessage={message?.textMessage} inlineButtons={message.inlineButtons} isCurrentUserMessage={isCurrentUserMessage} /> : null}
    </Grid>
  )
}