import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Send from '@material-ui/icons/Send'

import { BorderedInput } from 'shared/components'
import { FullHeightContainer } from 'shared/components/FullHeightContainer'
import { useUploadFile } from 'pages/mainpage/hooks'


export default function DefaultActionBar() {
  const { finishUploadingFile } = useUploadFile()
  const [inputState, setInputState] = useState<string>('')

  // should render defaultActionBar when isSendingFile is false
  // should render sendFilesActionBar when isSendingFile is true
  // should render audioActionBar when isSendingAudio is true
  // should render formActionbar when isRegistering is true

  return (
    <FullHeightContainer container justify="space-between" alignItems="flex-start">
      <Grid style={{ height: '80%' }} item container xs={10} sm={10} md={10} lg={10} xl={10} alignItems="center" justify="flex-end">
        {/* implement i18n */}
        <BorderedInput
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              finishUploadingFile(inputState)
            }
          }}
          value={inputState}
          onChange={(ev) => setInputState(ev.target.value)}
          height={"34px"}
          width={80}
          border={2}
          placeholder="Escreva um label para o arquivo." />
      </Grid>
      <Grid item style={{ alignSelf: 'center' }} container xs={1} sm={1} md={1} lg={1} xl={1}>
        <Send data-testid="activeChatSessionActionBarSendButton" onClick={() => finishUploadingFile(inputState)} fontSize="large" style={{ transform: "rotate(-45deg)", marginBottom: '35px' }} />
      </Grid>
    </FullHeightContainer>
  )
}