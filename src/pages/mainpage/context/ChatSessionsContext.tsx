import React, { Dispatch, useReducer } from 'react'

import { ChatSessions, ChatSessionType, Message } from 'pages/mainpage/hooks/ChatSessionsHooks'
import { User } from 'shared/context/LoggedUserContext'


export interface ChatSessionContextType {
  chatSessions: ChatSessions | null,
  dispatch: Dispatch<Action>

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

  return (
    <ChatSessionsContext.Provider value={{ chatSessions, dispatch }}>
      {children}
    </ChatSessionsContext.Provider>
  )
}



export { ChatSessionsProvider }