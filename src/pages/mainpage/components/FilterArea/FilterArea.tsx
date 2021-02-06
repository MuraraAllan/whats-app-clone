import React from 'react'

import { BorderedContainer, BorderedInput } from 'shared/components';
import { ShadowedButton } from 'shared/components/ShadowedButton';

export default function FilterArea() {

  return (
    <BorderedContainer container justify="center" alignItems="center">
      <BorderedInput placeholder="..." border={2} width={70} height={65} />
      <ShadowedButton width={20} height={75} marginLeft={2} marginTop={5} marginBottom={5}>Filter</ShadowedButton>
    </BorderedContainer>
  )
} 