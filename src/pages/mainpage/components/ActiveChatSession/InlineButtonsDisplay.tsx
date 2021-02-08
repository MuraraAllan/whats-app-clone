import React from 'react'
import { Grid } from '@material-ui/core'

import { Message } from 'pages/mainpage/hooks/ChatSessionsHooks'
import { ShadowedButton } from 'shared/components/ShadowedButton'

export default function InlineButtonsDisplay({ inlineButtons, isCurrentUserMessage }: { inlineButtons: Message["inlineButtons"], isCurrentUserMessage: boolean }) {
  return (
    <Grid data-testid="inlineButtonsGrid" item container sm={10} md={10} lg={10} xl={10} justify={isCurrentUserMessage ? 'flex-end' : 'flex-start'}>
      {inlineButtons?.map((button, index) => {
        return <ShadowedButton key={index} margin={"0px 5px 3px 0px"} >
          <span>{button.label}</span>
        </ShadowedButton>
      })}
    </Grid>
  )

}