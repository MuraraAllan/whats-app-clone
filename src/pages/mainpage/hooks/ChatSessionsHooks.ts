import React, { useReducer, useMemo, useContext, useEffect } from 'react'
import { User } from 'shared/context/LoggedUserContext'
import { chatSessionsMock } from 'mocks/chatSessions'
import { ActiveSessionContext, ChatSessionContextType } from 'pages/mainpage/context/ActiveSessionContext'

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
  }, [chatSessionsMock])

  const addMessage = (session_id: string) => dispatch({ type: 'add_message', session_id })
  return { chatSessions, addMessage }
}

function useChatSession(session_id: string, user_id?: string) {
  const { chatSessions } = useChatSessions()

  const chatSession = useMemo(() => {
    if (chatSessions?.sessions == null || chatSessions?.sessions.length === 0) {
      return null
    }
    const localSession = Object.values(chatSessions.sessions).reduce<ChatSession | null>((prev: ChatSession | null, session: ChatSession) => {
      if (session.session_id === session_id) {
        return session
      }
      return prev
    }, null)
    return localSession
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
  const context = useContext<ChatSessionContextType | null>(ActiveSessionContext)
  if (context == null) {
    throw new Error('Missing active session context. something wrong')
  }
  const activeSession = context.state
  const setActiveSession = (session_id: string) => {
    Object.values(chatSessions.sessions).forEach(session => {
      if (session.session_id === session_id) {
        context.setActiveSession({ ...session })
      }
    })
  };


  return { activeSession, setActiveSession }
}

export { useChatSessions, useActiveSession, useChatSession }