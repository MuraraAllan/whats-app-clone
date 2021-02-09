import React, { useCallback, useState } from 'react'
import CameraAlt from '@material-ui/icons/CameraAlt'
import Grid from '@material-ui/core/Grid'
import Mic from '@material-ui/icons/Mic'
import Send from '@material-ui/icons/Send'

import { BorderedInput, RotatedAttachFile } from 'shared/components'
import { useActiveChatSession, useChatSessions, useUploadFileInput } from 'pages/mainpage/hooks'
import { useUser } from 'shared/hooks'
import { FullHeightContainer } from 'shared/components/FullHeightContainer'

export default function DefaultActionBar() {
  const { activeSession } = useActiveChatSession()
  const session_id = activeSession?.session_id ?? '0'
  const { addMessage } = useChatSessions()
  const [inputState, setInputState] = useState<string>('')
  const { inputRef } = useUploadFileInput()
  const user = useUser()

  const dispatchAndClear = useCallback(() => {
    addMessage(session_id, inputState, user)
    setInputState('')
  }, [inputState, session_id, user, addMessage])

  return (
    <FullHeightContainer container justify="space-evenly" alignItems="center">
      <Grid item>
        <CameraAlt fontSize="large" />
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
        <Mic fontSize="large" />
      </Grid>
      <Grid item >
        <Send data-testid="activeChatSessionActionBarSendButton" onClick={() => dispatchAndClear()} fontSize="large" style={{ transform: "rotate(-45deg)", marginBottom: '7px' }} />
      </Grid>
    </FullHeightContainer>
  )
}