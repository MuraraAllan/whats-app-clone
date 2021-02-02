import * as React from 'react'
import { User } from './UserContext'

enum InlineButtonsActions {
  REGISTER_NEW_USER
}

interface InlineButtons {
  label: string,
  onClickAction: InlineButtonsActions
}

export default interface Message {
  message_id: string,
  textMessage: string,
  inlineButtons: InlineButtons[],
  user: User
}

export interface ChatSession {
  sessionId: string,
  title: string,
  participantNames: string[],
  messages?: Message[]
  lastMessage?: Message
}

interface ChatSessions {
  sessions: ChatSession[] | []
}

type Action = { type: 'add_message' }
type Dispatch = (action: Action) => void
type ChatSessionProviderProps = { children: React.ReactNode }

// user context will carry reducer actions to add messages into our group chats
// ideally our backend would take care of this functionality, but we want to structure
// minimalist impact and work when adding the tasks 
// we will ignore PrivateChatSessions but we are ready to receive also PrivateChatSessions
// which would share types with GroupChatSessions 

const ChatSessionContext = React.createContext<ChatSessions | null>(null)
const ChatSessionMessageDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
)

function ChatSessionsReducer(state: ChatSessions, action: Action) {
  switch (action.type) {
    case 'add_message': {
      return state
    }
  }
}

function ChatSessionsProvider({ children }: ChatSessionProviderProps) {
  const [state, dispatch] = React.useReducer(ChatSessionsReducer, { sessions: [] })
  return (
    <ChatSessionContext.Provider value={state}>
      <ChatSessionMessageDispatchContext.Provider value={dispatch}>
        {children}
      </ChatSessionMessageDispatchContext.Provider>
    </ChatSessionContext.Provider>
  )
}

export { ChatSessionsProvider }