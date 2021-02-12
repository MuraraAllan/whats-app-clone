import React, { useEffect, useMemo, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import styled from 'styled-components'

import { RotatedSend, CircleContainer } from 'shared/components'
import { useRecordAudio } from 'pages/mainpage/hooks'
import { timeInSecondsRenderInMinute } from 'shared/utils';

const ColoredHighlightOffIcon = styled(HighlightOffIcon)`color: #dc2e2e; width: 50px; height: 50px`
const LimitedGrid = styled(Grid)`max-width: 100px;`

export default function RecordAudioActionBar() {
  const { isRecordingAudio, setIsRecordingAudio, finishRecordingAudio, hasAudioPermission } = useRecordAudio()
  const [counter, setCounter] = useState<number>(0)

  const timeRecording = useMemo(() => timeInSecondsRenderInMinute(counter), [counter])

  useEffect(() => {
    setTimeout(() => {
      if (hasAudioPermission) {
        setCounter(counter + 1)
      }
    }, 1000)
  }, [counter, isRecordingAudio, hasAudioPermission])

  return (
    // implement i18n
    <Grid data-testid="RecordAudioActionBar" style={{ height: '80px' }} container justify="center" alignItems="center">
      <Grid container direction="column" alignItems="center">
        <Grid container justify="center" alignItems="center">
          <ColoredHighlightOffIcon data-testid="RecordAudioActionBarStop" onClick={() => setIsRecordingAudio(false)} />
          <LimitedGrid justify="center" container xs={3} sm={2} md={2} lg={1} xl={1}>
            <span style={{ width: '80px', textAlign: 'center' }}>{timeRecording}</span>
          </LimitedGrid>
          <CircleContainer border={0} backgroundColor="#78ce62d6" borderColor="#78ce62d6" width="45" height="45">
            <RotatedSend data-testid="RecordAudioActionBarFinish" onClick={() => finishRecordingAudio()} />
          </CircleContainer>
        </Grid>
        {/* implement i18n */}
        <span>gravando aúdio...</span>
      </Grid>
    </Grid>
  )
}