import { useContext, useEffect, useMemo } from 'react'

import { useUser } from 'shared/hooks'
import { User } from 'shared/context/LoggedUserContext'
import { ChatSessionsContext } from '../context/ChatSessionsContext'

export type UploadingFileType = {
  content: Blob | null
  name: string
}

interface InlineButtons {
  label: string,
  onClickAction?: string
}

export interface Message {
  message_id: string,
  textMessage?: string | null,
  inlineButtons?: InlineButtons[],
  file?: UploadingFileType
  picture?: UploadingFileType
  audio?: UploadingFileType
  timeStamp: number,
  user: User
}

// unreadMessages would be the result of storing last time each user opened that chat in an intersection
// so we could retrieve the unreadMessages based on lastTime loggedUser accesssed that message
// we also need a key to filter out the timestamp where the user stopped belonging to some chat session

export interface ChatSessionType {
  session_id: string,
  title: string,
  participants: User[],
  messages?: Message[],
  chatImage?: File,
  unreadMessages: number,
  lastReadTimestamp?: number,
  lastMessage: Message
}

export interface ChatSessions {
  sessions: ChatSessionType[] | []
}

function useChatSessions() {
  const { chatSessions, addMessage, addMessageWithFile, addMessageWithWebcamPicture, addAudioMessage } = useContext(ChatSessionsContext)
  const { user, setIsRegisterFormOpen, isRegisteringFormOpen } = useUser()
  return { chatSessions, addMessage, addMessageWithFile, addMessageWithWebcamPicture, addAudioMessage, user, setIsRegisterFormOpen, isRegisteringFormOpen }
}


function useChatSession(session_id: string) {
  const { chatSessions, user: { user_id } } = useChatSessions()

  const chatSession = useMemo(() => {
    if (chatSessions?.sessions == null || chatSessions?.sessions.length === 0) {
      return null
    }

    const localSession = Object.values(chatSessions.sessions).reduce<ChatSessionType | null>((prev: ChatSessionType | null, session: ChatSessionType) => {
      if (session.session_id === session_id) {
        return session
      }
      return prev
    }, null)

    return localSession
  }, [session_id, chatSessions])

  const userBelongsToSession = useMemo(() => {
    if (session_id == null || user_id == null || chatSession == null) {
      return false
    }

    const belongs = Object.values(chatSession.participants).reduce<boolean>((prev: boolean, participant: User) => {
      if (participant.user_id === user_id) {
        return true
      }
      return prev
    }, false)

    return belongs
  }, [session_id, user_id, chatSession])

  return {
    chatSession,
    userBelongsToSession
  }
}


export { useChatSession, useChatSessions }