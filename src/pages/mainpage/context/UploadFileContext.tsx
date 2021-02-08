import React, { Dispatch, SetStateAction, useState } from 'react'

interface UploadingFileController {
  isUploadingFile: boolean | null
  uploadingFile: Blob | null
}

interface Dispatchers {
  setIsUploadingFile: Dispatch<SetStateAction<boolean | null>>
  setUploadingFile: Dispatch<SetStateAction<Blob | null>>
}

type UploadFilesControlType = UploadingFileController & Dispatchers


export const UploadFileContext = React.createContext<UploadFilesControlType | null>(null)

type ActiveSessionProviderProps = { children: React.ReactNode }

// user context will not carry any reducer nor actions
// our backend will propagate all user's chat rooms
function UploadFileProvider({ children }: ActiveSessionProviderProps) {
  const [isUploadingFile, setIsUploadingFile] = useState<boolean | null>(null)
  const [uploadingFile, setUploadingFile] = useState<Blob | null>(null)

  return (
    <UploadFileContext.Provider value={{
      isUploadingFile,
      setIsUploadingFile,
      uploadingFile,
      setUploadingFile
    }}>
      {children}
    </UploadFileContext.Provider>
  )
}



export { UploadFileProvider }
