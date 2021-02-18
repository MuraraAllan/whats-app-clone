// states :
// isViewingUploadedFile (filePreview != null should render an image as filePreview is only available for imgs)
// isPreViewingFileUpload (uploadFile != null & !isTakingPicture should render Attach icon and a container around)
// isPreviewingWebcam (uploadingFile != null & isTakingPicture)
import { act } from "react-dom/test-utils"
import { render } from "@testing-library/react"
import { FileViewer } from "."
import { MockProviders, useUploadFileMock } from "shared/test-utils"

// expect when isViewingUploadedFile to render a img with filePreview content

describe('FileViewer', () => {
  it('expect when isViewingUploadedFile to render a img with fileView content', () => {
    // create a blob and render an useState.
    // render FileViewer and set fileView 
    // expect to render no text msg
    const fileView = { content: new Blob(), name: 'any' }
    global.URL.createObjectURL = jest.fn();
    const { getByTestId } = render(<MockProviders>
      <FileViewer fileView={fileView} />
    </MockProviders>)
    expect(getByTestId('FileViewerIsViewingUploadedFile')).toBeDefined()
  })
  describe('isPreviewingFileUpload', () => {
    it('expect when isPreviewingFileUpload to render FileViewerIsPreviewingFileUpload and have file name', () => {
      // create a blob 
      // convert into UploadingFileType
      // prob a shared hook for useUploadFile 
      // rename file
      // setUploadingFile(blob)
      // render component
      // expect to find FileViewerIsPreviewingFileUpload data test id
      // expect to find file name
      // expect to find Digite o label do arquivo
      const { dispatchers: { setUploadingFile }, getByTestId, getByText } = useUploadFileMock(<FileViewer />)
      const fileView = { content: new Blob(), name: 'anytesttext' }
      act(() => setUploadingFile(fileView))
      global.URL.createObjectURL = jest.fn();
      expect(getByTestId('FileViewerIsPreviewingFileUpload')).toBeDefined()
      expect(getByText('anytesttext')).toBeDefined()
      expect(getByText('Digite o label do arquivo')).toBeDefined()
    })
  })
  describe('isPreviewingWebcam', () => {
    it('expect when isPreviewingWebcam to render FileViewerIsViewingWebcamFile and have file name', () => {
      // create a blob 
      // convert into UploadingFileType
      // rename file
      // setIsTakingPicture
      // setUploadingFile(blob)
      // prob a shared hook for useUploadFile
      // expect to find FileViewerIsViewingWebcamFile data test id
      // expect to find Digite o label do arquivo
      // expect to find tirar foto novamente
      const {
        dispatchers: { setUploadingFile, setIsTakingPicture },
        getByTestId,
        getByText
      } = useUploadFileMock(<FileViewer />)
      const fileView = { content: new Blob(), name: 'anytesttext' }
      act(() => setIsTakingPicture(true))
      act(() => setUploadingFile(fileView))
      global.URL.createObjectURL = jest.fn();
      expect(getByTestId('FileViewerIsViewingWebcamFile')).toBeDefined()
      expect(getByText('Tire uma foto')).toBeDefined()
    })
  })
})