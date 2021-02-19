import React, { useEffect, useMemo, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import styled, { keyframes } from 'styled-components'

import { RotatedSend, CircleContainer } from 'shared/components'
import { timeInSecondsRenderInMinute } from 'shared/utils';
import { useRecordAudio } from 'pages/mainpage/hooks'


function blinkingEffect() {
  return keyframes`
    50% {
      opacity: 0;
    }
  `;
}

const ColoredHighlightOffIcon = styled(HighlightOffIcon)`color: #dc2e2e; width: 50px; height: 50px`
const LimitedGrid = styled(Grid)`max-width: 100px;`
const BallDiv = styled.div`border-radius: 50%;
width: 12px;
height: 12px;
border: 2px solid #dc2e2e;
animation: ${blinkingEffect} 2s linear infinite;
background-color: #dc2e2e;
color: #dc2e2e;
`
export default function RecordAudioActionBar() {
  const { finishRecordingAudio, cancelRecordingAudio, hasAudioPermission } = useRecordAudio()
  const [counter, setCounter] = useState<number>(0)

  const timeRecording = useMemo(() => timeInSecondsRenderInMinute(counter), [counter])

  useEffect(() => {
    setTimeout(() => {
      if (hasAudioPermission) {
        if (counter > 70) {
          finishRecordingAudio()
        }
        setCounter(counter + 1)
      }
    }, 1000)
  }, [counter, hasAudioPermission, finishRecordingAudio])

  return (
    // implement i18n
    <Grid data-testid="RecordAudioActionBar" style={{ height: '80px' }} container justify="center" alignItems="center">
      <Grid container direction="column" alignItems="center">
        <Grid container justify="center" alignItems="center">
          <ColoredHighlightOffIcon data-testid="RecordAudioActionBarStop" onClick={() => cancelRecordingAudio()} />
          <LimitedGrid justify="center" item container alignItems="center" xs={2} sm={2} md={2} lg={1} xl={1}>
            <BallDiv /><span style={{ width: '40px', textAlign: 'center' }}>{timeRecording}</span>
          </LimitedGrid>
          <CircleContainer border={0} coloredbackground="#78ce62d6" bordercolor="#78ce62d6" width="40" height="40">
            <RotatedSend viewBox="0 0 18 24" fontSize="large" data-testid="RecordAudioActionBarSend" onClick={() => finishRecordingAudio()} />
          </CircleContainer>
        </Grid>
        {/* implement i18n */}
        <span>gravando aúdio...</span>
      </Grid>
    </Grid>
  )
}