import React, { useMemo } from 'react'

import { DefaultActionBar, FileUploadLabelActionBar, RecordAudioActionBar, RegisteringFormActionBar } from './components'
import { useGetMainPageState } from 'pages/mainpage/hooks'
import { useUserBelongsToActiveSession } from 'pages/mainpage/hooks/ActiveChatSessionHooks'
import TakePictureActionBar from './components/TakePictureActionBar'


export default function ActiveChatSessionActionBar() {
  const userBelongsToActiveSession = useUserBelongsToActiveSession()
  const appState = useGetMainPageState()

  const MemoizedActionBar = useMemo(() => {
    if (userBelongsToActiveSession === false) {
      return (
        <div data-testid="activeChatSessionActionBarBlocked" style={{ width: '100%', height: '100%', backgroundColor: '#80808066' }} />
      )
    }

    switch (appState) {
      case "view_message":
        return <DefaultActionBar />
      case "register_form":
        return <RegisteringFormActionBar />
      case "view_message_picture":
        return <DefaultActionBar />
      case "record_audio":
        return <RecordAudioActionBar />
      case "preview_file_upload":
        return <FileUploadLabelActionBar />
      case "take_webcam_picture":
        return <TakePictureActionBar />
      case "preview_uploading_webcam":
        return <FileUploadLabelActionBar />
    }
    return null
  }, [appState, userBelongsToActiveSession])


  return MemoizedActionBar
}