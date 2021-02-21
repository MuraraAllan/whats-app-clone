import React from 'react'

import { RegisteringFormVisual } from 'pages/mainpage/forms'
import { TakePictureWithCam, DisplayMessages, UploadedWebcamPictureView, FileUploadPreview, CamPictureUploadPreview } from './components/'
import { useGetMainPageState } from 'pages/mainpage/hooks'


export default function ActiveChatSessionBody() {
  const mainPageState = useGetMainPageState()

  switch (mainPageState) {
    case 'view_message':
      return <DisplayMessages />
    case 'view_message_picture':
      return <UploadedWebcamPictureView />
    case 'record_audio':
      return <DisplayMessages />
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
}