import { Grid } from '@material-ui/core';
import React from 'react'
import { BorderedContainer, FontWidthSpan, FullHeightContainer } from 'shared/components'
import { useActiveChatSession } from 'pages/mainpage/hooks';

export default function RegisteringForm() {
  const { setIsRegisterFormOpen } = useActiveChatSession()
  return <FullHeightContainer item container direction="row" >
    <BorderedContainer alignItems="center" justify="space-between" container style={{ backgroundColor: '#80808066', height: '40px' }}>
      {/* implement i18n */}
      <Grid item>
        <FontWidthSpan onClick={() => setIsRegisterFormOpen(false)} style={{ padding: '5px', cursor: 'pointer' }}>x</FontWidthSpan>
        {/* implement i18n */}
        <FontWidthSpan>
          Fazer meu cadastro
        </FontWidthSpan>
      </Grid>
    </BorderedContainer>
  </FullHeightContainer >
}