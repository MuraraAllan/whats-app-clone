import React, { useMemo } from 'react'
import Grid from '@material-ui/core/Grid'

import { CircleContainer, RotatedSend } from 'shared/components'

export default function RegisteringFormActionBar() {
  // const { takePicture } = useUser()
  return (
    // implement i18n
    <Grid style={{ height: '80px' }} container justify="flex-start" direction="column" alignItems="center">
      <CircleContainer cursor="pointer" width={60} height={60} margin="-40px 0px" backgroundColor="white">
        <RotatedSend onClick={() => console.log('hey clicked')} />
      </CircleContainer>
      <span style={{ marginTop: '45px' }}>Enviar Formulário</span>
    </Grid>
  )
}