import React, { createRef, MutableRefObject } from 'react'

interface UploadingFileController {
  videoRef: MutableRefObject<HTMLVideoElement | null>
}

type UploadFilesControlType = UploadingFileController

type ActiveSessionProviderProps = { children: React.ReactNode }

// hold states of possible User Actions on ActiveChatSession (ActiveChatSessionState)
// possible actions are upload audio from microphone, upload picture from webcam
// upload file 
// it alsos share a video reference for TakePictureWithCam to 

export const UploadFileContext = React.createContext<UploadFilesControlType | null>(null)

function UploadFileProvider({ children }: ActiveSessionProviderProps) {

  const videoRef = createRef<HTMLVideoElement>()

  return (
    <UploadFileContext.Provider value={{
      videoRef,
    }}>
      {children}
    </UploadFileContext.Provider>
  )
}



export { UploadFileProvider }
