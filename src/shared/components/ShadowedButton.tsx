import { Button } from '@material-ui/core'
import styled from 'styled-components'

interface ShadowedButtonProps {
  border?: string | number
  width?: string | number
  height?: string | number
  margin?: string
}

// remember to check why buttons are growing when no textMessage
// rememberr to check cross-browser compatibility
export const ShadowedButton = styled(Button)`
border: ${(p: ShadowedButtonProps) => p.border ? `${p.border}px solid` : "2px solid black"};
line-height: 1;
letter-spacing: 0;
text-transform : none;
box-shadow: 2px 1px 0px 0.5px black;
background-color: white;
border-radius: 0px;
padding: 7px;
cursor: pointer;
color: black;
font-weight: 400;
margin: ${(p: ShadowedButtonProps) => p.margin ? `${p.margin}` : "0px"};
width: ${(p: ShadowedButtonProps) => p.width ? `${p.width}%` : "auto"};
height: ${(p: ShadowedButtonProps) => p.height ? `${p.height}%` : "auto"};
`