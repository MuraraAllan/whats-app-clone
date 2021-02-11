import React, { CSSProperties, useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import PersonIcon from '@material-ui/icons/Person';

import { BorderedContainer, CircleContainer } from 'shared/components'
import FilePreviewer from './components/FilePreviewer';
import { InlineButtonsDisplay, TakePictureWithCam, TextMessageDisplay, AudioMessageDisplay } from './components'
import { Message, UploadingFileType } from 'pages/mainpage/hooks/ChatSessionsHooks';
import { useActiveChatSession, useUploadFile, useUploadFileDND, } from 'pages/mainpage/hooks'
import { useUser } from 'shared/hooks';

const FullWidthContainer = styled(BorderedContainer)`max-width: 100%`
const GridPadded = styled(Grid)`padding: 10px;`


// control whether 
export default function ActiveChatSessionBody() {
  const { activeSession } = useActiveChatSession()
  const { fileDropRef } = useUploadFileDND()
  const { uploadingFile, isTakingPicture } = useUploadFile()
  const user = useUser()
  const [filePreview, setFilePreview] = useState<UploadingFileType | null>(null)

  useEffect(() => {
    setFilePreview(null)
  }, [activeSession, isTakingPicture, uploadingFile])

  if (activeSession == null) {
    return null
  }

  if (filePreview != null) {
    return (<FilePreviewer filePreview={filePreview} setFilePreview={setFilePreview} />)
  }

  // should render takePicture 
  if (isTakingPicture && uploadingFile == null) {
    return (<TakePictureWithCam />)
  }

  // should render FilePreview if uploadingFile != null
  if (uploadingFile != null) {
    return (<FilePreviewer />)
  }

  // align gridPadded to the flex-end when message.user === loggedUser
  const UserAvatarWithName = ({ message, style }: { message: Message, style?: CSSProperties }) => (
    <CircleContainer style={style} container wrap="nowrap" direction="column" width={55} height={55}>
      <PersonIcon viewBox="0 0 24 14" style={{ width: '70%', height: '70%' }} />
      <span style={{ marginBottom: '10px' }}>{message.user.userName}</span>
    </CircleContainer>
  )

  // message can use 70 % of width 
  // inline buttons can use entire screen 

  // should render DisplayMessages when 
  // iterate over all messages;   

  return <FullWidthContainer ref={fileDropRef} container item direction="column" xs={12} sm={12} md={12} lg={12} xl={12}>
    {activeSession?.messages?.map((message, index) => {
      const isCurrentUserMessage = message.user.user_id === user.user_id
      return (
        <GridPadded key={index} container direction="row" justify={isCurrentUserMessage === true ? "flex-end" : "flex-start"} >
          {isCurrentUserMessage === false ? <UserAvatarWithName message={message} /> : null}
          {message.audio != null ?
            (<AudioMessageDisplay message={message} isCurrentUserMessage={isCurrentUserMessage} />) :
            (<TextMessageDisplay setFilePreview={setFilePreview} message={message} isCurrentUserMessage={isCurrentUserMessage} />)}
        </GridPadded>
      )
    })}
  </FullWidthContainer>
}