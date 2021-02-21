import { useCallback, useContext, useEffect, createRef, useLayoutEffect, useState } from "react";

import { UploadFileContext } from "pages/mainpage/context/UploadFileContext";
import { useMainPageDispatchers } from "./MainPageHooks";

type handleFileUploadProps = Event & {
  target: HTMLInputElement
}

// this hook is tested by e2e
// useUploadFile computes only a callBack
// the functions used are based on third hooks and already tested
// left the current contet of interactions with browser alone 
// test the results of those interactions on cypress
// like ensuring that recording 4 seconds of audio creates a 4 seconds audio file

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
  const { finishMainPageState } = useMainPageDispatchers()

  useEffect(() => {
    if (inputRef != null && inputRef.current != null) {
      async function handleFileUpload(evt: handleFileUploadProps) {
        if (evt.target.files != null) {
          const file = await convertFromFileListToBlob(evt.target.files)
          if (file == null) {
            return null
          }
          finishMainPageState({ file: { content: file?.content, name: file?.name } })
        }
        evt.preventDefault()
      }
      inputRef.current.addEventListener("change", handleFileUpload as any)
    }
  }, [inputRef, finishMainPageState])

  return {
    inputRef,
  }
}


export function useUploadFileDND() {
  const fileDropRef = createRef<HTMLDivElement>()
  const { finishMainPageState } = useMainPageDispatchers()

  useLayoutEffect(() => {
    async function refListner(evt: Event & { dataTransfer: DataTransfer }) {
      const files = evt.dataTransfer.files
      const file = await convertFromFileListToBlob(files)
      if (file == null) {
        return null
      }
      const isImage = evt.dataTransfer.files[0].type === 'image/png' || evt.dataTransfer.files[0].type === 'image/jpg' || evt.dataTransfer.files[0].type === 'image/jpeg'
      if (isImage) {
        finishMainPageState({ picture: { content: file?.content, name: file?.name } })
      } else {
        finishMainPageState({ file: { content: file?.content, name: file?.name } })
      }
      evt.preventDefault()
    }

    function globalListner(e: Event) {
      e.preventDefault()
      return null
    }

    document.addEventListener("dragover", globalListner);
    document.addEventListener('drop', globalListner, false)

    if (fileDropRef != null && fileDropRef.current != null) {
      fileDropRef.current.addEventListener("drop", refListner as any);
    }
    const currentRef = fileDropRef.current
    return () => {
      document.removeEventListener('drop', globalListner)
      if (currentRef != null) {
        currentRef.removeEventListener('drop', refListner as any)
      }

    }
  }, [fileDropRef, finishMainPageState])

  return {
    fileDropRef
  }
}

//useTakePicture 


export function useTakePicture() {
  const ctx = useContext(UploadFileContext)
  const [hasPermission, setHasPermission] = useState<boolean>(false)
  const { finishMainPageState, resetMainPageState } = useMainPageDispatchers()
  const { videoRef } = ctx ?? {}

  const takePicture = useCallback(() => {
    if (hasPermission === false) {
      return
    }

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.setAttribute('width', '500');
    canvas.setAttribute('height', '500');
    if (context != null && videoRef?.current != null) {
      context.drawImage(videoRef.current, 0, 0, 600, 500)
      canvas.toBlob((blob) => {
        finishMainPageState({
          picture: {
            content: blob,
            name: `WEBCAM_PICTURE_${Math.random() * 3 * Math.random()}`
          }
        })
      }, 'image/png', 1);
    }
  }, [videoRef, finishMainPageState, hasPermission])


  useEffect(() => {
    if (videoRef != null && videoRef.current != null) {
      const asyncGetUserMedia = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        // use any on videoRef so we can set srcObject
        if (videoRef != null && videoRef.current != null) {
          videoRef.current.srcObject = stream
          setTimeout(() => {
            videoRef.current?.play()
          }, 1000)
          videoRef.current.style.display = 'block'
        }
        return true
      }
      asyncGetUserMedia().then(ret => {
        setHasPermission(true)
      }).catch(exc => {
        alert("falha ao obeter permissoes de ou ao acessar o dispositivo de video")
      })
    }
  }, [videoRef])

  return {
    videoRef,
    takePicture,
    resetMainPageState
  }
}

// when isRecordingAudio is true, should instanciate the browser asking for MediaRecorder
// should store the recorded contet in chunks  
// should expose a finishRecording() which will bring together the recorded chunks

export function useRecordAudio() {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [hasAudioPermission, setHasAudioPermission] = useState<boolean>(false)
  const { finishMainPageState, resetMainPageState } = useMainPageDispatchers()

  const cancelRecordingAudio = useCallback(() => resetMainPageState(), [resetMainPageState])

  const finishRecordingAudio = useCallback(() => {
    if (mediaRecorder != null) {
      mediaRecorder?.stop()
    }
  }, [mediaRecorder])

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
      const chunks = [] as Blob[]
      setHasAudioPermission(true)
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorder.start()
      mediaRecorder.onstop = (e: Event) => {
        const file = new Blob(chunks, { 'type': 'audio/ogg' })
        const audio = {
          content: file,
          name: `Recording${Math.random() + 4 * Math.random()}`
        }
        finishMainPageState({ audio })
      }

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data)
      }

      setMediaRecorder(mediaRecorder)
    }).catch(err => {
      alert("falha ao obeter permissoes de ou ao acessar o dispositivo de audio")
    })

    return () => {
      if (mediaRecorder?.state !== 'inactive') {
        mediaRecorder?.stop()
      }
    }
  }, [])

  return {
    finishRecordingAudio,
    hasAudioPermission,
    cancelRecordingAudio
  }
}