import { useCallback, useContext, useMemo } from 'react'

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

type MessageBody = {
  message_id: string,
  timeStamp: number,
  user: User
}

type AudioMessage = MessageBody & { audio?: UploadingFileType }

type TextMessage = MessageBody & {
  textMessage?: string | null,
  inlineButtons?: InlineButtons[],
  file?: UploadingFileType
  picture?: UploadingFileType
}
export type Message = AudioMessage & TextMessage

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

// function useChatSessions() {
//   const { chatSessions, addMessage, addMessageWithFile, addMessageWithWebcamPicture, addAudioMessage } = useContext(ChatSessionsContext)
//   const { user, setIsRegisterFormOpen, isRegisteringFormOpen } = useUser()
//   return { chatSessions, addMessage, addMessageWithFile, addMessageWithWebcamPicture, addAudioMessage, user, setIsRegisterFormOpen, isRegisteringFormOpen }
// }



// function useChatSession(session_id: string) {
//   const { chatSessions, user: { user_id } } = useChatSessions()

//   const chatSession = useMemo(() => {
//     if (chatSessions?.sessions == null || chatSessions?.sessions.length === 0) {
//       return null
//     }

//     const localSession = Object.values(chatSessions.sessions).reduce<ChatSessionType | null>((prev: ChatSessionType | null, session: ChatSessionType) => {
//       if (session.session_id === session_id) {
//         return session
//       }
//       return prev
//     }, null)

//     return localSession
//   }, [session_id, chatSessions])

//   const userBelongsToSession = useMemo(() => {
//     if (session_id == null || user_id == null || chatSession == null) {
//       return false
//     }

//     const belongs = Object.values(chatSession.participants).reduce<boolean>((prev: boolean, participant: User) => {
//       if (participant.user_id === user_id) {
//         return true
//       }
//       return prev
//     }, false)

//     return belongs
//   }, [session_id, user_id, chatSession])


//   return {
//     chatSession,
//     userBelongsToSession
//   }
// }


export function useChatSessions() {
  const { chatSessions } = useContext(ChatSessionsContext)
  console.log('uise chat sessions hooks rerendering', chatSessions)
  return chatSessions
}


export function useGetChatSession() {
  const chatSessions = useChatSessions()
  // maybe here would be better to grab session id and pre find the desired chatSession
  // then we can deep check propertys on the specific chat session if necessary
  console.log('chat sessions is on GETY CHATR sessiuon', chatSessions)
  // try without, although better a deepEquality check on chatSessions.messages to avoid rerendering  
  const getChatSession = useCallback((session_id: ChatSessionType["session_id"], user_id?: User["user_id"]) => {
    console.log('USE GET CHAT SESISON', chatSessions)
    const chatSession = Object.values(chatSessions?.sessions ?? []).reduce<ChatSessionType | null>((prev: ChatSessionType | null, session: ChatSessionType) => {
      if (session.session_id === session_id) {
        return session
      }
      return prev
    }, null)
    console.log('THE CHAT SESSION ISS', chatSession)
    return chatSession
  }, [chatSessions?.sessions])

  return {
    getChatSession,
  }
}

export function useChatSessionsDispatchers() {
  const { addMessage, addMessageWithFile, addMessageWithWebcamPicture, addAudioMessage } = useContext(ChatSessionsContext)
  return { addMessage, addMessageWithFile, addMessageWithWebcamPicture, addAudioMessage }
}

// on firebird messages should be a collection
// only message_ids should be present on ChatSession.messages = [{ message_id: '1' }]

export function useChatMessage(session_id: string, message_id: string) {
  const { getChatSession } = useGetChatSession()
  // pay attention as getChatSession rerendering, probably better to be left unchecked on useMemo
  // as we didn't allow editing messages, this is a static value after retrieved
  // although if we plan to support editing we can just listen to getChatSession on Memo
  const chatMessage = useMemo(() => {
    // console.log('rerendering mem of useChatMessage')
    if (session_id != null && message_id != null) {
      const chatSession = getChatSession(session_id)
      if (chatSession != null && chatSession.messages != null) {
        if (chatSession.lastMessage.message_id === message_id) {
          console.log('the message is last message', chatSession.lastMessage)
          return chatSession.lastMessage
        }
        const message = chatSession.messages.filter(message => message.message_id === message_id)
        console.log('the message is', message)
        return message
      }
    }
    return null
  }, [session_id, message_id])

  return { message: chatMessage }
}


export function useUserBelongsToSession(session_id: ChatSessionType["session_id"]) {
  const { user: { user_id } } = useUser()
  const { getChatSession } = useGetChatSession()
  const chatSession = getChatSession(session_id)
  if (chatSession == null) {
    return false
  }
  return Object.values(chatSession.participants).reduce<boolean>((prev: boolean, participant: User) => {
    if (participant.user_id === user_id) {
      return true
    }
    return prev
  }, false)
}