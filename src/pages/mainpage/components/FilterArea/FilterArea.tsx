import React from 'react'

import { BorderedContainer, BorderedInput } from 'shared/components';
import { ShadowedButton } from 'shared/components/ShadowedButton';

export default function FilterArea() {

  return (
    <BorderedContainer container justify="flex-end" alignItems="center">
      <BorderedInput placeholder="..." border={2} width={68} height={65} />
      <ShadowedButton width={25} height={75} margin={"0px 5px 5px 2px"}>Filter</ShadowedButton>
    </BorderedContainer>
  )
} 