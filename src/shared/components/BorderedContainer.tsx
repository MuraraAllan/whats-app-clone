import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'

interface BorderedContainerProps {
  border?: string | number
  width?: string | number
  height?: string | number
}

export const BorderedContainer = styled(Grid)`
border: ${(p: BorderedContainerProps) => p.border ? `${p.border}px solid` : "1px solid"};
width: ${(p: BorderedContainerProps) => p.width ? (typeof p.width === 'string' ? p.width : `${p.width}%`) : null};
height: ${(p: BorderedContainerProps) => p.height ? (typeof p.height === 'string' ? p.height : `${p.height}%`) : null};
`

export const FullHeightBorderedContainer = styled(Grid)`
border: 1px solid;
height: 100vh;
flex-wrap: nowrap;`