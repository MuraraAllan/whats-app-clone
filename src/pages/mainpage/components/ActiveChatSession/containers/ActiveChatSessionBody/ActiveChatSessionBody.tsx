import React, { CSSProperties } from 'react'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import PersonIcon from '@material-ui/icons/Person';

import { CircleContainer } from 'shared/components'
import { Message } from 'pages/mainpage/hooks/ChatSessionsHooks';
import { TextMessageDisplay, InlineButtonsDisplay } from './components'
import { useActiveChatSession, useUploadFile } from 'pages/mainpage/hooks'
import { useUser } from 'shared/hooks';
import FileUploaderPreview from './components/FileUploaderPreview';

const GridPadded = styled(Grid)`padding: 10px;`
export default function ActiveChatSessionBody() {
  const { activeSession } = useActiveChatSession()
  const { uploadingFile, isUploadingFile } = useUploadFile()
  const user = useUser()

  if (activeSession == null) {
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


  // should render FilePreview if uploadingFile != null
  if (uploadingFile != null || isUploadingFile) {
    return (<FileUploaderPreview />)
  }

  // should render DisplayMessages when 
  // iterate over all messages;   
  // render textMessagethe and inlineButtons if present
  // render inlineButtons if present
  // when we implement sendAudio we should look for the presence in Message Object
  // and return it before rendering textMessages, side-effect is messages audio will not join the message loop 
  // this logic needs to be wrapped in a test that expects that container follows its logical behavior



  return <>
    {activeSession?.messages?.map((message, index) => {
      if (message.textMessage != null) {
        const isCurrentUserMessage = message.user.user_id === user.user_id
        return (
          <GridPadded key={index} container direction="row" justify={isCurrentUserMessage === true ? "flex-end" : "flex-start"} >
            {isCurrentUserMessage === false ? <UserAvatarWithName message={message} /> : null}
            <TextMessageDisplay message={message} isCurrentUserMessage={isCurrentUserMessage} />
          </GridPadded>
        )
      }
      if (message.inlineButtons != null) {
        const isCurrentUserMessage = message.user.user_id === user.user_id
        return (
          <GridPadded key={index} container direction="row" justify={isCurrentUserMessage === true ? "flex-end" : "flex-start"}>
            {isCurrentUserMessage === false ? <UserAvatarWithName message={message} style={{ marginRight: '4px' }} /> : null}
            <InlineButtonsDisplay inlineButtons={message.inlineButtons} isCurrentUserMessage={isCurrentUserMessage} />
          </GridPadded>
        )
      }

      return <div></div>
    })}
  </>
}