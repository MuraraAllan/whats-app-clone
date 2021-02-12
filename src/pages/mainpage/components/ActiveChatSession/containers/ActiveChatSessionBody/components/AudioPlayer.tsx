import React, { createRef, RefObject, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import { ControlPointSharp, PlayArrow, Stop } from '@material-ui/icons';
import styled from 'styled-components'

import { BorderedContainer, UserAvatar } from 'shared/components'


import { useUser } from 'shared/hooks'

import { Grid } from '@material-ui/core';
import { timeInSecondsRenderInMinute } from 'shared/utils';
import { useAudioPlayerHook } from '../../ActiveChatSessionActionBar/components/useAudioPlayerHook';


const PaddedBorderedContainer = styled(BorderedContainer)`padding: 5px`;
const FixedHeightGrid = styled(Grid)`height: 50px`

// useRef on audio to accesss audio property
// memoize ref.duration
// memoize ref.currentTime
// enable pause audio - test.stop()
// enable resume / play audio - test.play()


// draw user avatar
// draw arrow if ref is stoped
// draw stop button if ref


// if ref.played && ref.paused === false playing
// if ref.played && ref.paused === true stopped

// render audio player
// render user avatar,


export default function AudioPlayer({ audioSrc }: { audioSrc: string }) {

  const { progress, currentTime, audioRef, duration } = useAudioPlayerHook()
  const { user } = useUser()


  // if progress is 100 % then render null
  // it will force a render of 0 % on the slide bar
  // and disable isPlaying

  const isStoped = useMemo(() => {
    if (progress == null || audioRef.current?.paused === true) {
      return true
    }
    return false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress])

  const isPlaying = useMemo(() => {
    if (isStoped === false && progress != null && progress > 0 && progress < 100) {
      return true
    }
    return false
  }, [isStoped, progress])


  const pauseAudio = useCallback(() => {
    if (isPlaying && audioRef.current != null) {
      return audioRef.current.pause()
    }
  }, [isPlaying, audioRef])

  const playAudio = useCallback(() => {
    audioRef.current?.play()
    if (isPlaying === false && audioRef.current != null) {
      return audioRef.current.play()
    }
  }, [isPlaying, audioRef])

  const timeState = useMemo(() => {
    if (currentTime != null && duration != null) {
      if (isPlaying) {
        return timeInSecondsRenderInMinute(currentTime)
      }
      if (isStoped && currentTime > 0) {
        return `${timeInSecondsRenderInMinute(currentTime)} - ${timeInSecondsRenderInMinute(duration)}`
      }
      return timeInSecondsRenderInMinute(duration)
    }
    return '0:00'
  }, [duration, currentTime, isStoped, isPlaying])

  const movePositionByClick = (ev: any) => {
    if (duration != null && audioRef.current != null) {
      const clickedW = ev.nativeEvent.offsetX
      const { width } = ev.target.getBoundingClientRect()
      // the width property is around 4% bigger then the clickedW
      const percentageClicked = parseInt(((clickedW / width) * 100 + 4).toFixed())
      audioRef.current.currentTime = parseInt(((duration * percentageClicked) / 100).toFixed())
    }
  }

  return (
    <>
      <PaddedBorderedContainer container item xs={9} sm={7} md={5} lg={3} xl={2} direction="column" alignItems="center">
        <FixedHeightGrid container alignItems="center">
          <Grid item style={{ flex: 0.15 }}>
            <UserAvatar user={user} limitDimensions="50px" />
          </Grid>
          <Grid item style={{ flex: 0.15 }}>
            {isPlaying === false ? <PlayArrow fontSize="large" onClick={() => playAudio()} /> : <Stop fontSize="large" onClick={() => pauseAudio()} />}
          </Grid>
          <Grid item container direction="column" style={{ flex: 0.8 }} onClick={(e) => movePositionByClick(e)}>
            <BorderedContainer border={1} width={100} item container alignItems="center" position="relative" >
              <div style={{ paddingLeft: '10px', width: `${progress ?? 0}% `, justifyContent: 'flex-end', alignItems: "center", display: 'flex', zIndex: 99 }}>
                <div style={{ width: 0, height: 0, borderLeft: '8px solid transparent', position: 'absolute', borderRight: '8px solid transparent', borderTop: '12px solid black' }} />
              </div>
            </BorderedContainer>
            <span style={{ position: 'absolute', marginTop: '10px' }}>{timeState}</span>
          </Grid>
        </FixedHeightGrid>
      </PaddedBorderedContainer>
      <audio ref={audioRef} id="teste" data-testid="AudioMessageDisplayObject" src={audioSrc} controls style={{ display: 'none' }} />
    </>
  )
}