import React, { createRef, Dispatch, MutableRefObject, SetStateAction, useState } from 'react'
import { UploadingFileType } from 'pages/mainpage/hooks/ChatSessionsHooks'

interface UploadingFileController {
  uploadingFile: UploadingFileType | null
  videoRef: MutableRefObject<HTMLVideoElement | null>
}

export interface UploadFileDispatchers {
  setUploadingFile: Dispatch<SetStateAction<UploadingFileType | null>>

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
  const videoRef = createRef<HTMLVideoElement>()

  return (
    <UploadFileContext.Provider value={{
      uploadingFile,
      setUploadingFile,
      videoRef,

    }}>
      {children}
    </UploadFileContext.Provider>
  )
}



export { UploadFileProvider }
