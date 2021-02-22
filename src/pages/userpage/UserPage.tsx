import React, { ReactNode, useState } from 'react'
import { Grid, Switch } from '@material-ui/core'

import "firebase/auth";

import { LogInUser } from './components/LoginUser'
import { RegisterUser } from './components/RegisterUser'
import { useUser } from 'shared/hooks'
import styled from 'styled-components'
import { ShadowedButton } from '../../shared/components/ShadowedButton'

const PaddedGrid = styled(Grid)`padding: 20px`


export function UserPage({ children }: { children: ReactNode }) {
  const { user } = useUser()
  const [isRegistering, setIsRegistering] = useState<boolean>(false)

  if (user != null) {
    return <> {children} </>
  }


  return (
    <Grid container direction="column" alignItems="center">
      <PaddedGrid container justify="center">
        {isRegistering ? <RegisterUser /> : <LogInUser />}
      </PaddedGrid>
      <PaddedGrid>
        <ShadowedButton onClick={() => setIsRegistering(!isRegistering)}>{isRegistering ? "Login" : "Registrar novo usuário"}</ShadowedButton>
      </PaddedGrid>
    </Grid>
  )
}