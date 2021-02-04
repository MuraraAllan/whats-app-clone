import React from 'react'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'



export const BorderedContainer = styled(Grid)`border: ${(p: { border?: string }) => p.border ? `${p.border}px solid` : "1px solid"};`

export const FullHeightBorderedContainer = styled(Grid)`
border: 1px solid;
height: 100vh;
flex-wrap: nowrap;`