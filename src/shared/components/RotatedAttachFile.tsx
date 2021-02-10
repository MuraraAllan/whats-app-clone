import styled from 'styled-components'
import { AttachFile } from '@material-ui/icons'


interface RotatedAttachFileProps {
  width?: number | string,
  height?: number | string,
  backgroundColor?: string,
  border?: number,
  opacity?: string
}


export const RotatedAttachFile = styled(AttachFile)`
transform: rotate(-45deg);
width: ${(p: RotatedAttachFileProps) => p.width ? (typeof p.width === 'string' ? p.width : `${p.width}%`) : null};
height: ${(p: RotatedAttachFileProps) => p.height ? (typeof p.height === 'string' ? p.height : `${p.height}%`) : null};
`
