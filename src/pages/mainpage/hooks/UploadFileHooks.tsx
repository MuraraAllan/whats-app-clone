import { useCallback, useContext, useEffect, createRef, useLayoutEffect } from "react";

import { useChatSessions } from ".";
import { useUser } from "shared/hooks";
import { useActiveChatSession } from "./ActiveChatSessionHooks";
import { UploadFileContext } from "pages/mainpage/context/UploadFileContext";



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



// useUploadFile
// should retunr if user is uploading file ( used to display FileUploaderPreview - both for images and documents)
// should return a method for setUploadingFiles
// should return current uploadingFile 
export function useUploadFile() {
  const { activeSession } = useActiveChatSession()
  const { addMessageWithFile, addMessageWithWebcamPicture } = useChatSessions()
  const context = useContext(UploadFileContext)
  const user = useUser()

  if (context == null) {
    throw new Error('missing uploadFileHooks context. check it out')
  }

  const { setUploadingFile, uploadingFile, isTakingPicture, setIsTakingPicture } = context

  const finishUploadingFile = useCallback((message: string | null) => {
    if (activeSession?.session_id == null || uploadingFile == null) {
      return null
    }
    if (isTakingPicture) {
      addMessageWithWebcamPicture({
        session_id: activeSession.session_id,
        textMessage: message,
        picture: uploadingFile,
        user
      })
      setIsTakingPicture(false)
    } else {
      addMessageWithFile({
        session_id: activeSession.session_id,
        textMessage: message,
        file: uploadingFile,
        user
      })
    }
    setUploadingFile(null)
  }, [activeSession, addMessageWithFile, user, uploadingFile, setUploadingFile, addMessageWithWebcamPicture, isTakingPicture])

  return {
    setUploadingFile,
    uploadingFile,
    finishUploadingFile,
    isTakingPicture,
    setIsTakingPicture
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

//useTakeScreenshot 
// should return whether the user is takingPicture or not
// should convert picture into Blob and set uploadingFile 


export function useTakePicture() {
  const { isTakingPicture, setIsTakingPicture, setUploadingFile } = useUploadFile()
  const ctx = useContext(UploadFileContext)
  const { videoRef } = ctx ?? {}

  // need to getUserMedia() so it request permission to use camera
  // set canvas src as the stream running after getUserMedia
  // should export a ref for a canvas ( container in TakePictureWithCam )

  const takePicture = useCallback(() => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.setAttribute('width', '500');
    canvas.setAttribute('height', '500');
    if (context != null && videoRef != null) {
      context.drawImage(videoRef.current, 0, 0, 600, 500)
      var data = canvas.toBlob((blob) => {
        setUploadingFile({
          content: blob,
          name: `WEBCAM_PICTURE_${Math.random() * 3 * Math.random()}`
        })
      }, 'image/png', 1);
      console.log(data)
    }

  }, [videoRef, setUploadingFile])

  useLayoutEffect(() => {
    if (videoRef != null && videoRef.current != null) {
      const asyncGetUserMedia = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        // use any on videoRef so we can splicitly set srcObject
        videoRef.current.srcObject = stream
        videoRef.current?.play()
        return true
      }
      asyncGetUserMedia().then(ret => {
        // console.log('PERMISSION GRANTED', ret)
      }).catch(exc => console.log('PERMISSION DENIED', exc))
    }
  }, [videoRef])

  return {
    isTakingPicture,
    setIsTakingPicture,
    videoRef,
    takePicture
  }
}