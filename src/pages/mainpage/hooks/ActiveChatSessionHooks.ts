import { useContext, useMemo } from "react"

import { ActiveChatSessionContext, ChatSessionContextType } from "pages/mainpage/context/ActiveChatSessionContext"
import { useChatSessions } from "pages/mainpage/hooks"
import { User } from 'shared/context/LoggedUserContext'
import { UploadFileContext } from "pages/mainpage/context"


export function useActiveChatSession() {
  const { chatSessions, user } = useChatSessions()
  const { user_id } = user
  const { uploadingFile, isTakingPicture, isRecordingAudio } = useContext(UploadFileContext) ?? {}

  const context = useContext<ChatSessionContextType | null>(ActiveChatSessionContext)
  if (context == null) {
    throw new Error('Missing active session context. something wrong')
  }

  const activeSession = useMemo(() => {
    if (context.state == null || chatSessions == null) {
      return null
    }
    return { ...context.state }
  }, [context.state, chatSessions])

  const setActiveSession = (session_id: string) => {
    if (activeSession?.session_id === session_id || uploadingFile != null || isTakingPicture || isRecordingAudio) {
      return
    }
    Object.values(chatSessions?.sessions ?? []).forEach(session => {
      if (session.session_id === session_id) {
        context.setActiveSession({ ...session })
      }
    })
  };

  const userBelongsToActiveSession = useMemo(() => {
    if (activeSession == null || activeSession.session_id == null || user_id == null) {
      return false
    }

    const belongs = Object.values(activeSession.participants).reduce<boolean>((prev: boolean, participant: User) => {
      if (participant.user_id === user_id) {
        return true
      }
      return prev
    }, false)

    return belongs
  }, [user_id, activeSession])


  return {
    activeSession,
    setActiveSession,
    userBelongsToActiveSession,
    user
  }
}