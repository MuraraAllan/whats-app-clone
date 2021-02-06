import React from 'react'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'

import Message from 'pages/mainpage/hooks/ChatSessionsHooks'
import { ShadowedButton } from 'shared/components/ShadowedButton'

const InlineButtonContainer = styled(Grid)`display: table;`

export default function InlineButtonsDisplay({ inlineButtons }: { inlineButtons: Message["inlineButtons"] }) {

  return (
    <InlineButtonContainer item container sm={10} md={10} lg={10} xl={10}>
      {inlineButtons?.map((button, index) => {
        return <ShadowedButton key={index} marginRight={5} marginBottom={5}>
          {button.label}
        </ShadowedButton>
      })}
    </InlineButtonContainer>
  )

}