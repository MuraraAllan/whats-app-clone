import React, { useRef } from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'

import { BorderedContainer, RotatedAttachFile } from 'shared/components'
import { FullHeightContainer } from 'shared/components/FullHeightContainer'
import { useTakePicture, useUploadFile } from 'pages/mainpage/hooks'

const CalcContainer = styled(Grid)`height: calc(100% - 42px)`

const filePreviewStyles = makeStyles((theme) => {
  return {
    filePreviewer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down("xs")]: {
        width: '200px',
        height: '200px'
      },
      [theme.breakpoints.down("sm")]: {
        width: '300px',
        height: '300px'
      },
      [theme.breakpoints.up("md")]: {
        width: '400px',
        height: '400px'
      },
      [theme.breakpoints.up("lg")]: {
        width: '450px',
        height: '450px'
      },
      [theme.breakpoints.up("xl")]: {
        width: '550px',
        height: '550px'
      },
    }
  }
})

export default function TakePictureWithCam() {
  // should render a header with Digite o label do arquivo and an close button
  // should render document preview, if it is a picture then preview image
  // otherwise render an attachment in the middle with file name under

  const { setUploadingFile, uploadingFile, setIsTakingPicture } = useUploadFile()
  const { videoRef } = useTakePicture()

  const classes = filePreviewStyles()


  // return (<video ref={videoRef} id="video" />)
  return (
    <FullHeightContainer item container direction="row" >
      <BorderedContainer alignItems="center" container style={{ backgroundColor: '#80808066', height: '40px' }}>
        {/* implement i18n */}
        <span onClick={() => setIsTakingPicture(false)} style={{ fontWeight: 600, padding: '10px', cursor: 'pointer' }}>x</span>
        <span style={{ fontWeight: 600 }}> Tire uma foto</span>
      </BorderedContainer>
      <CalcContainer item container direction="column" justify="center" alignItems="center">
        <BorderedContainer className={classes.filePreviewer}>
          {/* <FancyCanvas ref={canvasRef as any} /> */}
          <video ref={videoRef as any} />

        </BorderedContainer>
        <span style={{ padding: '10px' }}>{uploadingFile?.name}</span>
      </CalcContainer>
    </FullHeightContainer >
  )

}