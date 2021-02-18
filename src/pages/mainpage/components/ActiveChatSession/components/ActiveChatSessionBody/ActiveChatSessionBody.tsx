import React, { CSSProperties, useState, useEffect, useMemo } from 'react'
import Grid from '@material-ui/core/Grid'
import PersonIcon from '@material-ui/icons/Person';
import styled from 'styled-components'

import { BorderedContainer, CircleContainer } from 'shared/components'

import { Message, UploadingFileType } from 'pages/mainpage/hooks/ChatSessionsHooks';
import { RegisteringFormVisual } from 'pages/mainpage/forms'
import { TakePictureWithCam, DisplayMessages } from './components/'
import { useGetMainPageState, useUploadFile, useUploadFileDND, } from 'pages/mainpage/hooks'

const FullWidthContainer = styled(BorderedContainer)`max-width: 100%`
const GridPadded = styled(Grid)`padding: 10px;`

// states :
// withFileView (fileView != null render FilePreview )
// displayWebcamTakePicture (takingPicture and notUploadingFile render TakePictureWithCam)
// uploadingFile (render FilePreviewer)
// displayingTextMessage (defaultState will render MessageDisplay)
// registering (will render RegisteringForm)

export default function ActiveChatSessionBody() {
  const { fileDropRef } = useUploadFileDND()
  console.log(1234)
  const { uploadingFile, isTakingPicture, activeSession, user, isRegisteringFormOpen } = useUploadFile()
  const mainPageState = useGetMainPageState()
  console.log('main Page state is', mainPageState)
  const [fileView, setFileView] = useState<UploadingFileType | null>(null)
  // null FileViewer when user switch screens or dispatch some action
  useEffect(() => {
    setFileView(null)
  }, [activeSession, isTakingPicture, uploadingFile])

  const MemoizedChatSessionBody = useMemo(() => {
    console.log('memoized chat session body rerendered ')
    switch (mainPageState) {
      case 'view_message':
        return <DisplayMessages />
      default: throw new Error('Missing PageState')
    }
  }, [mainPageState])

  console.log('memoized chat sesison body', MemoizedChatSessionBody)
  if (activeSession == null) {
    return null
  }

  if (isRegisteringFormOpen) {
    return (<RegisteringFormVisual />)
  }

  // if (fileView != null) {
  //   return (<FileViewer fileView={fileView} setFileView={setFileView} />)
  // }

  if (isTakingPicture && uploadingFile == null) {
    return (<TakePictureWithCam />)
  }

  // if (uploadingFile != null) {
  //   return (<FileViewer />)
  // }

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

  return <DisplayMessages />

}