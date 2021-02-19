import React, { CSSProperties, useState, useEffect, useMemo } from 'react'
import Grid from '@material-ui/core/Grid'
import PersonIcon from '@material-ui/icons/Person';
import styled from 'styled-components'

import { BorderedContainer, CircleContainer } from 'shared/components'

import { Message, UploadingFileType } from 'pages/mainpage/hooks/ChatSessionsHooks';
import { RegisteringFormVisual } from 'pages/mainpage/forms'
import { TakePictureWithCam, DisplayMessages, UploadedWebcamPictureView, FileUploadPreview, CamPictureUploadPreview } from './components/'
import { useActiveChatSession, useGetMainPageState, useUploadFileDND, } from 'pages/mainpage/hooks'


// states :
// withFileView (fileView != null render FilePreview )
// displayWebcamTakePicture (takingPicture and notUploadingFile render TakePictureWithCam)
// uploadingFile (render FilePreviewer)
// displayingTextMessage (defaultState will render MessageDisplay)
// registering (will render RegisteringForm)

export default function ActiveChatSessionBody() {

  // render sub-components with z-index to avoid displayMessages rerendering
  const mainPageState = useGetMainPageState()
  const { activeChatSession } = useActiveChatSession()

  // console.log('main Page state is', mainPageState)


  const MemoizedChatSessionBodyZIndexed = useMemo(() => {
    // console.log('memoized chat session body rerendered ')
    switch (mainPageState) {
      case 'view_message':
        return null
      case 'view_message_picture':
        return <UploadedWebcamPictureView />
      case 'record_audio':
        return null
      case 'preview_file_upload':
        return <FileUploadPreview />
      case 'take_webcam_picture':
        return <TakePictureWithCam />
      case 'preview_uploading_webcam':
        return <CamPictureUploadPreview />
      case 'register_form':
        return <RegisteringFormVisual />

      default: throw new Error('Missing matching PageState')
    }
  }, [mainPageState])

  // console.log('memoized chat sesison body', MemoizedChatSessionBody)
  if (activeChatSession == null) {
    return null
  }
  // message can use 70 % of width 
  // inline buttons can use entire screen 

  // should render DisplayMessages when 
  // iterate over all messages;   

  return MemoizedChatSessionBodyZIndexed != null ?
    <Grid container style={{ zIndex: 101, backgroundColor: 'white' }}>
      {MemoizedChatSessionBodyZIndexed}
    </Grid>
    : null
}