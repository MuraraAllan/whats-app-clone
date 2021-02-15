import styled from 'styled-components'
import { Send } from '@material-ui/icons'


interface RotatedSendProps {
  marginBottom?: number | string
  margin?: number | string
  width?: number | string
}


export const RotatedSend = styled(Send)`
transform: rotate(-45deg);
margin-bottom: ${(p: RotatedSendProps) => p.marginBottom ? (typeof p.marginBottom === 'string' ? p.marginBottom : `${p.marginBottom}%`) : null};
margin: ${(p: RotatedSendProps) => p.margin ? p.margin : null};
width: ${(p: RotatedSendProps) => p.width ? (typeof p.width === 'string' ? p.width : `${p.width}%`) : null};
`
