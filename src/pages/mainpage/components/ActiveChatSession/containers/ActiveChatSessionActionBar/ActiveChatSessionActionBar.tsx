import React from 'react'

import { DefaultActionBar, FileUploadLabelActionBar } from './'
import { useActiveChatSession, useUploadFile } from 'pages/mainpage/hooks'


export default function ActiveChatSessionActionBar() {
  const { userBelongsToActiveSession } = useActiveChatSession()
  const { uploadingFile } = useUploadFile()

  //does'nt render an action bar if the user doesnt belong to that chat session
  if (userBelongsToActiveSession === false) {
    return (
      <div data-testid="activeChatSessionActionBarBlocked" style={{ width: '100%', height: '100%', backgroundColor: '#80808066' }} />
    )
  }
  // should render defaultActionBar when isSendingFile is false
  // should render sendFilesActionBar when isSendingFile is true
  // should render audioActionBar when isSendingAudio is true
  // should render formActionbar when isRegistering is true
  if (uploadingFile != null) {
    return (
      <FileUploadLabelActionBar />
    )
  }
  return (
    <DefaultActionBar />
  )
}