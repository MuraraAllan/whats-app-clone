import styled from 'styled-components'

interface BorderedInputProps {
  border?: string | number
  width?: string | number
  height?: string | number
}

export const BorderedInput = styled.input`
border: ${(p: BorderedInputProps) => p.border ? `${p.border}px solid` : "1px solid"};
width: ${(p: BorderedInputProps) => p.width ? (typeof p.width === 'string' ? p.width : `${p.width}%`) : "100%"};
height: ${(p: BorderedInputProps) => p.height ? (typeof p.height === 'string' ? p.height : `${p.height}%`) : "100%"};
`