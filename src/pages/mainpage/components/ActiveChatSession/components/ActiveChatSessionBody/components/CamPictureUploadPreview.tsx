import React from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'

import { BorderedContainer, FontWidthSpan } from 'shared/components'
import { FullHeightContainer } from 'shared/components/FullHeightContainer'
import { useMainPageDispatchers, useMainPageFile } from 'pages/mainpage/hooks'

const CalcContainer = styled(Grid)`height: calc(100% - 42px)`

export default function CamPictureUploadPreview() {
  const { resetMainPageState, setMainPageState } = useMainPageDispatchers()
  const file = useMainPageFile()

  const fileURL = URL.createObjectURL(file?.content)

  return (
    <FullHeightContainer item container direction="row" >
      <BorderedContainer alignItems="center" justify="space-between" container style={{ backgroundColor: '#80808066', height: '40px' }}>
        {/* implement i18n */}
        <Grid item>
          <FontWidthSpan data-testid="FileViewerClose" onClick={() => resetMainPageState()} style={{ padding: '5px', cursor: 'pointer' }}>x</FontWidthSpan>
          {/* implement i18n */}
          <FontWidthSpan data-testid="FileViewerLabel">
            Tire uma foto
          </FontWidthSpan>
        </Grid>
        <Grid container item xs={10} sm={5} md={8} lg={9} xl={9} justify="flex-end">
          <FontWidthSpan
            data-testid="FileViewerTakeScreenShot"
            style={{ cursor: 'pointer', marginRight: '10px' }}
            onClick={() => setMainPageState('take_webcam_picture')} >
            Tirar foto novamente
            </FontWidthSpan>
        </Grid>
      </BorderedContainer>
      <CalcContainer item container direction="column" justify="center" alignItems="center">
        <img alt="" data-testid="FileViewerIsViewingWebcamFile" src={fileURL}></img>
      </CalcContainer>
    </FullHeightContainer >
  )

}