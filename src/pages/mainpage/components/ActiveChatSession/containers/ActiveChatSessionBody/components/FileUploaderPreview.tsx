
import React, { CSSProperties } from 'react'
import { Grid } from '@material-ui/core'
import { BorderedContainer } from 'shared/components'
import { FullHeightContainer } from 'shared/components/FullHeightContainer'
import styled from 'styled-components'
import { useUploadFile } from '../../../../../hooks'

const CalcContainer = styled(Grid)`height: calc(100% - 42px)`

export default function FileUploaderPreview() {
  // should render a header with Digite o label do arquivo and an close button
  // should render document preview, if it is a picture then preview image
  // otherwise render an attachment in the middle with file name under
  const { setIsUploadingFile } = useUploadFile()

  return (
    <FullHeightContainer item container direction="row" >
      <BorderedContainer alignItems="center" container style={{ backgroundColor: '#80808066', height: '40px' }}>
        {/* implement i18n */}
        <span onClick={() => setIsUploadingFile(false)} style={{ fontWeight: 600, padding: '10px', cursor: 'pointer' }}>x</span>
        <span style={{ fontWeight: 600 }}> Digite o label do arquivo</span>
      </BorderedContainer>
      <CalcContainer item container direction="column" justify="center" alignItems="center">
        <BorderedContainer width={40} height={80}>

        </BorderedContainer>
        <span style={{ padding: '10px' }}>AQUE VAI O ARQUIVAO</span>
      </CalcContainer>
    </FullHeightContainer>
  )

}