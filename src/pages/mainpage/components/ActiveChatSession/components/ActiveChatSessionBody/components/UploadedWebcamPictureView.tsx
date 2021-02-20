import React, { Dispatch, SetStateAction } from 'react'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'


import { BorderedContainer, FontWidthSpan } from 'shared/components'
import { FullHeightContainer } from 'shared/components/FullHeightContainer'
import { useMainPageDispatchers, useMainPageFile } from 'pages/mainpage/hooks'
import { UploadingFileType } from 'pages/mainpage/hooks/ChatSessionsHooks'

const CalcContainer = styled(Grid)`height: calc(100% - 42px)`

export default function UploadedWebcamPictureView({ fileView, setFileView }: { fileView?: UploadingFileType, setFileView?: Dispatch<SetStateAction<UploadingFileType | null>> }) {
  const { resetMainPageState } = useMainPageDispatchers()
  const file = useMainPageFile()
  if (file == null) {
    return null
  }

  const fileURL = URL.createObjectURL(file?.content)

  return (
    <FullHeightContainer item container direction="row" >
      <BorderedContainer alignItems="center" justify="space-between" container style={{ backgroundColor: '#80808066', height: '40px' }}>
        {/* implement i18n */}
        <Grid item>
          <FontWidthSpan data-testid="FileViewerClose" onClick={() => resetMainPageState()} style={{ padding: '5px', cursor: 'pointer' }}>x</FontWidthSpan>
          {/* implement i18n */}
          <FontWidthSpan data-testid="FileViewerLabel">
            Visualizador de fotos
          </FontWidthSpan>
        </Grid>
      </BorderedContainer>
      <CalcContainer item container direction="column" justify="center" alignItems="center">
        <img alt="" style={{ maxHeight: '100%' }} data-testid="FileViewerIsViewingSentWebcamFile" src={fileURL}></img>
      </CalcContainer>
    </FullHeightContainer >
  )

}