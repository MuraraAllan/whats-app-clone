import React, { createRef, Dispatch, MutableRefObject, SetStateAction, useState } from 'react'
import { UploadingFileType } from 'pages/mainpage/hooks/ChatSessionsHooks'

interface UploadingFileController {
  uploadingFile: UploadingFileType | null
  isTakingPicture: boolean | null
  isRecordingAudio: boolean | null
  videoRef: MutableRefObject<HTMLVideoElement | null>
}

export interface UploadFileDispatchers {
  setUploadingFile: Dispatch<SetStateAction<UploadingFileType | null>>
  setIsTakingPicture: Dispatch<SetStateAction<boolean | null>>
  setIsRecordingAudio: Dispatch<SetStateAction<boolean | null>>
}

type UploadFilesControlType = UploadingFileController & UploadFileDispatchers

type ActiveSessionProviderProps = { children: React.ReactNode }

// hold states of possible User Actions on ActiveChatSession (ActiveChatSessionState)
// possible actions are upload audio from microphone, upload picture from webcam
// upload file 
// it alsos share a video reference for TakePictureWithCam to 

export const UploadFileContext = React.createContext<UploadFilesControlType | null>(null)

function UploadFileProvider({ children }: ActiveSessionProviderProps) {

  const [uploadingFile, setUploadingFile] = useState<UploadingFileType | null>(null)
  const [isTakingPicture, setIsTakingPicture] = useState<boolean | null>(null)
  const [isRecordingAudio, setIsRecordingAudio] = useState<boolean | null>(null)
  const videoRef = createRef<HTMLVideoElement>()

  return (
    <UploadFileContext.Provider value={{
      uploadingFile,
      setUploadingFile,
      isTakingPicture,
      setIsTakingPicture,
      videoRef,
      isRecordingAudio,
      setIsRecordingAudio
    }}>
      {children}
    </UploadFileContext.Provider>
  )
}



export { UploadFileProvider }
