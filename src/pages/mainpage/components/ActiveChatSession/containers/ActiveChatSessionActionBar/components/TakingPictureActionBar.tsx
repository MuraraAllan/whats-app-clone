import React, { useMemo } from 'react'
import Grid from '@material-ui/core/Grid'

import { CircleContainer } from 'shared/components'
import { useTakePicture } from 'pages/mainpage/hooks'
import { CameraAlt } from '@material-ui/icons'
import styled from 'styled-components'
import { useUser } from 'shared/hooks'

const PositionedCameraAlt = styled(CameraAlt)`width: 80%; height: 80%; `

//states :
// takinPicture (isTakingPicture should render)
// isRegistering (defaultState should render an option to submit the registering form)

export default function SingleButtonActionBar() {
  const { takePicture } = useTakePicture()
  return (
    // implement i18n
    <Grid style={{ height: '80px' }} container justify="flex-start" direction="column" alignItems="center">
      <CircleContainer cursor="pointer" width={60} height={60} margin="-40px 0px" backgroundColor="white">
        <PositionedCameraAlt onClick={() => takePicture()} />
      </CircleContainer>
      <span style={{ marginTop: '45px' }}>Tirar Foto</span>
    </Grid>
  )
}