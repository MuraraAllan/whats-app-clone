import { useMainPage } from "./"

export function useGetActiveChatSession() {
  const { activeChatSession } = useMainPage()
  const getActiveChatSession = (() => activeChatSession)
  return {
    getActiveChatSession,
  }
}

export function useActiveChatSession() {
  const { activeChatSession } = useMainPage()

  return {
    activeChatSession
  }
}


export function useActiveChatSessionMessages() {
  const { activeChatSession } = useActiveChatSession()
  return activeChatSession?.messages
}

export function useUserBelongsToActiveSession() {
  const { activeChatSession } = useActiveChatSession()
  return activeChatSession?.userBelongsToSession
}
