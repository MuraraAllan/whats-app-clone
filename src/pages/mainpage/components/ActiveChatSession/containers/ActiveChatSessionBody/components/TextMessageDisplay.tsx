import React, { useMemo, Dispatch, SetStateAction } from 'react'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'


import { BorderedContainer, RotatedAttachFile } from 'shared/components'
import InlineButtonsDisplay from './InlineButtonsDisplay'
import { Message, UploadingFileType } from 'pages/mainpage/hooks/ChatSessionsHooks'

const MessageContainer = styled(BorderedContainer)`max-width: 90%; width: initial; overflow: hidden; padding: 10px; background-color: #80808066;`

interface TextMessageDisplayProps {
  message: Message,
  isCurrentUserMessage: boolean,
  setFileView: Dispatch<SetStateAction<UploadingFileType | null>>
}

export default function TextMessageDisplay({ message, isCurrentUserMessage, setFileView }: TextMessageDisplayProps) {
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
      return (
        <a data-testid="TextMessageDisplayFile" style={{ color: 'inherit', height: 'inherit', width: 'inherit' }} href={blobSRC} download={message.file.name}>
          <RotatedAttachFile width={60} height={60} />
        </a>)
    }
    if (message.picture != null) {
      // later it will be an cloud bucket address
      const blobSRC = URL.createObjectURL(message.picture.content);
      return <img data-testid="TextMessageDisplayPicture" onClick={() => setFileView(message?.picture ?? null)} alt="" width="150" height="150" src={blobSRC}></img>
    }
    return null
  }, [message.file, message.picture, setFileView])

  const fileName = message.file?.name ?? null

  return (
    <Grid data-testid="textMessageDisplayGrid" container item xs={12} sm={9} md={10} lg={9} xl={9} direction="column" alignItems={isCurrentUserMessage ? 'flex-end' : 'flex-start'}>
      {message.textMessage != null || DisplayFile != null ? (
        <MessageContainer container direction="column" alignItems="center">
          {DisplayFile != null ?
            (
              <Grid container direction="column" alignContent="center" style={{ textAlign: 'center' }}>
                <BorderedContainer container limitWidth={"200px"} justify="center" alignItems="center" margin={"auto"}  >
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
      {message.inlineButtons != null ? <InlineButtonsDisplay textMessage={message?.textMessage} inlineButtons={message.inlineButtons} isCurrentUserMessage={isCurrentUserMessage} /> : null}
    </Grid>
  )
}