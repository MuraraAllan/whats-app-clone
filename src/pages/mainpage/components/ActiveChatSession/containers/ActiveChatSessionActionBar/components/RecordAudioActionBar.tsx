import React, { useEffect, useMemo, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import styled from 'styled-components'

import { RotatedSend, CircleContainer } from 'shared/components'
import { useRecordAudio } from 'pages/mainpage/hooks'

const ColoredHighlightOffIcon = styled(HighlightOffIcon)`color: #dc2e2e; width: 50px; height: 50px`
const LimitedGrid = styled(Grid)`max-width: 100px;`

export default function RecordAudioActionBar() {
  const { isRecordingAudio, setIsRecordingAudio, finishRecordingAudio } = useRecordAudio()
  const [counter, setCounter] = useState<number>(0)

  const timeRecording = useMemo(() => {
    const minutes = counter / 60;
    if (minutes >= 1) {
      const seconds = counter % 60;
      return `${minutes.toFixed()}:${seconds.toString().padStart(2, '0')}`
    }
    return `0:${counter.toString().padStart(2, '0').substring(0, 2)}`
  }, [counter])

  useEffect(() => {
    setTimeout(() => {
      setCounter(counter + 1)
    }, 1000)
  }, [counter, isRecordingAudio])

  return (
    // implement i18n
    <Grid style={{ height: '80px' }} container justify="center" alignItems="center">
      <Grid container direction="column" alignItems="center">
        <Grid container justify="center" alignItems="center">
          <ColoredHighlightOffIcon onClick={() => setIsRecordingAudio(false)} />
          <LimitedGrid justify="center" container xs={3} sm={2} md={2} lg={1} xl={1}>
            <span style={{ width: '80px', textAlign: 'center' }}>{timeRecording}</span>
          </LimitedGrid>
          <CircleContainer border={0} backgroundColor="#78ce62d6" borderColor="#78ce62d6" width="45" height="45">
            <RotatedSend onClick={() => finishRecordingAudio()} />
          </CircleContainer>
        </Grid>
        {/* implement i18n */}
        <span>gravando aúdio...</span>
      </Grid>
    </Grid>
  )
}