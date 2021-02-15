import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'

import { BorderedInput, RotatedSend } from 'shared/components'
import { useUploadFile } from 'pages/mainpage/hooks'

export default function FileUploadLabelActionBar() {
  const { finishUploadingFile } = useUploadFile()
  const [inputState, setInputState] = useState<string>('')

  return (
    <Grid style={{ height: '120px' }} container justify="space-between" alignItems="flex-start">
      <Grid style={{ height: '80%' }} item container xs={10} sm={10} md={10} lg={10} xl={10} alignItems="center" justify="flex-end">
        {/* implement i18n */}
        <BorderedInput
          data-testid="FileUploadLabelActionBarInput"
          onKeyDown={(ev) => ev.key === "Enter" ? finishUploadingFile(inputState) : null}
          value={inputState}
          onChange={(ev) => setInputState(ev.target.value)}
          height={"34px"}
          width={80}
          border={2}
          placeholder="Escreva um label para o arquivo." />
      </Grid>
      <Grid item style={{ paddingTop: '16px' }} container xs={1} sm={1} md={1} lg={1} xl={1}>
        <RotatedSend data-testid="FileUploadLabelActionBarSend" onClick={() => finishUploadingFile(inputState)} fontSize="large" margin="0px 0px 15px 0px" />
      </Grid>
    </Grid>
  )
}