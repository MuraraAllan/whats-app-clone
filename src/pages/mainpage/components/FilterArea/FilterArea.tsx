import React from 'react'
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';

import { useUser } from 'shared/hooks/UserHooks'
import { BorderedContainer } from 'shared/components/BorderedContainer';
import Button from '@material-ui/core/Button';

export default function FilterArea() {
  const user = useUser()

  return (
    <BorderedContainer spacing={2}>
      <Input style={{ maxWidth: '50%' }} />
      <Button variant="contained">Filter</Button>
    </BorderedContainer>
  )
} 