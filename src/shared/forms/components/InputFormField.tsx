import { createRef, forwardRef, ReactElement, ReactNode, useEffect, useRef } from "react";
import Select from "@material-ui/core/Select";
import { Controller, useFormContext } from "react-hook-form";


import { BorderedInput } from "shared/components";
import { Grid } from "@material-ui/core";
import { types } from "util";


interface InputFormFieldProps {
  name: string,
  label?: string,
  children?: ReactNode,
  border?: string | number
  width?: string | number
  height?: string | number
  type?: HTMLInputElement["type"]
  placeholder?: HTMLInputElement["placeholder"]
}

export function InputFormField(props: InputFormFieldProps) {
  const methods = useFormContext()
  const hasErrors = methods.errors[props.name] != null && methods.formState.submitCount > 0
  const { border } = props

  return (
    <>
      <Controller
        as={<BorderedInput
          onClick={(e) => e.preventDefault()}
          height="26px"
          {...props}
          border={hasErrors ? '2px solid red' : border}
        />}
        name={props.name}
        control={methods?.control}
      />
    </>
  );
}

export default InputFormField;