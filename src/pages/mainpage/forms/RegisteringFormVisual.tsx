import { Grid } from '@material-ui/core';
import React from 'react'
import { BorderedContainer, FontWidthSpan, FullHeightContainer } from 'shared/components'
import RegisteringForm from './RegisteringForm';
import styled from 'styled-components';
import { useUser } from 'shared/hooks';

const BigGrid = styled(Grid)`height: 80%`
export default function RegisteringFormVisual() {
  const { setIsRegisterFormOpen, isRegisteringFormOpen } = useUser()

  if (setIsRegisterFormOpen == null || isRegisteringFormOpen == null) {
    return null
  }
  return <FullHeightContainer item container direction="row" >
    <BorderedContainer alignItems="center" justify="space-between" container style={{ backgroundColor: '#80808066', height: '40px' }}>
      {/* implement i18n */}
      {/* 
        this same logic is used also on FileViewer and TakePictureWIthCam, investigate a away to reuse it.
        this component should be already centered and positioned at this point
       */}
      <Grid item >
        <FontWidthSpan data-testid="RegisteringFormVisualClose" onClick={() => setIsRegisterFormOpen(false)} style={{ padding: '5px', cursor: 'pointer' }}>x</FontWidthSpan>
        <FontWidthSpan> Fazer meu cadastro</FontWidthSpan>
        {/* implement i18n */}
      </Grid>
    </BorderedContainer>
    <BigGrid container item justify="center">
      <RegisteringForm />
    </BigGrid>
  </FullHeightContainer >
}