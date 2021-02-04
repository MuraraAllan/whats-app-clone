import React from 'react'
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';

import { BorderedContainer } from 'shared/components';
import Button from '@material-ui/core/Button';
import { useUser } from 'shared/hooks'

export default function FilterArea() {

  return (
    <BorderedContainer spacing={2}>
      <Input style={{ maxWidth: '50%' }} />
      <Button variant="contained">Filter</Button>
    </BorderedContainer>
  )
} 