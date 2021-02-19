import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'


interface CricleContainerProps {
  width?: number | string,
  height?: number | string,
  coloredbackground?: string,
  bordercolor?: string,
  border?: number,
  opacity?: string
  margin?: string,
  cursor?: string
  zindex?: number
}

export const CircleContainer = styled(Grid)`
border: ${(p: CricleContainerProps) => p.border ? `${p.border}px solid` : "2px solid"};
border-radius: 50%;
display: flex;
justify-content: center;
z-index: ${(p: CricleContainerProps) => p.zindex != null ? p.zindex : null};
cursor: ${(p: CricleContainerProps) => p.cursor ? `${p.cursor}` : null};
margin: ${(p: CricleContainerProps) => p.margin ? `${p.margin}` : "0px"};
opacity: ${(p: CricleContainerProps) => p.opacity ? p.opacity : "100%"};
align-items:center;
background-color: ${(p: CricleContainerProps) => p.coloredbackground ? p.coloredbackground : "#80808066"};
border-color: ${(p: CricleContainerProps) => p.bordercolor ? p.bordercolor : null};
width : ${(p: CricleContainerProps) => p.width ? `${p.width}px` : "40px"};
height : ${(p: CricleContainerProps) => p.height ? `${p.height}px` : "40px"};`

