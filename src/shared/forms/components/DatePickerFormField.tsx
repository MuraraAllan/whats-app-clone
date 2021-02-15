import { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";

import { BorderedContainer } from "../../components";
import { FormErrorHandling } from "shared/forms";


interface FormSelectProps {
  name: string,
  label?: string,
  children?: ReactNode,
  depends?: string,
  renderList?: {
    [index: string]: unknown
  }
}


const BorderedDatePicker = ({ children }: { children: ReactNode }) => {
  return (
    <BorderedContainer container alignItems="center" style={{ position: 'relative', marginLeft: '-2px' }}>
      <BorderedContainer position="absolute" height={100} width={80} border={2} />
      {children}
    </BorderedContainer>
  )

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

export function DatePickerFormField(props: FormSelectProps) {
  const methods = useFormContext()
  const { name, children } = props
  return (
    <>
      <FormErrorHandling name={name}>
        <Controller
          render={() => {
            return children != null ? children as any :
              <BorderedDatePicker>
                <CustomInput {...props} type="date" name={name} ref={methods.register as any} />
              </BorderedDatePicker>
          }}
          name={name}
          control={methods?.control}
        />
      </FormErrorHandling >
    </>
  );
}

export default DatePickerFormField