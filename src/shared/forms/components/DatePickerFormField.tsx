import { ReactNode, useCallback, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";

import { BorderedContainer } from "../../components";
import { FormErrorHandling } from "shared/forms";


interface FormSelectProps {
  name: string,
  label?: string,
  depends?: string,
  renderList?: {
    [index: string]: unknown
  }
  children?: ReactNode
}


const CustomInput = styled.input`
border: transparent;
text-align: center;
max-width: 150px;
height: 26px;
z-index: 99;
background: transparent;
&:focus {
  border: transparent;
  outline: none;
}
`

// this component can't be used as children

export function DatePickerFormField(props: FormSelectProps) {
  const methods = useFormContext()
  const { name } = props

  const BorderedDatePicker = useCallback((borderProps: { children: React.ReactNode }) => {
    if (borderProps.children == null) return null
    return (
      <BorderedContainer container alignItems="center" style={{ position: 'relative', marginLeft: '-2px' }}>
        <BorderedContainer position="absolute" height={100} width={80} border={2} />
        {borderProps.children}
      </BorderedContainer>
    )
  }, [])

  return (
    <FormErrorHandling name={name}>
      <BorderedDatePicker>
        <CustomInput {...props} type="date" name={name} ref={methods.register as any} />
      </BorderedDatePicker>
    </FormErrorHandling>

  );
}

export default DatePickerFormField