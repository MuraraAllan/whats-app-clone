import React, { useReducer, useMemo, useState, useEffect } from 'react'
import { User } from 'shared/context/UserContext'
import { chatSessionsMock } from 'mocks/chatSessions'


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

export interface ChatSession {
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
  sessions: ChatSession[] | []
}

type Action = { type: 'add_message', session_id: string } | { type: 'update_fetched', state: ChatSession[] }

// user context will carry reducer actions to add messages into our group chats
// ideally our backend would take care of this functionality, but we want to structure
// minimalist impact and work when adding the tasks 
// we will ignore PrivateChatSessions but we are ready to receive also PrivateChatSessions
// which would share types with GroupChatSessions 

function ChatSessionsReducer(state: ChatSessions, action: Action) {
  switch (action.type) {
    case 'update_fetched': {
      console.log('received an action to update', action.state)
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
    dispatch({ type: 'update_fetched', state: chatSessionsMock })
  }, [chatSessionsMock])

  const addMessage = (session_id: string) => dispatch({ type: 'add_message', session_id })
  return { chatSessions, addMessage }
}

function useChatSession(session_id: string, user_id?: string) {
  const { chatSessions } = useChatSessions()

  const chatSession = useMemo(() => {
    let localSession: ChatSession | null = null
    Object.values(chatSessions.sessions).forEach((session: ChatSession) => {
      if (session.session_id === session_id) {
        localSession = session
      }
    })
    if (localSession == null) {
      return null
    }
    return localSession as ChatSession
  }, [session_id, chatSessions])

  const userBelongsToSession = useMemo(() => {
    let belongs: boolean = false
    if (session_id == null || user_id == null || chatSession == null) {
      return belongs
    }

    Object.values(chatSession.participants).forEach((participant) => {
      if (participant.user_id === user_id) {
        belongs = true
      }
    })
    return belongs
  }, [session_id, user_id, chatSession])

  return {
    chatSession,
    userBelongsToSession
  }
}

function useActiveSession() {
  const { chatSessions } = useChatSessions()
  const [activeSession, setActive] = useState<ChatSession | null>(null)

  const setActiveSession = (session_id: string) => {
    Object.values(chatSessions.sessions).forEach(session => {
      if (session.session_id === session_id) {
        return setActive(session)
      }
    })
  };

  return { activeSession, setActiveSession }
}

export { useChatSessions, useActiveSession, useChatSession }