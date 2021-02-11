import { useCallback, useContext, useEffect, createRef, useLayoutEffect, useMemo, useState } from "react";

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
  const { addMessageWithFile, addMessageWithWebcamPicture, addAudioMessage } = useChatSessions()
  const context = useContext(UploadFileContext)
  const user = useUser()

  if (context == null) {
    throw new Error('missing uploadFileHooks context. check it out')
  }

  const {
    setUploadingFile,
    uploadingFile,
    isTakingPicture,
    setIsTakingPicture,
    setIsRecordingAudio,
    isRecordingAudio
  } = context

  const finishRecordingFile = useCallback((audioChunks: Blob[]) => {
    if (activeSession?.session_id == null || uploadingFile == null) {
      return null
    }
    console.log('should finish recording')
  }, [isRecordingAudio])

  // this should be moved into individual peaces to easier move around the code aka own hook
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
    setIsTakingPicture,
    isRecordingAudio,
    setIsRecordingAudio,
    finishRecordingFile,
    addAudioMessage,
    activeSessionID: activeSession?.session_id,
    user
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

//useTakePicture 
// should return whether the user is takingPicture or not
// should convert picture into Blob and set uploadingFile 

export function useTakePicture() {
  const { isTakingPicture, setIsTakingPicture, setUploadingFile } = useUploadFile()
  const ctx = useContext(UploadFileContext)
  const { videoRef } = ctx ?? {}
  const takePicture = useCallback(() => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.setAttribute('width', '500');
    canvas.setAttribute('height', '500');
    if (context != null && videoRef != null) {
      context.drawImage(videoRef.current, 0, 0, 600, 500)
      canvas.toBlob((blob) => {
        setUploadingFile({
          content: blob,
          name: `WEBCAM_PICTURE_${Math.random() * 3 * Math.random()}`
        })
      }, 'image/png', 1);
    }

  }, [videoRef, setUploadingFile])

  useLayoutEffect(() => {
    if (videoRef != null && videoRef.current != null) {
      const asyncGetUserMedia = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        // use any on videoRef so we can set srcObject
        videoRef.current.srcObject = stream
        videoRef.current?.play()
        return true
      }
      asyncGetUserMedia().then(ret => {
        // console.log('PERMISSION GRANTED', ret)
      }).catch(exc => {
        setIsTakingPicture(false)
        alert("unable to obtain permissions or access video device")
      })
    }
  }, [videoRef, setIsTakingPicture])

  return {
    isTakingPicture,
    setIsTakingPicture,
    videoRef,
    takePicture
  }
}

// when isRecordingAudio is true, should instanciate the browser asking for MediaRecorder
// should store the recorded contet in chunks  
// should expose a finishRecording() which will bring together the recorded chunks

export function useRecordAudio() {
  const {
    isRecordingAudio,
    setIsRecordingAudio,
    addAudioMessage,
    activeSessionID,
    user
  } = useUploadFile()
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)

  const finishRecordingAudio = useCallback(() => {
    if (mediaRecorder != null) {
      mediaRecorder?.stop()
      setIsRecordingAudio(false)
    }
  }, [mediaRecorder, setIsRecordingAudio])

  useLayoutEffect(() => {
    if (isRecordingAudio) {
      navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
        const chunks = [] as Blob[]
        const mediaRecorder = new MediaRecorder(stream)
        mediaRecorder.start()
        mediaRecorder.onstop = (e: any) => {
          console.log(chunks)
          const file = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' })
          const audio = {
            content: file,
            name: `Recording${Math.random() + 4 * Math.random()}`
          }
          if (activeSessionID != null) {
            addAudioMessage({ session_id: activeSessionID, audio, user })
          }
        }
        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data)
        }
        setMediaRecorder(mediaRecorder)
      }).catch(err => {
        alert()
        setIsRecordingAudio(false)
      })
      return () => {
        if (isRecordingAudio) {
          mediaRecorder?.stop()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecordingAudio, addAudioMessage, activeSessionID, setIsRecordingAudio, user])

  return {
    isRecordingAudio,
    setIsRecordingAudio,
    finishRecordingAudio
  }
}