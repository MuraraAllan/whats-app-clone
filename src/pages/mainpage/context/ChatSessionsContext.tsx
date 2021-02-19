import React, { ReactNode, useCallback, useEffect, useReducer } from 'react'

import { chatSessionsMock } from 'mocks/chatSessions'
import { ChatSessions, ChatSessionType, Message, UploadingFileType } from 'pages/mainpage/hooks/ChatSessionsHooks'
import { User } from 'shared/context/LoggedUserContext'

export interface ChatSessionContextType {
  chatSessions: ChatSessions | null,
  addMessage: ({ session_id, textMessage, user }: AddMessageParams) => void,
  addMessageWithFile: ({ session_id, textMessage, file, user }: AddMessageWithFileParams) => void
  addMessageWithWebcamPicture: ({ session_id, textMessage, picture, user }: AddMessageWithWebcamPictureParams) => void
  addAudioMessage: ({ session_id, audio, user }: AddAudioMessageParams) => void
}

type AddMessageParams = {
  session_id: string,
  textMessage: string | null,
  user: User,
}

interface AddMessageWithFileParams extends AddMessageParams {
  file: UploadingFileType
}

interface AddMessageWithWebcamPictureParams extends AddMessageParams {
  picture: UploadingFileType
}

interface AddAudioMessageParams {
  audio: UploadingFileType
  session_id: string,
  user: User
}

type ActionAddMessage = { type: 'add_textMessage' } & AddMessageParams
type AddAudioMessage = { type: 'add_AudioMessage' } & AddAudioMessageParams
type ActionAddMessageWithFile = { type: 'add_textMessageWithFile' } & AddMessageWithFileParams
type ActionAddMessageWithWebcamPicture = | { type: 'add_textMessageWithWebcamPicture' } & AddMessageWithWebcamPictureParams
type ChatSessionsAction = ActionAddMessage | ActionAddMessageWithFile | ActionAddMessageWithWebcamPicture | AddAudioMessage | { type: 'update_fetched', state: ChatSessionType[] }

// ChatSessions context will carry reducer actions to add messages into our group chats
// ideally our backend would take care of this functionality, but we want to structure
// minimalist impact and work when adding the tasks 
// we will ignore PrivateChatSessions but we are ready to receive also PrivateChatSessions
// which would share types with GroupChatSessions 

export function ChatSessionsReducer(state: ChatSessions, action: ChatSessionsAction) {
  switch (action.type) {
    case 'update_fetched': {
      return {
        sessions: [...action.state]
      }
    }
    case 'add_textMessageWithFile': {
      const localMessages = { ...state }
      const newMessage: Message = {
        message_id: `new_message_${(Math.random() + Math.random() * 8).toString()}`,
        textMessage: action.textMessage,
        timeStamp: new Date().getTime(),
        user: action.user,
        file: action.file
      }
      localMessages.sessions.forEach((session) => {
        if (action.session_id === session.session_id) {
          session.lastMessage = newMessage
          session.messages?.push(newMessage)
        }
      })

      return localMessages
    }
    case 'add_AudioMessage': {
      const localMessages = { ...state }
      const newMessage: Message = {
        message_id: `new_message_${(Math.random() + Math.random() * 8).toString()}`,
        timeStamp: new Date().getTime(),
        user: action.user,
        audio: action.audio
      }
      localMessages.sessions.forEach((session) => {
        if (action.session_id === session.session_id) {
          session.lastMessage = newMessage
          session.messages?.push(newMessage)
        }
      })

      return localMessages
    }
    case 'add_textMessageWithWebcamPicture': {
      const localMessages = { ...state }
      const newMessage: Message = {
        message_id: `new_message_${(Math.random() + Math.random() * 8).toString()}`,
        textMessage: action.textMessage,
        timeStamp: new Date().getTime(),
        user: action.user,
        picture: action.picture
      }
      localMessages.sessions.forEach((session) => {
        if (action.session_id === session.session_id) {
          session.lastMessage = newMessage
          session.messages?.push(newMessage)
        }
      })

      return localMessages
    }
    case 'add_textMessage': {
      const localMessages = { ...state }
      const newMessage: Message = {
        message_id: `new_message_${(Math.random() + Math.random() * 8).toString()}`,
        textMessage: action.textMessage,
        timeStamp: new Date().getTime(),
        user: action.user,
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


type ChatSessionProviderProps = { children: ReactNode }
// user context will not carry any reducer nor actions
// our backend will propagate all user's chat rooms
function ChatSessionsProvider({ children }: ChatSessionProviderProps) {
  // instead of rendering with chatSessionsMock, this should be rendered with userSessions from backend
  const [chatSessions, dispatch] = useReducer(ChatSessionsReducer, { sessions: chatSessionsMock })

  // console.log('chat sessions is', chatSessions)

  const addMessage = useCallback(({ session_id, textMessage, user }: AddMessageParams) => {
    if (textMessage == null || user == null || session_id == null || chatSessions == null) {
      return null
    }
    dispatch({ type: 'add_textMessage', session_id, textMessage, user })
  }, [chatSessions])

  const addMessageWithFile = useCallback(({ session_id, textMessage, file, user }: AddMessageWithFileParams) => {
    if (user == null || session_id == null || file == null || chatSessions == null) {
      return null
    }
    dispatch({ type: 'add_textMessageWithFile', session_id, textMessage, user, file })
  }, [chatSessions])

  const addMessageWithWebcamPicture = useCallback(({ session_id, textMessage, picture, user }: AddMessageWithWebcamPictureParams) => {
    if (textMessage == null || user == null || session_id == null || picture == null || chatSessions == null) {
      return null
    }
    dispatch({ type: 'add_textMessageWithWebcamPicture', session_id, textMessage, user, picture })
  }, [chatSessions])

  const addAudioMessage = useCallback(({ session_id, audio, user }: AddAudioMessageParams) => {
    if (user == null || session_id == null || audio == null || chatSessions == null) {
      return null
    }
    dispatch({ type: 'add_AudioMessage', session_id, user, audio })
  }, [chatSessions])

  return (
    <ChatSessionsContext.Provider value={{ chatSessions, addMessage, addMessageWithFile, addMessageWithWebcamPicture, addAudioMessage }}>
      {children}
    </ChatSessionsContext.Provider>
  )
}

export { ChatSessionsProvider }