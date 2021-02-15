import React from 'react'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'

import { CameraAlt } from '@material-ui/icons'
import { CircleContainer } from 'shared/components'
import { useTakePicture } from 'pages/mainpage/hooks'

const PositionedCameraAlt = styled(CameraAlt)`width: 80%; height: 80%; `

export default function UploadPicture() {
  const { takePicture } = useTakePicture()
  return (
    // implement i18n
    <Grid style={{ height: '80px' }} container justify="flex-start" direction="column" alignItems="center">
      <CircleContainer cursor="pointer" width={60} height={60} margin="-40px 0px" coloredbackground="white">
        <PositionedCameraAlt data-testid="UploadPictureActionBarTakePicture" onClick={() => takePicture()} />
      </CircleContainer>
      <span style={{ marginTop: '45px' }}>Tirar Foto</span>
    </Grid>
  )
}