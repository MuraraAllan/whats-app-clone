import { useCallback, useContext } from "react"
import { MainPageContext } from "../context"

// there are multiple possibilitys of change in the context
// 

export function useMainPage() {
  const { state, activeChatSession, activeSessionId, file } = useContext(MainPageContext)
  console.log('useGetMainPage rerendering >>>', state)
  console.log('useGetMainPage rerendering >>>', activeChatSession)
  return {
    state, activeChatSession, activeSessionId, file
  }
}

export function useGetMainPageState() {
  const { state } = useMainPage()
  // const getActiveChatSession = useCallback(() => activeChatSession, [activeChatSession])
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
  const { setActiveChatSession, setMainPageState, finishMainPageState, resetMainPageState } = useContext(MainPageContext)

  return {
    setActiveChatSession,
    setMainPageState,
    finishMainPageState,
    resetMainPageState
  }
}

