import React from 'react'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'

import { CircleContainer, RotatedSend } from 'shared/components'


const StyledButton = styled.button` 
  padding-left: 17px;
  background-color: transparent;
  border: transparent;
  &:focus {
    outline: none;
  }
  cursor: pointer;
`

export default function RegisteringFormActionBar() {
  return (
    // implement i18n
    <Grid style={{ height: '80px' }} container justify="flex-start" direction="column" alignItems="center">
      <CircleContainer zindex={150} cursor="pointer" width={60} height={60} margin="-40px 0px -40px 0px" coloredbackground="white">
        <StyledButton data-testid="RegisteringFormActionBarSubmit" type="submit" form="fazer_meu_cadastro"><RotatedSend margin="" fontSize="large" data-testid="RegisteringFormActionBarSend" /></StyledButton>
      </CircleContainer>
      <span style={{ marginTop: '45px' }}>Enviar Formulário</span>
    </Grid>
  )
}