import React, { useState } from 'react'
import AttachFile from '@material-ui/icons/AttachFile'
import CameraAlt from '@material-ui/icons/CameraAlt'
import Grid from '@material-ui/core/Grid'
import Mic from '@material-ui/icons/Mic'
import Send from '@material-ui/icons/Send'
import styled from 'styled-components'

import { BorderedInput } from 'shared/components'
import { useActiveChatSession, useChatSessions, useUploadFile } from 'pages/mainpage/hooks'
import { useUser } from 'shared/hooks'
import { FullHeightContainer } from 'shared/components/FullHeightContainer'



export default function DefaultActionBar() {
  const { activeSession } = useActiveChatSession()
  const { addMessage } = useChatSessions()
  const { setIsUploadingFile } = useUploadFile()

  const user = useUser()
  const [inputState, setInputState] = useState<string>('')

  const session_id = activeSession?.session_id ?? '0'

  // should render defaultActionBar when isSendingFile is false
  // should render sendFilesActionBar when isSendingFile is true
  // should render audioActionBar when isSendingAudio is true
  // should render formActionbar when isRegistering is true

  return (
    <FullHeightContainer container justify="space-evenly" alignItems="center">
      <Grid item>
        <CameraAlt fontSize="large" />
      </Grid>
      <Grid item>
        <AttachFile onClick={() => setIsUploadingFile(true)} fontSize="large" style={{ transform: "rotate(-45deg)" }} />
      </Grid>
      <FullHeightContainer container item xs={8} sm={7} md={8} lg={9} xl={10} alignItems="center">
        {/* implement i18n */}
        <BorderedInput
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              addMessage(session_id, inputState, user)
              setInputState('')
            }
          }}
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
        <Send data-testid="activeChatSessionActionBarSendButton" onClick={() => {
          addMessage(session_id, inputState, user)
          setInputState('')
        }} fontSize="large" style={{ transform: "rotate(-45deg)", marginBottom: '7px' }} />
      </Grid>
    </FullHeightContainer>
  )
}