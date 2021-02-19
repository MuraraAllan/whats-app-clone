import React, { CSSProperties, useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import PersonIcon from '@material-ui/icons/Person';
import styled from 'styled-components'

import { BorderedContainer, CircleContainer } from 'shared/components'
import { Message } from 'pages/mainpage/hooks/ChatSessionsHooks';
import { TextMessageDisplay, AudioMessageDisplay } from './'
import { useActiveChatSessionMessages, useUploadFileDND } from 'pages/mainpage/hooks';
import { useUser } from 'shared/hooks';

const FullWidthContainer = styled(BorderedContainer)`max-width: 100%; z-index: 1; position: absolute; min-height:100%;`
const GridPadded = styled(Grid)`padding: 10px;`

// states :
// withFileView (fileView != null render FilePreview )
// displayWebcamTakePicture (takingPicture and notUploadingFile render TakePictureWithCam)
// uploadingFile (render FilePreviewer)
// displayingTextMessage (defaultState will render MessageDisplay)
// registering (will render RegisteringForm)

export default function DisplayMessages() {
  const { fileDropRef } = useUploadFileDND()
  //move into useGetActiveChatMessages
  const messages = useActiveChatSessionMessages()
  const { user } = useUser()

  if (messages == null) {
    return null
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



  //DISPLAY MESSAGES : pass message id down instead of passing 
  return <FullWidthContainer data-testid="ActiveChatSessionBodyMessages" ref={fileDropRef} container item direction="column" xs={12} sm={12} md={12} lg={12} xl={12}>
    {messages?.map((message, index) => {
      const isCurrentUserMessage = message.user.user_id === user.user_id
      return (
        <GridPadded key={index} container direction="row" justify={isCurrentUserMessage === true ? "flex-end" : "flex-start"} >
          {isCurrentUserMessage === false ? <UserAvatarWithName message={message} /> : null}
          {message.audio != null ?
            (<AudioMessageDisplay message={message} isCurrentUserMessage={isCurrentUserMessage} />) :
            (<TextMessageDisplay setFileView={() => null} message={message} isCurrentUserMessage={isCurrentUserMessage} />)}
        </GridPadded>
      )
    })}
  </FullWidthContainer>
}