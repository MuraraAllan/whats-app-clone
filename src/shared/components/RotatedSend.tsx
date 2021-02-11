import styled from 'styled-components'
import { Send } from '@material-ui/icons'


interface RotatedSendProps {
  marginBottom?: number | string
}


export const RotatedSend = styled(Send)`
transform: rotate(-45deg);
margin-bottom: ${(p: RotatedSendProps) => p.marginBottom ? (typeof p.marginBottom === 'string' ? p.marginBottom : `${p.marginBottom}%`) : null};
`
