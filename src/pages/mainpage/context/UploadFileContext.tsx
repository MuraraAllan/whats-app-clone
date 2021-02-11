import React, { createRef, Dispatch, SetStateAction, useState } from 'react'
import { UploadingFileType } from 'pages/mainpage/hooks/ChatSessionsHooks'

interface UploadingFileController {
  uploadingFile: UploadingFileType | null
  isTakingPicture: boolean | null
  isRecordingAudio: boolean | null
  videoRef: any
}

export interface UploadFileDispatchers {
  setUploadingFile: Dispatch<SetStateAction<UploadingFileType | null>>
  setIsTakingPicture: Dispatch<SetStateAction<boolean | null>>
  setIsRecordingAudio: Dispatch<SetStateAction<boolean | null>>
}

type UploadFilesControlType = UploadingFileController & UploadFileDispatchers

export const UploadFileContext = React.createContext<UploadFilesControlType | null>(null)

type ActiveSessionProviderProps = { children: React.ReactNode }

// hold states of possible User Actions on ActiveChatSession
// possible actions are upload audio from microphone, upload picture from webcam
// upload file 
// it alsos share a video reference for TakePictureWithCam to 

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
