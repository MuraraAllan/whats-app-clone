import React, { Dispatch, SetStateAction, useMemo } from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'

import { BorderedContainer, FontWidthSpan, RotatedAttachFile } from 'shared/components'
import { FullHeightContainer } from 'shared/components/FullHeightContainer'
import { useMainPageDispatchers, useUploadFile } from 'pages/mainpage/hooks'
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


// states :
// isViewingUploadedFile (filePreview != null should render an image as filePreview is only available for imgs)
// isPreViewingFileUpload (uploadFile != null & !isTakingPicture should render Attach icon and a container around)
// isPreviewingWebcam (uploadingFile != null & isTakingPicture)

export default function FileUploadPreview({ fileView, setFileView }: { fileView?: UploadingFileType, setFileView?: Dispatch<SetStateAction<UploadingFileType | null>> }) {
  const { resetMainPageState, setMainPageState } = useMainPageDispatchers()
  // const isViewingUploadedFile = useMemo(() => {
  //   if (fileView != null) {
  //     return true
  //   }
  //   return false
  // }, [fileView])

  // const isPreViewingFileUpload = useMemo(() => {
  //   if (uploadingFile != null && !isTakingPicture) {
  //     return true
  //   }
  //   return false
  // }, [uploadingFile, isTakingPicture])

  // const isViewingWebcamFile = useMemo(() => {
  //   if (uploadingFile != null && isTakingPicture) {
  //     return true
  //   }
  //   return false
  // }, [uploadingFile, isTakingPicture])
  const classes = filePreviewStyles()

  // const displayFile = useMemo(() => {
  //   if (isViewingUploadedFile) {
  //     const fileURL = URL.createObjectURL(fileView?.content)
  //     return (<>
  //       <img alt="" data-testid="FileViewerIsViewingUploadedFile" src={fileURL}></img>
  //       <span style={{ padding: '10px' }}>{uploadingFile?.name}</span>
  //     </>)
  //   }
  //   if (isViewingWebcamFile) {
  //     const fileURL = URL.createObjectURL(uploadingFile?.content)
  //     return <img alt="" data-testid="FileViewerIsViewingWebcamFile" src={fileURL}></img>
  //   }
  //   if (isPreViewingFileUpload) {
  //     return (<>
  //       <BorderedContainer data-testid="FileViewerIsPreviewingFileUpload" className={classes.filePreviewer}>
  //         <RotatedAttachFile width={50} height={50} />
  //       </BorderedContainer>
  //       <span style={{ padding: '10px' }}>{uploadingFile?.name}</span>
  //     </>)
  //   }
  //   return null
  // }, [uploadingFile, fileView, isViewingWebcamFile, isPreViewingFileUpload, isViewingUploadedFile, classes.filePreviewer])

  return (
    <FullHeightContainer item container direction="row" >
      <BorderedContainer alignItems="center" justify="space-between" container style={{ backgroundColor: '#80808066', height: '40px' }}>
        {/* implement i18n */}
        <Grid item>
          <FontWidthSpan data-testid="FileViewerClose" onClick={() => { }} style={{ padding: '5px', cursor: 'pointer' }}>x</FontWidthSpan>
          {/* implement i18n */}
          <FontWidthSpan data-testid="FileViewerLabel">
            "Digite o label do arquivo"
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
        <BorderedContainer data-testid="FileViewerIsPreviewingFileUpload" className={classes.filePreviewer}>
          <RotatedAttachFile width={50} height={50} />
        </BorderedContainer>
        <span style={{ padding: '10px' }}>fileNameShouldBeHere</span>
      </CalcContainer>
    </FullHeightContainer >
  )

}