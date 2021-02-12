import React from 'react'

import { BorderedContainer, BorderedInput } from 'shared/components';
import { ShadowedButton } from 'shared/components/ShadowedButton';

export default function FilterArea() {

  return (
    <BorderedContainer container justify="flex-end" alignItems="center" padding="3px">
      <BorderedInput placeholder="..." border={2} width={68} height={"30px"} />
      <ShadowedButton width={25} height={"35px"} margin={"0px 5px 1px 2px"}>Filter</ShadowedButton>
    </BorderedContainer>
  )
} 