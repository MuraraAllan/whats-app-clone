import React from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'


interface CricleContainerProps {
  width: number,
  height: number,
  backgroundColor: string,
  border: number
}

export const CircleContainer = styled.div`
border: ${(p: CricleContainerProps) => p.border ? `${p.border}px solid` : "2px solid"};
border-radius: 50%;
display: flex;
justify-content: center;
align-items:center;
background-color: ${(p: CricleContainerProps) => p.backgroundColor ? p.backgroundColor : "#80808066"};
width : ${(p: CricleContainerProps) => p.width ? `${p.width}px` : "40px"};
height : ${(p: CricleContainerProps) => p.height ? `${p.height}px` : "40px"};`

