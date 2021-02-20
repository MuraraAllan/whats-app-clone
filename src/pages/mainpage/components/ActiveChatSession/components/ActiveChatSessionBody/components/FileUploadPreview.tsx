import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'

import { BorderedContainer, FontWidthSpan, RotatedAttachFile } from 'shared/components'
import { FullHeightContainer } from 'shared/components/FullHeightContainer'
import { useMainPageDispatchers, useMainPageFile } from 'pages/mainpage/hooks'
import { UploadingFileType } from 'pages/mainpage/hooks/ChatSessionsHooks'

const CalcContainer = styled(Grid)`height: calc(100% - 42px)`

const filePreviewStyles = makeStyles((theme) => {
  return {
    filePreviewer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down("xs")]: {
        width: '200px',
        height: '200px',
        maxHeight: '80%'
      },
      [theme.breakpoints.down("sm")]: {
        width: '300px',
        height: '300px',
        maxHeight: '80%'
      },
      [theme.breakpoints.up("md")]: {
        width: '400px',
        height: '400px',
        maxHeight: '80%'
      },
      [theme.breakpoints.up("lg")]: {
        width: '450px',
        height: '450px',
        maxHeight: '80%'
      },
      [theme.breakpoints.up("xl")]: {
        width: '550px',
        height: '550px',
        maxHeight: '80%'
      },
    }
  }
})



export default function FileUploadPreview({ fileView, setFileView }: { fileView?: UploadingFileType, setFileView?: Dispatch<SetStateAction<UploadingFileType | null>> }) {
  const { resetMainPageState } = useMainPageDispatchers()
  const file = useMainPageFile()
  const classes = filePreviewStyles()

  return (
    <FullHeightContainer item container direction="row" >
      <BorderedContainer alignItems="center" justify="space-between" container style={{ backgroundColor: '#80808066', height: '40px' }}>
        {/* implement i18n */}
        <Grid item>
          <FontWidthSpan data-testid="FileViewerClose" onClick={() => resetMainPageState()} style={{ padding: '5px', cursor: 'pointer' }}>x</FontWidthSpan>
          {/* implement i18n */}
          <FontWidthSpan data-testid="FileViewerLabel">
            "Digite o label do arquivo"
          </FontWidthSpan>
        </Grid>
      </BorderedContainer>
      <CalcContainer item container direction="column" justify="center" alignItems="center">
        <BorderedContainer data-testid="FileViewerIsPreviewingFileUpload" className={classes.filePreviewer}>
          <RotatedAttachFile width={50} height={50} />
        </BorderedContainer>
        <span style={{ padding: '10px' }}>{file?.name}</span>
      </CalcContainer>
    </FullHeightContainer >
  )

}