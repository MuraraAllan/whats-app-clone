import React, { createRef, Dispatch, SetStateAction, useState } from 'react'
import { UploadingFileType } from 'pages/mainpage/hooks/ChatSessionsHooks'

interface UploadingFileController {
  uploadingFile: UploadingFileType | null
  isTakingPicture: boolean | null
  isRecordingAudio: boolean | null
  videoRef: any
}

interface Dispatchers {
  setUploadingFile: Dispatch<SetStateAction<UploadingFileType | null>>
  setIsTakingPicture: Dispatch<SetStateAction<boolean | null>>
  setIsRecordingAudio: Dispatch<SetStateAction<boolean | null>>
}

type UploadFilesControlType = UploadingFileController & Dispatchers

export const UploadFileContext = React.createContext<UploadFilesControlType | null>(null)

type ActiveSessionProviderProps = { children: React.ReactNode }

// user context will not carry any reducer nor actions
// our backend will propagate all user's chat rooms
function UploadFileProvider({ children }: ActiveSessionProviderProps) {

  const [uploadingFile, setUploadingFile] = useState<UploadingFileType | null>(null)
  const [isTakingPicture, setIsTakingPicture] = useState<boolean | null>(null)
  const [isRecordingAudio, setIsRecordingAudio] = useState<boolean | null>(null)
  const videoRef = createRef<any>()

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
