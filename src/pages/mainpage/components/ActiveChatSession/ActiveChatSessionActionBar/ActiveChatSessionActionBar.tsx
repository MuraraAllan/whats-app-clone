import React from 'react'

import { DefaultActionBar, FileUploadLabelActionBar, UploadPictureActionBar, RecordAudioActionBar, RegisteringFormActionBar } from './components'
import { useActiveChatSession, useUploadFile } from 'pages/mainpage/hooks'

// states :
// isRecordingAudio should Render RecordAudioActionBar
// isPreviweingWebcamPicture (isTakingPicture && uploadingFile == null Render SingleButtonActionBar)
// isUploadingFile (uploadingFile != null should render FileUploadLabelActionBar) 
// isSendingTextMessageOrViewingFile should render DefaultActionBar
// isRegistering should render RegisteringFormActionBar

export default function ActiveChatSessionActionBar() {
  const { userBelongsToActiveSession, isRegisteringFormOpen } = useActiveChatSession()
  const { uploadingFile, isTakingPicture, isRecordingAudio } = useUploadFile()

  //does'nt render an action bar if the user doesnt belong to that chat session
  if (userBelongsToActiveSession === false) {
    return (
      <div data-testid="activeChatSessionActionBarBlocked" style={{ width: '100%', height: '100%', backgroundColor: '#80808066' }} />
    )
  }

  if (isRecordingAudio) {
    return (<RecordAudioActionBar />)
  }

  if (isRegisteringFormOpen) {
    return (<RegisteringFormActionBar />)
  }

  // render both SingleButtonActionBar for   
  if (isTakingPicture && uploadingFile == null) {
    return (<UploadPictureActionBar />)
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