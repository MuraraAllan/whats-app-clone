import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'

import { BorderedInput, RotatedSend, CircleContainer } from 'shared/components'
import { FullHeightContainer } from 'shared/components/FullHeightContainer'
import { useTakePicture, useUploadFile } from 'pages/mainpage/hooks'
import { CameraAlt } from '@material-ui/icons'
import styled from 'styled-components'

const PositionedCameraAlt = styled(CameraAlt)`width: 80%; height: 80%; `

export default function SingleButtonActionBar() {
  const { finishUploadingFile } = useUploadFile()
  const { takePicture } = useTakePicture()
  const [inputState, setInputState] = useState<string>('')

  // if user isTakingPicture then render CameraAlt
  // if not render register
  return (
    // implement i18n
    <Grid style={{ height: '80px' }} container justify="flex-start" direction="column" alignItems="center">
      <CircleContainer cursor="pointer" width={60} height={60} margin="-40px 0px" backgroundColor="white">
        <PositionedCameraAlt onClick={() => takePicture()} />
      </CircleContainer>
      <span style={{ marginTop: '45px' }}>Tirar Foto</span>
    </Grid>
  )
  return (
    <FullHeightContainer container justify="space-between" alignItems="flex-start">
      <Grid style={{ height: '80%' }} item container xs={10} sm={10} md={10} lg={10} xl={10} alignItems="center" justify="flex-end">
        {/* implement i18n */}
        <BorderedInput
          onKeyDown={(ev) => ev.key === "Enter" ? finishUploadingFile(inputState) : null}
          value={inputState}
          onChange={(ev) => setInputState(ev.target.value)}
          height={"34px"}
          width={80}
          border={2}
          placeholder="Escreva um label para o arquivo." />
      </Grid>
      <Grid item style={{ alignSelf: 'center' }} container xs={1} sm={1} md={1} lg={1} xl={1}>
        <RotatedSend data-testid="activeChatSessionActionBarSendButton" onClick={() => finishUploadingFile(inputState)} fontSize="large" marginBottom="15px" />
      </Grid>
    </FullHeightContainer>
  )
}