import { useContext } from "react"
import { MainPageContext } from "../context"

// there are multiple possibilitys of change in the context
// 

export function useMainPage() {
  const { state, activeChatSession, activeSessionId, file } = useContext(MainPageContext)

  return {
    state, activeChatSession, activeSessionId, file
  }
}

export function useGetMainPageState() {
  const { state } = useMainPage()
  return state
}

export function useActiveChatSessionID() {
  const { activeSessionId } = useMainPage()
  return activeSessionId
}

export function useMainPageFile() {
  const { file } = useMainPage()

  return file
}

export function useMainPageDispatchers() {
  const { setActiveChatSession, setMainPageState, finishMainPageState, resetMainPageState, resetActiveChatSession } = useContext(MainPageContext)

  return {
    setActiveChatSession,
    setMainPageState,
    finishMainPageState,
    resetMainPageState,
    resetActiveChatSession
  }
}

