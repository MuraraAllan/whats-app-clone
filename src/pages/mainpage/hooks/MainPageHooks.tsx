import { useContext } from "react"
import { MainPageContext } from "../context"

// there are multiple possibilitys of change in the context
// 

export function useGetMainPageState() {
  const { state } = useContext(MainPageContext)
  console.log('useGetMainPageState rerendering >>>', state)
  return state
}


export function useActiveChatSessionNew() {
  const { activeChatSession } = useContext(MainPageContext)
  console.log('useGetMainPageState rerendering >>>', activeChatSession)
  return {
    activeChatSession,
  }
}


export function useGetActiveSessionId() {
  const { activeSessionId } = useContext(MainPageContext)
  console.log('UseGetActiveSessionId rerendering >>>', activeSessionId)
  return {
    activeSessionId
  }
}