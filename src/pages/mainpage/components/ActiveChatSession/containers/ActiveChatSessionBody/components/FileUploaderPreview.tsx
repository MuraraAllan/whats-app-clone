import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { BorderedContainer, RotatedAttachFile } from 'shared/components'
import { FullHeightContainer } from 'shared/components/FullHeightContainer'
import styled from 'styled-components'
import { useUploadFile } from 'pages/mainpage/hooks'

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

export default function FileUploaderPreview() {
  // should render a header with Digite o label do arquivo and an close button
  // should render document preview, if it is a picture then preview image
  // otherwise render an attachment in the middle with file name under
  const { setUploadingFile, uploadingFile } = useUploadFile()
  const classes = filePreviewStyles()

  return (
    <FullHeightContainer item container direction="row" >
      <BorderedContainer alignItems="center" container style={{ backgroundColor: '#80808066', height: '40px' }}>
        {/* implement i18n */}
        <span onClick={() => setUploadingFile(null)} style={{ fontWeight: 600, padding: '10px', cursor: 'pointer' }}>x</span>
        <span style={{ fontWeight: 600 }}> Digite o label do arquivo</span>
      </BorderedContainer>
      <CalcContainer item container direction="column" justify="center" alignItems="center">
        <BorderedContainer className={classes.filePreviewer}>
          <RotatedAttachFile width={50} height={50} />
        </BorderedContainer>
        <span style={{ padding: '10px' }}>{uploadingFile?.name}</span>
      </CalcContainer>
    </FullHeightContainer >
  )

}