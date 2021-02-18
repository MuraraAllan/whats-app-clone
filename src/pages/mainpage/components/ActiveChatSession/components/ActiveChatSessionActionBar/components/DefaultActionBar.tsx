import React, { useCallback, useState } from 'react'
import CameraAlt from '@material-ui/icons/CameraAlt'
import Grid from '@material-ui/core/Grid'
import Mic from '@material-ui/icons/Mic'

import { BorderedInput, RotatedAttachFile, RotatedSend } from 'shared/components'
import { FullHeightContainer } from 'shared/components/FullHeightContainer'
import { useActiveChatSession, useUploadFileInput, useUploadFile } from 'pages/mainpage/hooks'

//

export default function DefaultActionBar() {
  const { activeSession, user } = useActiveChatSession()
  const session_id = activeSession?.session_id ?? '0'
  const [inputState, setInputState] = useState<string>('')
  const { setIsTakingPicture, setIsRecordingAudio, addMessage } = useUploadFile()
  const { inputRef } = useUploadFileInput()

  const dispatchAndClear = useCallback(() => {
    if (inputState.length > 0) {
      addMessage({ session_id, textMessage: inputState, user })
      setInputState('')
    }
    return null
  }, [inputState, session_id, user, addMessage])

  return (
    <FullHeightContainer data-testid="DefaultActionBar" container justify="space-evenly" alignItems="center">
      <Grid item>
        <CameraAlt data-testid="DefaultActionBarUploadPicture" fontSize="large" onClick={() => setIsTakingPicture(true)} />
      </Grid>
      <Grid item>
        <input data-testid="DefaultActionBarHiddenInputFile" type="file" ref={inputRef} style={{ display: 'none' }} />
        <RotatedAttachFile onClick={() => inputRef.current?.click()} fontSize="large" />
      </Grid>
      <FullHeightContainer container item xs={8} sm={7} md={8} lg={9} xl={10} alignItems="center">
        {/* implement i18n */}
        <BorderedInput
          data-testid="DefaultActionBarInput"
          onKeyDown={(ev) => ev.key === "Enter" ? dispatchAndClear() : null}
          value={inputState}
          onChange={(ev) => setInputState(ev.target.value)}
          height={50}
          border={2}
          placeholder="Escreva uma mensagem..." />
      </FullHeightContainer>
      <Grid item>
        <Mic data-testid="DefaultActionBarRecordAudio" fontSize="large" onClick={() => setIsRecordingAudio(true)} />
      </Grid>
      <Grid item >
        <RotatedSend data-testid="DefaultActionBarSend" margin="0px 0px 7px 0px" onClick={() => dispatchAndClear()} fontSize="large" />
      </Grid>
    </FullHeightContainer>
  )
}