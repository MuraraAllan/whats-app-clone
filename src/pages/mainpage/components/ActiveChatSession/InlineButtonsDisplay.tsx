import React from 'react'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'

import Message from 'pages/mainpage/hooks/ChatSessionsHooks'

const InlineButtonContainer = styled(Grid)`display: table; margin-top: 10px;`

export default function InlineButtonsDisplay({ inlineButtons }: { inlineButtons: Message["inlineButtons"] }) {

  return (
    <InlineButtonContainer item container sm={10} md={10} lg={10} xl={10}>
      {inlineButtons?.map((button, index) => {
        return <button key={index}>
          {button.label}
        </button>
      })}
    </InlineButtonContainer>
  )

}