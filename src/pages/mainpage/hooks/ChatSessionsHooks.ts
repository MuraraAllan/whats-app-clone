import * as React from 'react'
import { User } from 'shared/UserContext'
import { chatSessions } from 'mocks/chatSessions'


interface InlineButtons {
  label: string,
  onClickAction: Function
}

export default interface Message {
  message_id: string,
  textMessage: string,
  inlineButtons: InlineButtons[],
  user: User
}

export interface ChatSession {
  session_id: string,
  title: string,
  participants: User[],
  messages?: Message[]
  lastMessage?: Message
}

interface ChatSessions {
  sessions: ChatSession[] | []
}

type Action = { type: 'add_message', session_id: string }
type Dispatch = (action: Action) => void
type ChatSessionProviderProps = { children: React.ReactNode }

// user context will carry reducer actions to add messages into our group chats
// ideally our backend would take care of this functionality, but we want to structure
// minimalist impact and work when adding the tasks 
// we will ignore PrivateChatSessions but we are ready to receive also PrivateChatSessions
// which would share types with GroupChatSessions 

function ChatSessionsReducer(state: ChatSessions, action: Action) {
  switch (action.type) {
    case 'add_message': {
      console.log('received an action to add message', action.session_id)
      return state
    }
  }
}

function useChatSessions() {
  console.log('form usechatsession hook', chatSessions)
  const [state, dispatch] = React.useReducer(ChatSessionsReducer, { sessions: [] })
  const addMessage = (session_id: string) => dispatch({ type: 'add_message', session_id })
  return { state, addMessage }
}


function useChatSession(session_id: string) {
  const state = useChatSessions()
  console.log('all chats are', state)
  const chatSession = React.useMemo(() => {

  }, [session_id])
}


export { useChatSessions }