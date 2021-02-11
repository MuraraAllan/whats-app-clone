import React, { useCallback } from 'react'
import { Grid } from '@material-ui/core'

import { Message } from 'pages/mainpage/hooks/ChatSessionsHooks'
import { ShadowedButton } from 'shared/components/ShadowedButton'
import { useActiveChatSession } from 'pages/mainpage/hooks'



// check why inline buttons in single messages are too big
export default function InlineButtonsDisplay({ inlineButtons, isCurrentUserMessage }: { inlineButtons: Message["inlineButtons"], isCurrentUserMessage: boolean }) {
  const { setIsRegisterFormOpen } = useActiveChatSession()

  const translateClickAction = useCallback((button) => {
    if (button.onClickAction === "openRegisteringForm") {
      setIsRegisterFormOpen(true)
      return true
    }
    return null
  }, [setIsRegisterFormOpen])


  return (
    <Grid data-testid="inlineButtonsGrid" item container sm={10} md={10} lg={10} xl={10} justify={isCurrentUserMessage ? 'flex-end' : 'flex-start'}>
      {inlineButtons?.map((button, index) => {
        return <ShadowedButton key={index} onClick={() => translateClickAction(button)} margin={"0px 5px 3px 0px"} >
          <span>{button.label}</span>
        </ShadowedButton>
      })}
    </Grid>
  )

}