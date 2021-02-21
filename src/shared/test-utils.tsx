import React, { ReactNode, useEffect } from 'react'
import { render } from '@testing-library/react'
import TestRenderer from 'react-test-renderer';


import { MainPageProvider, ChatSessionsProvider, UploadFileProvider } from 'pages/mainpage/context'
import { MainPageDispatchers } from 'pages/mainpage/context/MainPageContext'
import { ChatSessionType, Message } from 'pages/mainpage/hooks/ChatSessionsHooks'
import { LoggedUserProvider } from './context/LoggedUserContext'
import { useActiveChatSession, useActiveChatSessionID, useActiveChatSessionMessages, useGetMainPageState, useMainPageDispatchers, useMainPageFile } from 'pages/mainpage/hooks'
import { UploadFileDispatchers } from '../pages/mainpage/context/UploadFileContext'

export function useActiveChatSessionMock(Component?: React.ReactNode) {
  const returnChatSession = {} as ChatSessionType
  const userBelongs = {} as { belongs: null | boolean }
  let mockSetactiveSession: (session_id: string) => void = (session_id: string) => null
  const messages = [] as any
  let sessionID = {} as { sess_id: string }

  function TestComponent() {
    const { activeChatSession } = useActiveChatSession()
    const localMessages = useActiveChatSessionMessages() as Message[]
    const localSessionID = useActiveChatSessionID()
    const userBelongsToSession = activeChatSession?.userBelongsToSession ?? false
    const { setActiveChatSession } = useMainPageDispatchers()
    useEffect(() => {
      Object.assign(returnChatSession, activeChatSession)
      Object.assign(sessionID, { sess_id: localSessionID })

      if (localMessages != null) {
        messages.length = 0
        messages.push(...localMessages)
      }
      Object.assign(userBelongs, { belongs: userBelongsToSession })
      mockSetactiveSession = setActiveChatSession
    }, [activeChatSession, userBelongsToSession, setActiveChatSession, localMessages, localSessionID])

    return <>
      {Component}
    </>
  }

  const { getByTestId, getAllByText, getByText } = render(
    <MockProviders>
      <TestComponent />
    </MockProviders>
  )
  return { returnChatSession, userBelongs, messages, sessionID, mockSetactiveSession, getByTestId, getAllByText, getByText }
}

export function useUploadFileMock(Component?: React.ReactNode) {
  const dispatchers = {} as UploadFileDispatchers
  let mockSetactiveSession: (session_id: string) => void = (session_id: string) => null

  function TestComponent() {

    useEffect(() => {
      Object.assign(dispatchers, {

      })
    }, [])

    return <>
      {Component}
    </>
  }

  const { getByTestId, getAllByText, getByText, debug } = render(
    <MockProviders>
      <TestComponent />
    </MockProviders>
  )
  return { dispatchers, getByTestId, getAllByText, getByText, debug }
}

interface UseMainPageMockProps {
  useTestRenderer?: boolean,
  Component?: React.ReactNode
}

export function useMainPageMock(props?: UseMainPageMockProps) {
  const returnObj = {} as {
    state: any,
    activeSessionID: any,
    file: any
  }
  const Component = props?.Component ?? null
  const useTestRenderer = props?.useTestRenderer ?? false
  const dispatchers = {} as MainPageDispatchers

  function TestComponent() {
    const localDispatchers = useMainPageDispatchers()
    const state = useGetMainPageState()
    const activeSessionID = useActiveChatSessionID()
    const file = useMainPageFile()
    useEffect(() => {
      Object.assign(returnObj, {
        ...{
          state,
          activeSessionID,
          file
        }
      })
      Object.assign(dispatchers, localDispatchers)

    }, [localDispatchers, state, activeSessionID, file])

    return <>
      {Component}
    </>
  }

  if (useTestRenderer) {
    const { act } = TestRenderer
    let render = undefined as unknown as TestRenderer.ReactTestRenderer
    act(() => {
      render = TestRenderer.create(
        <MockProviders>
          <TestComponent />
        </MockProviders>
      )
    })
    return { returnObj, dispatchers, root: render.root }
  }

  const { getByTestId, getAllByText, getByText, debug, } = render(
    <MockProviders>
      <TestComponent />
    </MockProviders>
  )
  return { returnObj, dispatchers, getByTestId, getAllByText, getByText, debug }
}


export function MockProviders({ children }: { children: ReactNode }) {
  return (
    <LoggedUserProvider>
      <ChatSessionsProvider>
        <MainPageProvider>
          <UploadFileProvider>
            {children}
          </UploadFileProvider>
        </MainPageProvider>
      </ChatSessionsProvider>
    </LoggedUserProvider>
  )
}
