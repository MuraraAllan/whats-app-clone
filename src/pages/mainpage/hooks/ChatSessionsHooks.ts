import { useMemo, useContext, useEffect } from 'react'

import { chatSessionsMock } from 'mocks/chatSessions'
import { ChatSessionsContext } from 'pages/mainpage/context/ChatSessionsContext'
import { useUser } from 'shared/hooks'
import { User } from 'shared/context/LoggedUserContext'

interface InlineButtons {
  label: string,
  onClickAction?: Function
}

export interface Message {
  message_id: string,
  textMessage?: string,
  inlineButtons?: InlineButtons[],
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
  lastMessage?: Message
}

export interface ChatSessions {
  sessions: ChatSessionType[] | []
}



function useChatSessions() {
  const { chatSessions, dispatch } = useContext(ChatSessionsContext)
  useEffect(() => {
    if (chatSessionsMock == null || dispatch == null) {
      return
    }
    // this is mimicking a subscription which brings us active chat sessions that this user has
    // firestore should provide which chatSessions user has so we are able to download messagesand check whether or not the user belongs to that chat and the time he leaved

    dispatch({ type: 'update_fetched', state: chatSessionsMock })
  }, [])

  const addMessage = (session_id: string, textMessage: string, user: User) => {
    if (textMessage == null || textMessage === '' || user == null || session_id == null) {
      return
    }
    dispatch({ type: 'add_textMessage', session_id, textMessage, user })
  }

  return { chatSessions, addMessage }
}

function useChatSession(session_id: string) {
  const { user_id } = useUser()
  const { chatSessions } = useChatSessions()

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


export { useChatSessions, useChatSession }
