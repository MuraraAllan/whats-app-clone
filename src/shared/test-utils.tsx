import React, { ReactNode, useEffect } from 'react'
import { render } from '@testing-library/react'

import { ActiveChatSessionProvider, ChatSessionsProvider, UploadFileProvider } from 'pages/mainpage/context'
import { ChatSessionType } from 'pages/mainpage/hooks/ChatSessionsHooks'
import { LoggedUserProvider } from './context/LoggedUserContext'
import { useActiveChatSession, useUploadFile } from 'pages/mainpage/hooks'
import { UploadFileDispatchers } from '../pages/mainpage/context/UploadFileContext'

export function useActiveChatSessionMock(Component?: React.ReactNode) {
  const returnChatSession = {} as ChatSessionType
  const userBelongs = {} as { belongs: null | boolean }
  let mockSetactiveSession: (session_id: string) => void = (session_id: string) => null

  function TestComponent() {
    const { activeSession, userBelongsToActiveSession, setActiveSession } = useActiveChatSession()

    useEffect(() => {
      Object.assign(returnChatSession, activeSession)
      Object.assign(userBelongs, { belongs: userBelongsToActiveSession })
      mockSetactiveSession = setActiveSession
    }, [activeSession, userBelongsToActiveSession, setActiveSession])

    return <>
      {Component}
    </>
  }

  const { getByTestId, getAllByText, getByText } = render(
    <MockProviders>
      <TestComponent />
    </MockProviders>
  )
  return { returnChatSession, userBelongs, mockSetactiveSession, getByTestId, getAllByText, getByText }
}

export function useUploadFileMock(Component?: React.ReactNode) {
  const dispatchers = {} as UploadFileDispatchers
  let mockSetactiveSession: (session_id: string) => void = (session_id: string) => null

  function TestComponent() {
    const {
      setUploadingFile,
      setIsTakingPicture,
      setIsRecordingAudio
    } = useUploadFile()

    useEffect(() => {
      Object.assign(dispatchers, {
        setUploadingFile,
        setIsTakingPicture,
        setIsRecordingAudio
      })
    }, [setUploadingFile, setIsTakingPicture, setIsRecordingAudio])

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


export function MockProviders({ children }: { children: ReactNode }) {
  return (
    <LoggedUserProvider>
      <ChatSessionsProvider>
        <ActiveChatSessionProvider>
          <UploadFileProvider>
            {children}
          </UploadFileProvider>
        </ActiveChatSessionProvider>
      </ChatSessionsProvider>
    </LoggedUserProvider>
  )
}
