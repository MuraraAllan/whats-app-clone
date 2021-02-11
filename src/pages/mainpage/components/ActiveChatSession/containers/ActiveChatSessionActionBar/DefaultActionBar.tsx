import React, { useCallback, useState } from 'react'
import CameraAlt from '@material-ui/icons/CameraAlt'
import Grid from '@material-ui/core/Grid'
import Mic from '@material-ui/icons/Mic'

import { BorderedInput, RotatedAttachFile, RotatedSend } from 'shared/components'
import { FullHeightContainer } from 'shared/components/FullHeightContainer'
import { useActiveChatSession, useChatSessions, useUploadFileInput, useUploadFile } from 'pages/mainpage/hooks'
import { useUser } from 'shared/hooks'

export default function DefaultActionBar() {
  const { activeSession } = useActiveChatSession()
  const session_id = activeSession?.session_id ?? '0'
  const { addMessage } = useChatSessions()
  const [inputState, setInputState] = useState<string>('')
  const { setIsTakingPicture, setIsRecordingAudio } = useUploadFile()
  const { inputRef } = useUploadFileInput()
  const user = useUser()

  const dispatchAndClear = useCallback(() => {
    if (inputState.length > 0) {
      addMessage({ session_id, textMessage: inputState, user })
      setInputState('')
    }
    return null
  }, [inputState, session_id, user, addMessage])

  return (
    <FullHeightContainer container justify="space-evenly" alignItems="center">
      <Grid item>
        <CameraAlt fontSize="large" onClick={() => setIsTakingPicture(true)} />
      </Grid>
      <Grid item>
        <input type="file" ref={inputRef} style={{ display: 'none' }} />
        <RotatedAttachFile onClick={() => inputRef.current?.click()} fontSize="large" />
      </Grid>
      <FullHeightContainer container item xs={8} sm={7} md={8} lg={9} xl={10} alignItems="center">
        {/* implement i18n */}
        <BorderedInput
          onKeyDown={(ev) => ev.key === "Enter" ? dispatchAndClear() : null}
          value={inputState}
          onChange={(ev) => setInputState(ev.target.value)}
          height={50}
          border={2}
          placeholder="Escreva uma mensagem..." />
      </FullHeightContainer>
      <Grid item>
        <Mic fontSize="large" onClick={() => setIsRecordingAudio(true)} />
      </Grid>
      <Grid item >
        <RotatedSend marginBottom="7px" data-testid="activeChatSessionActionBarSendButton" onClick={() => dispatchAndClear()} fontSize="large" />
      </Grid>
    </FullHeightContainer>
  )
}