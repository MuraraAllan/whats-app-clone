import React, { useReducer, useMemo, useContext, useEffect } from 'react'

import { ActiveChatSessionContext, ChatSessionContextType } from 'pages/mainpage/context/ActiveChatSessionContext'
import { chatSessionsMock } from 'mocks/chatSessions'
import { User } from 'shared/context/LoggedUserContext'
import { useUser } from 'shared/hooks'

interface InlineButtons {
  label: string,
  onClickAction?: Function
}

export default interface Message {
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

interface ChatSessions {
  sessions: ChatSessionType[] | []
}

type Action = { type: 'add_message', session_id: string } | { type: 'update_fetched', state: ChatSessionType[] }

// user context will carry reducer actions to add messages into our group chats
// ideally our backend would take care of this functionality, but we want to structure
// minimalist impact and work when adding the tasks 
// we will ignore PrivateChatSessions but we are ready to receive also PrivateChatSessions
// which would share types with GroupChatSessions 

function ChatSessionsReducer(state: ChatSessions, action: Action) {
  switch (action.type) {
    case 'update_fetched': {
      return {
        sessions: [...action.state]
      }
    }
    case 'add_message': {
      console.log('received an action to add message', action.session_id)
      return state
    }
  }
}

function useChatSessions() {
  const [chatSessions, dispatch] = useReducer(ChatSessionsReducer, { sessions: [] })

  useEffect(() => {
    if (chatSessionsMock == null) {
      return
    }
    // this is mimicking a subscription which brings us active chat sessions that this user has
    // backend would provide which chatSessions user has so we are able to download messages
    // and check whether or not the user belongs to that chat and the time he leaved
    dispatch({ type: 'update_fetched', state: chatSessionsMock })
  }, [])

  const addMessage = (session_id: string) => dispatch({ type: 'add_message', session_id })
  return { chatSessions, addMessage }
}

function useChatSession(session_id: string, user_id?: string) {
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

    const belongs = Object.values(chatSessions.sessions).reduce<ChatSessionType | null>((prev: ChatSessionType | null, session: ChatSessionType) => {
      if (session.session_id === session_id) {
        return session
      }
      return prev
    }, null)

    return belongs
  }, [session_id, user_id, chatSession, chatSessions.sessions])

  return {
    chatSession,
    userBelongsToSession
  }
}

function useActiveChatSession() {
  const { chatSessions } = useChatSessions()
  const { user_id } = useUser()
  const context = useContext<ChatSessionContextType | null>(ActiveChatSessionContext)

  if (context == null) {
    throw new Error('Missing active session context. something wrong')
  }

  const activeSession = context.state
  const setActiveSession = (session_id: string) => {
    if (activeSession?.session_id === session_id) {
      return
    }
    Object.values(chatSessions.sessions).forEach(session => {
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


  return { activeSession, setActiveSession, userBelongsToActiveSession }
}

export { useChatSessions, useActiveChatSession, useChatSession }