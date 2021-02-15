import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'

interface BorderedContainerProps {
  border?: string | number
  width?: string | number
  maxwidth?: string | number,
  padding?: string | number,
  height?: string | number
  margin?: string
  flex?: Number
  position?: string
}

export const BorderedContainer = styled(Grid)`
border: ${(p: BorderedContainerProps) => p.border ? `${p.border}px solid` : "1px solid"};
width: ${(p: BorderedContainerProps) => p.width ? (typeof p.width === 'string' ? p.width : `${p.width}%`) : null};
height: ${(p: BorderedContainerProps) => p.height ? (typeof p.width === 'string' ? p.height : `${p.height}%`) : null};
padding: ${(p: BorderedContainerProps) => p.padding ? (typeof p.padding === 'string' ? p.padding : `${p.padding}%`) : null};

max-width: ${(p: BorderedContainerProps) => p.maxwidth ? (typeof p.maxwidth === 'string' ? p.maxwidth : `${p.maxwidth}%`) : null};
margin: ${(p: BorderedContainerProps) => p.margin ? `${p.margin}` : "0px"};
position: ${(p: BorderedContainerProps) => p.position ? `${p.position}` : null};
flex: ${(p: BorderedContainerProps) => p.flex ? `${p.flex}` : null};
`

export const FullHeightBorderedContainer = styled(Grid)`
border: 1px solid;
height: 100vh;
flex-wrap: nowrap;`