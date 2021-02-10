import React, { useMemo, Dispatch, SetStateAction } from 'react'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'


import { BorderedContainer, RotatedAttachFile } from 'shared/components'
import InlineButtonsDisplay from './InlineButtonsDisplay'
import { Message, UploadingFileType } from 'pages/mainpage/hooks/ChatSessionsHooks'

const MessageContainer = styled(BorderedContainer)`max-width: 90%; width: initial; overflow: hidden; padding: 10px; margin-bottom: 5px; background-color: #80808066;`

export default function TextMessageDisplay({ message, isCurrentUserMessage, setFilePreview }: { message: Message, isCurrentUserMessage: boolean, setFilePreview: Dispatch<SetStateAction<UploadingFileType | null>> }) {

  // the way messages with files can be displayed is always 
  //   "FILE"  
  //  "fileName"
  // "textMessage"
  // so we are going to render checking if file is present ( a picture is also a file, so distinguish between picture and files and render accordingly)
  // also we check if the message contains inlineButtons so we can render them after the message

  const DisplayFile = useMemo(() => {
    if (message.file != null) {
      const blobSRC = URL.createObjectURL(message.file.content);
      //</a>
      return <a style={{ color: 'inherit', height: 'inherit', width: 'inherit' }} href={blobSRC} download={message.file.name}><RotatedAttachFile width={60} height={60} /></a>
    }
    if (message.picture != null) {
      // later it will be an cloud bucket address
      const blobSRC = URL.createObjectURL(message.picture.content);
      return <img onClick={() => setFilePreview(message.picture ?? null)} alt="" width="150" height="150" src={blobSRC}></img>
    }
    return null
  }, [message.file, message.picture, setFilePreview])

  const fileName = message.file?.name ?? null

  return (
    <Grid data-testid="textMessageDisplayGrid" container direction="column" style={{ maxWidth: '90%', alignItems: isCurrentUserMessage ? 'flex-end' : 'flex-start' }}>
      {message.textMessage != null || DisplayFile != null ? (
        <MessageContainer container direction="column" alignItems="center">
          {DisplayFile != null ?
            (
              <Grid container direction="column" alignContent="center" style={{ textAlign: 'center' }}>
                <BorderedContainer container justify="center" alignItems="center" margin={"auto"}  >
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