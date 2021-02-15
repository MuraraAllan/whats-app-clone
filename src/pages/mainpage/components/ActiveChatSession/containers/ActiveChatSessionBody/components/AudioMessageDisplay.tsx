import React from 'react'
import Grid from '@material-ui/core/Grid'

import AudioPlayer from './AudioPlayer'
import { Message } from 'pages/mainpage/hooks/ChatSessionsHooks'



export default function AudioMessageDisplay({ message, isCurrentUserMessage }: { message: Message, isCurrentUserMessage: boolean }) {
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


  const blobSRC = URL.createObjectURL(message.audio?.content);
  return (
    // this is definitely repeated, look around if we can share on top component
    <Grid container item direction="column" style={{ maxWidth: '90%', alignItems: isCurrentUserMessage ? 'flex-end' : 'flex-start' }}>
      <AudioPlayer audioSrc={blobSRC} />
    </Grid>
  )
}