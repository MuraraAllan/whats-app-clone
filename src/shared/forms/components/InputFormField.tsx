import { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";


import { BorderedInput } from "shared/components";


interface InputFormFieldProps {
  name: string,
  label?: string,
  children?: ReactNode,
  border?: string | number
  width?: string | number
  height?: string | number
  type?: HTMLInputElement["type"]
  placeholder?: HTMLInputElement["placeholder"]
  showErrorMessage?: boolean
}

export function InputFormField(props: InputFormFieldProps) {
  const methods = useFormContext()
  const error = methods.errors[props.name]
  const hasErrors = error != null && methods.formState.submitCount > 0
  const { border } = props
  console.log(error)
  // component is now connect to form validation through FormProvider
  return (
    <>
      <BorderedInput
        onClick={(e) => e.preventDefault()}
        autoComplete="off"
        height="26px"
        ref={methods.register}
        {...props}
        border={hasErrors ? '2px solid red' : border}
      />
      {props.showErrorMessage && hasErrors ? (
        <span>{error.message}</span>
      ) : null}
    </>
  );
}

export default InputFormField;