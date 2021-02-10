import React from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'

import { BorderedContainer } from 'shared/components'
import { FullHeightContainer } from 'shared/components/FullHeightContainer'
import { useTakePicture, useUploadFile } from 'pages/mainpage/hooks'

const CalcContainer = styled(Grid)`height: calc(100% - 42px)`

const filePreviewStyles = makeStyles((theme) => {
  return {
    filePreviewer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '2px solid',
      [theme.breakpoints.down("xs")]: {
        height: '200px'
      },
      [theme.breakpoints.down("sm")]: {
        height: '300px'
      },
      [theme.breakpoints.up("md")]: {
        height: '400px'
      },
      [theme.breakpoints.up("lg")]: {
        height: '450px'
      },
      [theme.breakpoints.up("xl")]: {
        height: '550px'
      },
    }
  }
})

export default function TakePictureWithCam() {
  // should render a header TireUmaFoto do arquivo and an close button
  // should render document preview, if it is a picture then preview image
  // otherwise render an attachment in the middle with file name under
  const { setIsTakingPicture } = useUploadFile()
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
        <video className={classes.filePreviewer} ref={videoRef} />
      </CalcContainer>
    </FullHeightContainer >
  )

}