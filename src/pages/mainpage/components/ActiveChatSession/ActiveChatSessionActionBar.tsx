import React from 'react'
import AttachFile from '@material-ui/icons/AttachFile'
import CameraAlt from '@material-ui/icons/CameraAlt'
import Grid from '@material-ui/core/Grid'
import Mic from '@material-ui/icons/Mic'
import Send from '@material-ui/icons/Send'
import styled from 'styled-components'

import { useActiveChatSession } from 'pages/mainpage/hooks'

const FullHeightContainer = styled(Grid)`height: 100%`

export default function ActiveChatSessionActionBar() {
  const { userBelongsToActiveSession } = useActiveChatSession()

  if (userBelongsToActiveSession === false) {
    return (
      <div data-testid="activeChatSessionActionBarBlocked" style={{ width: '100%', height: '100%', backgroundColor: '#80808066' }} />
    )
  }

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
        <input placeholder="Escreva uma mensagem..." style={{ border: '2px solid', width: '100%', height: '50%' }} />
      </FullHeightContainer>
      <Grid item>
        <Mic fontSize="large" />
      </Grid>
      <Grid item>
        <Send fontSize="large" style={{ transform: "rotate(-45deg)", marginBottom: '7px' }} />
      </Grid>
    </FullHeightContainer>
  )
}