import React from 'react'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'

import Message from 'pages/mainpage/hooks/ChatSessionsHooks'

export default function InlineButtonsDisplay({ inlineButtons }: { inlineButtons: Message["inlineButtons"] }) {
  // message can use 70 % of width 
  // inline buttons can use entire screen for right

  const InlineButtonContainer = styled(Grid)`display: table; margin-top: 10px;`
  return (
    <InlineButtonContainer container sm={10} md={10} lg={10} xl={10}>
      {inlineButtons?.map(button => {
        return <button>
          {button.label}
        </button>
      })}
    </InlineButtonContainer>
  )

}