import React, { Dispatch, SetStateAction, useState } from 'react'
import { UploadingFileType } from 'pages/mainpage/hooks/ChatSessionsHooks'

interface UploadingFileController {
  uploadingFile: UploadingFileType | null
}

interface Dispatchers {
  setUploadingFile: Dispatch<SetStateAction<UploadingFileType | null>>
}

type UploadFilesControlType = UploadingFileController & Dispatchers


export const UploadFileContext = React.createContext<UploadFilesControlType | null>(null)

type ActiveSessionProviderProps = { children: React.ReactNode }

// user context will not carry any reducer nor actions
// our backend will propagate all user's chat rooms
function UploadFileProvider({ children }: ActiveSessionProviderProps) {
  const [uploadingFile, setUploadingFile] = useState<UploadingFileType | null>(null)

  return (
    <UploadFileContext.Provider value={{
      uploadingFile,
      setUploadingFile
    }}>
      {children}
    </UploadFileContext.Provider>
  )
}



export { UploadFileProvider }
