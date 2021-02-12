import { createRef, RefObject, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { AudioPlayer } from "../../ActiveChatSessionBody/components"

export function useAudioPlayerHook() {
  let audioRef = useRef<HTMLAudioElement>() as RefObject<HTMLVideoElement>
  const [currentTime, setCurrentTime] = useState<number | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const progress = useMemo(() => {
    if (currentTime != null && duration != null) {
      const sum = currentTime / duration
      if (sum === 1) {
        setCurrentTime(0)
        return null
      }
      return sum * 100
    }
    return 0
  }, [duration, currentTime])

  useEffect(() => {

    function addLoadedDataChangeEvent(ev: any) {
      if (audioRef.current?.duration === Infinity && audioRef.current != null) {
        // set it to bigger than the actual duration
        audioRef.current.currentTime = 9999;

        audioRef.current.ontimeupdate = function () {
          if (audioRef.current != null) {
            // if hook not started yet
            if (duration == null) {
              this.ontimeupdate = () => {
                return;
              }
              if (audioRef.current != null) {
                // audioRef.current.currentTime = 0;
                audioRef.current.currentTime = 0;
                setDuration(audioRef.current?.duration)
                setCurrentTime(0)
              }
            }

          }
        }
      }
    }

    function timeUpdateEventHandler() {
      if (audioRef.current != null) {
        setCurrentTime(audioRef.current?.currentTime)
      }
    }

    if (audioRef.current != null) {
      // DOM listeners: update React state on DOM events
      audioRef.current.addEventListener("loadeddata", addLoadedDataChangeEvent);
      audioRef.current.addEventListener("timeupdate", timeUpdateEventHandler);
    }

    return () => {
      if (audioRef.current != null) {
        audioRef.current.removeEventListener('loadeddata', addLoadedDataChangeEvent)
      }
    }
  }, [audioRef, setCurrentTime, duration])

  return {
    progress,
    duration,
    currentTime,
    audioRef
  }
}