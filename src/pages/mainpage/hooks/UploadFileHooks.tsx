import { useCallback, useContext, useEffect, createRef, useLayoutEffect, useMemo, useState } from "react";

import { useChatSessions } from ".";
import { useActiveChatSession } from "./ActiveChatSessionHooks";
import { UploadFileContext } from "pages/mainpage/context/UploadFileContext";


// this hook is tested by e2e
// useUploadFile computes only a callBack
// the functions used are based on third hooks and already tested
// the interactions with browser will be properly tested on cypress

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
  const { activeSession, user } = useActiveChatSession()
  const { addMessageWithFile, addMessageWithWebcamPicture, addAudioMessage, addMessage, isRegisteringFormOpen } = useChatSessions()
  const context = useContext(UploadFileContext)

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

  // this should be moved into individual peaces to easier move around the code aka own hook
  // doesn't make sense to be in the main context... will keep poluting around 
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
  }, [activeSession, addMessageWithFile, user, uploadingFile, setUploadingFile, addMessageWithWebcamPicture, isTakingPicture, setIsTakingPicture])

  return {
    setUploadingFile,
    uploadingFile,
    finishUploadingFile,
    isTakingPicture,
    setIsTakingPicture,
    isRecordingAudio,
    setIsRecordingAudio,
    addAudioMessage,
    activeSession,
    user,
    addMessage,
    isRegisteringFormOpen
  }
}

export function useUploadFileInput() {
  const inputRef = createRef<HTMLInputElement>()
  const { setUploadingFile, uploadingFile, isTakingPicture } = useUploadFile()

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
    inputRef,
    uploadingFile,
    isTakingPicture
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
  const { isTakingPicture, setIsTakingPicture, setUploadingFile, finishUploadingFile } = useUploadFile()
  const ctx = useContext(UploadFileContext)
  const [hasPermission, setHasPermission] = useState<boolean>(false)
  const { videoRef } = ctx ?? {}

  const takePicture = useCallback(() => {
    if (!hasPermission) {
      return
    }
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
  }, [videoRef, setUploadingFile, hasPermission])

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
        setHasPermission(true)
      }).catch(exc => {
        setIsTakingPicture(false)
        alert("falha ao obeter permissoes de ou ao acessar o dispositivo de video")
      })
    }
  }, [videoRef, setIsTakingPicture])

  return {
    isTakingPicture,
    setIsTakingPicture,
    videoRef,
    takePicture,
    finishUploadingFile
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
    activeSession,
    user
  } = useUploadFile()
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [hasAudioPermission, setHasAudioPermission] = useState<boolean>(false)
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
        setHasAudioPermission(true)
        const mediaRecorder = new MediaRecorder(stream)
        mediaRecorder.start()
        mediaRecorder.onstop = (e: any) => {
          const file = new Blob(chunks, { 'type': 'audio/ogg' })
          const audio = {
            content: file,
            name: `Recording${Math.random() + 4 * Math.random()}`
          }
          if (activeSession != null) {

            addAudioMessage({ session_id: activeSession.session_id, audio, user })
          }
        }
        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data)
        }

        setMediaRecorder(mediaRecorder)
      }).catch(err => {
        alert("falha ao obeter permissoes de ou ao acessar o dispositivo de audio")
        setIsRecordingAudio(false)
      })

      return () => {
        if (isRecordingAudio) {
          mediaRecorder?.stop()
        }
      }

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecordingAudio, addAudioMessage, activeSession, setIsRecordingAudio, user])

  return {
    isRecordingAudio,
    setIsRecordingAudio,
    finishRecordingAudio,
    hasAudioPermission
  }
}