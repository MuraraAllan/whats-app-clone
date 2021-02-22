import { useContext } from 'react'

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

export function useChatSessions() {
  const { chatSessions } = useContext(ChatSessionsContext)
  return chatSessions
}


export function useGetChatSession() {
  const chatSessions = useChatSessions()

  const getChatSession = (session_id: ChatSessionType["session_id"], user_id?: User["user_id"]) => {
    const chatSession = Object.values(chatSessions?.sessions ?? []).reduce<ChatSessionType | null>((prev: ChatSessionType | null, session: ChatSessionType) => {
      if (session.session_id === session_id) {
        return session
      }
      return prev
    }, null)
    return chatSession
  }

  return {
    getChatSession,
  }
}

export function useChatSessionsDispatchers() {
  const { addMessage, addMessageWithFile, addMessageWithWebcamPicture, addAudioMessage } = useContext(ChatSessionsContext)
  return { addMessage, addMessageWithFile, addMessageWithWebcamPicture, addAudioMessage }
}

// // on firebird messages should be a collection
// // only message_ids should be present on ChatSession.messages = [{ message_id: '1' }]
// this is 

// export function useChatMessage(session_id: string, message_id: string) {
//   const { getChatSession } = useGetChatSession()
//   // pay attention as getChatSession rerendering, probably better to be left unchecked on useMemo
//   // as we didn't allow editing messages, this is a static value after retrieved
//   // although if we plan to support editing we can just listen to getChatSession on Memo
//   const chatMessage = useMemo(() => {
//     if (session_id != null && message_id != null) {
//       const chatSession = getChatSession(session_id)
//       if (chatSession != null && chatSession.messages != null) {
//         if (chatSession.lastMessage.message_id === message_id) {
//           return chatSession.lastMessage
//         }
//         const message = chatSession.messages.filter(message => message.message_id === message_id) as unknown as Message
//         return message
//       }
//     }
//     return null
//   }, [session_id, message_id])

//   return chatMessage
// }


export function useUserBelongsToSession(session_id: ChatSessionType["session_id"]) {
  const { user } = useUser()
  const user_id = user?.user_id

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