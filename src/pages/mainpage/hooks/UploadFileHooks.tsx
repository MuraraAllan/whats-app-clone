import { useCallback, useContext } from "react";

import { useChatSessions } from ".";
import { useUser } from "shared/hooks";
import { useActiveChatSession } from "./ActiveChatSessionHooks";
import { UploadFileContext } from "pages/mainpage/context/UploadFileContext";

// useUploadFile
// should retunr if user is uploading file ( used to display FileUploaderPreview - both for images and documents)
// should return a method for setUploadingFiles
// should return current uploadingFile 
export function useUploadFile() {
  const { activeSession } = useActiveChatSession()
  const { addMessageWithFile } = useChatSessions()
  const context = useContext(UploadFileContext)
  const user = useUser()

  if (context == null) {
    throw new Error('missing uploadFileHooks context. check it out')
  }

  const { isUploadingFile, setIsUploadingFile, setUploadingFile, uploadingFile } = context

  const uploadFile = useCallback(() => {
    if (activeSession?.session_id == null) {
      return null
    }
    addMessageWithFile(activeSession.session_id, "anything works", user)
  }, [activeSession, addMessageWithFile, user])

  return {
    isUploadingFile,
    setUploadingFile,
    setIsUploadingFile,
    uploadingFile,
    uploadFile
  }
}