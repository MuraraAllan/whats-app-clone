import { useContext } from "react"
import { ActiveChatSessionContext, ChatSessionContextType } from "../context/ActiveChatSessionContext"

export function useActiveChatSession() {
  const context = useContext<ChatSessionContextType | null>(ActiveChatSessionContext)
  if (context == null) {
    throw new Error('Missing active session context. something wrong')
  }
  const { activeSession, setActiveSession, userBelongsToActiveSession } = context
  return { activeSession, setActiveSession, userBelongsToActiveSession }
}