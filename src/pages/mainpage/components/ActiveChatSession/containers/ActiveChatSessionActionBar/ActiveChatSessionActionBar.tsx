import React, { useEffect, useState } from 'react'
import AttachFile from '@material-ui/icons/AttachFile'
import CameraAlt from '@material-ui/icons/CameraAlt'
import Grid from '@material-ui/core/Grid'
import Mic from '@material-ui/icons/Mic'
import Send from '@material-ui/icons/Send'
import styled from 'styled-components'

import { BorderedInput } from 'shared/components'
import { useActiveChatSession, useChatSessions } from 'pages/mainpage/hooks'
import { useUser } from 'shared/hooks'

const FullHeightContainer = styled(Grid)`height: 100%`

export default function ActiveChatSessionActionBar() {
  const { activeSession, userBelongsToActiveSession } = useActiveChatSession()
  const { addMessage } = useChatSessions()

  const user = useUser()
  const [inputState, setInputState] = useState<string>('')

  const session_id = activeSession?.session_id ?? '0'

  // simple effect for now, this can lead to a bug where a new message arrive from other user and current typed on BorderedInput clears out
  useEffect(() => {
    setInputState('')
  }, [activeSession])

  //does'nt render an action bar if the user doesnt belong to that chat session
  if (userBelongsToActiveSession === false) {
    return (
      <div data-testid="activeChatSessionActionBarBlocked" style={{ width: '100%', height: '100%', backgroundColor: '#80808066' }} />
    )
  }

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
        <AttachFile fontSize="large" style={{ transform: "rotate(-45deg)" }} />
      </Grid>
      <FullHeightContainer container item xs={8} sm={7} md={8} lg={9} xl={10} alignItems="center">
        {/* implement i18n */}
        <BorderedInput
          onKeyDown={(ev) => ev.key === "Enter" ? addMessage(session_id, inputState, user) : null}
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
        <Send data-testid="activeChatSessionActionBarSendButton" onClick={() => addMessage(session_id, inputState, user)} fontSize="large" style={{ transform: "rotate(-45deg)", marginBottom: '7px' }} />
      </Grid>
    </FullHeightContainer>
  )
}