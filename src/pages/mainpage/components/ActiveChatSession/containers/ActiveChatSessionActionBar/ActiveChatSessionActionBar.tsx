import React from 'react'

import { DefaultActionBar, FileUploadLabelActionBar, TakingPictureActionBar, RecordAudioActionBar, RegisteringFormActionBar } from './components'
import { useActiveChatSession, useUploadFile } from 'pages/mainpage/hooks'

// states :
// isRecordingAudio should Render RecordAudioActionBar
// isPreviweingWebcamPicture (isTakingPicture && uploadingFile == null Render SingleButtonActionBar)
// isUploadingFile (uploadingFile != null should render FileUploadLabelActionBar) 
// isSendingTextMessageOrViewingFile
// isRegistering

export default function ActiveChatSessionActionBar() {
  const { userBelongsToActiveSession, isRegisteringFormOpen } = useActiveChatSession()
  const { uploadingFile, isTakingPicture, isRecordingAudio } = useUploadFile()

  //does'nt render an action bar if the user doesnt belong to that chat session
  if (userBelongsToActiveSession === false) {
    return (
      <div data-testid="activeChatSessionActionBarBlocked" style={{ width: '100%', height: '100%', backgroundColor: '#80808066' }} />
    )
  }
  // should render defaultActionBar when isSendingFile is false
  // should render sendFilesActionBar when isSendingFile is true
  // should render SingleButtonActionBar when isTakingPicture is true
  // should render audioActionBar when isSendingAudio is true
  // should render SingleButtonActionBar when isRegistering is true
  if (isRecordingAudio) {
    return (<RecordAudioActionBar />)
  }

  if (isRegisteringFormOpen) {
    return (<RegisteringFormActionBar />)
  }

  // render both SingleButtonActionBar for   
  if (isTakingPicture && uploadingFile == null) {
    return (<TakingPictureActionBar />)
  }

  if (uploadingFile != null) {
    return (
      <FileUploadLabelActionBar />
    )
  }

  return (
    <DefaultActionBar />
  )
}