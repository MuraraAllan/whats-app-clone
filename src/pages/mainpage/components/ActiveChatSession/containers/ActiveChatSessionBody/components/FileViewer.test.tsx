// states :
// isViewingUploadedFile (filePreview != null should render an image as filePreview is only available for imgs)
// isPreViewingFileUpload (uploadFile != null & !isTakingPicture should render Attach icon and a container around)
// isPreviewingWebcam (uploadingFile != null & isTakingPicture)

// expect when isViewingUploadedFile to render a img with filePreview content

describe('FileViewer', () => {
  it('expect when isViewingUploadedFile to render a img with fileView content', () => {
    // create a blob and render an useState.
    // render FileViewer and set fileView 
    // expect to render no text msg
  })
  describe('isPreviewingFileUpload', () => {
    it('expect when isPreviewingFileUpload to render FileViewerIsPreviewingFileUpload and have file name')
    // create a blob 
    // convert into UploadingFileType
    // prob a shared hook for useUploadFile 
    // rename file
    // setUploadingFile(blob)
    // render component
    // expect to find FileViewerIsPreviewingFileUpload data test id
    // expect to find file name
    // expect to find Digite o label do arquivo
  })
  describe('isPreviewingWebcam', () => {
    it('expect when isPreviewingWebcam to render FileViewerIsViewingWebcamFile and have file name')
    // create a blob 
    // convert into UploadingFileType
    // rename file
    // setIsTakingPicture
    // setUploadingFile(blob)
    // prob a shared hook for useUploadFile
    // expect to find FileViewerIsViewingWebcamFile data test id
    // expect to find Digite o label do arquivo
    // expect to find tirar foto novamente
  })
})