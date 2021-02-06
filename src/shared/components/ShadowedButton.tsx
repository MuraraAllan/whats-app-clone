import styled from 'styled-components'

interface ShadowedButtonProps {
  border?: string | number
  width?: string | number
  height?: string | number
  margin?: string | number
  marginLeft?: string | number
  marginTop?: string | number
  marginBottom?: string | number
  marginRight?: string | number
}

export const ShadowedButton = styled.button`
border: ${(p: ShadowedButtonProps) => p.border ? `${p.border}px solid` : "2px solid black"};
box-shadow: 2px 1px 0px 0.5px black;
background-color: white;
padding: 7px;
cursor: pointer;
margin-top: ${(p: ShadowedButtonProps) => p.marginTop ? `${p.marginTop}px` : "0px"};
margin-left: ${(p: ShadowedButtonProps) => p.marginLeft ? `${p.marginLeft}px` : "0px"};
margin-bottom: ${(p: ShadowedButtonProps) => p.marginBottom ? `${p.marginBottom}px` : "0px"};
margin-right: ${(p: ShadowedButtonProps) => p.marginRight ? `${p.marginRight}px` : "0px"};
width: ${(p: ShadowedButtonProps) => p.width ? `${p.width}%` : "auto"};
height: ${(p: ShadowedButtonProps) => p.height ? `${p.height}%` : "auto"};
`