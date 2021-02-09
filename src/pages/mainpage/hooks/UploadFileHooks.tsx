import { useCallback, useContext, useEffect, createRef } from "react";

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

  const { setUploadingFile, uploadingFile } = context

  const finishUploadingFile = useCallback((message?: string) => {
    if (activeSession?.session_id == null || uploadingFile == null) {
      return null
    }
    addMessageWithFile(activeSession.session_id, message ?? '', uploadingFile, user)
    setUploadingFile(null)
  }, [activeSession, addMessageWithFile, user, uploadingFile, setUploadingFile])

  return {
    setUploadingFile,
    uploadingFile,
    finishUploadingFile
  }
}

async function convertFromFileListToBlob(files: FileList) {
  if (files == null || files.item == null || files.length > 1) {
    return null
  }

  const file = files.item(0)
  if (file == null) {
    return null
  }

  const blob = await file.slice(0, file.size, file.type)

  return {
    content: blob,
    name: file.name
  }
}

export function useUploadFileInput() {
  const inputRef = createRef<HTMLInputElement>()
  const { setUploadingFile } = useUploadFile()

  useEffect(() => {
    if (inputRef != null && inputRef.current != null) {
      async function handleFileUpload(evt: any) {
        const file = await convertFromFileListToBlob(evt.target.files)
        if (file == null) {
          return null
        }
        setUploadingFile({ content: file?.content, name: file?.name })
        evt.preventDefault()
      }

      inputRef.current.addEventListener("change", handleFileUpload)
    }
  }, [inputRef, setUploadingFile])

  return {
    inputRef
  }
}


export function useUploadFileDND() {
  const fileDropRef = createRef<HTMLDivElement>()
  const { setUploadingFile } = useUploadFile()

  useEffect(() => {
    async function refListner(evt: any) {
      const files = evt.dataTransfer.files
      const file = await convertFromFileListToBlob(files)
      if (file == null) {
        return null
      }
      setUploadingFile({ content: file?.content, name: file?.name })
      evt.preventDefault()
    }

    function globalListner(e: any) {
      e.preventDefault()
      return null
    }

    document.addEventListener('drop', globalListner, false)

    if (fileDropRef != null && fileDropRef.current != null) {
      fileDropRef.current.addEventListener("drop", refListner);
    }
    return () => {
      document.removeEventListener('drop', globalListner)
      document.removeEventListener('drop', refListner)
    }
  }, [fileDropRef, setUploadingFile])

  return {
    fileDropRef
  }
}