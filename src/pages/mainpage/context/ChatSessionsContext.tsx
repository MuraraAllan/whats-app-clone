import React, { useEffect, useReducer } from 'react'

import { chatSessionsMock } from 'mocks/chatSessions'
import { ChatSessions, ChatSessionType, Message } from 'pages/mainpage/hooks/ChatSessionsHooks'
import { User } from 'shared/context/LoggedUserContext'



export interface ChatSessionContextType {
  chatSessions: ChatSessions | null,
  addMessage: (session_id: string, textMessage: string, user: User) => void,
  addMessageWithFile: (session_id: string, textMessage: string, user: User) => void

}

type Action = { type: 'add_textMessage', session_id: string, textMessage: string, user: User } | { type: 'update_fetched', state: ChatSessionType[] }

// ChatSessions context will carry reducer actions to add messages into our group chats
// ideally our backend would take care of this functionality, but we want to structure
// minimalist impact and work when adding the tasks 
// we will ignore PrivateChatSessions but we are ready to receive also PrivateChatSessions
// which would share types with GroupChatSessions 

export function ChatSessionsReducer(state: ChatSessions, action: Action) {
  switch (action.type) {
    case 'update_fetched': {
      return {
        sessions: [...action.state]
      }
    }
    case 'add_textMessage': {
      const localMessages = { ...state }
      const newMessage: Message = {
        message_id: `new_message_${(Math.random() + Math.random() * 8).toString()}`,
        textMessage: action.textMessage,
        timeStamp: new Date().getTime(),
        user: action.user
      }
      localMessages.sessions.forEach((session) => {
        if (action.session_id === session.session_id) {
          session.lastMessage = newMessage
          session.messages?.push(newMessage)
        }
      })

      return localMessages
    }
  }
}

export const ChatSessionsContext = React.createContext<ChatSessionContextType>({} as ChatSessionContextType)

type ActiveSessionProviderProps = { children: React.ReactNode }
// user context will not carry any reducer nor actions
// our backend will propagate all user's chat rooms
function ChatSessionsProvider({ children }: ActiveSessionProviderProps) {
  const [chatSessions, dispatch] = useReducer(ChatSessionsReducer, { sessions: [] })
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

  const addMessageWithFile = (session_id: string, textMessage: string, user: User) => {
    if (textMessage == null || textMessage === '' || user == null || session_id == null) {
      return
    }
    dispatch({ type: 'add_textMessage', session_id, textMessage, user })
  }
  return (
    <ChatSessionsContext.Provider value={{ chatSessions, addMessage, addMessageWithFile }}>
      {children}
    </ChatSessionsContext.Provider>
  )
}



export { ChatSessionsProvider }