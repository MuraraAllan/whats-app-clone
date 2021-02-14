import { ReactNode, useMemo } from "react";
import { Control, Controller, useController, useFormContext } from "react-hook-form";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { FormErrorHandling } from "shared/forms";
import styled from "styled-components";
import { Grid, Input, TextField } from "@material-ui/core";
import { BorderedContainer } from "../../components";



const SelectDiv = styled.div`
position: relative;
pointer: click;
float: left;
&:focus {
  outline: none;
}
`


interface FormSelectProps {
  name: string,
  label?: string,
  children?: ReactNode,
  depends?: string,
  renderList?: {
    [index: string]: unknown
  }
}

// a selectFormField can be rendered by childrens
// or can have a renderList in which case will render all the props as value and label 
// an depends SelectForm will watch for changes in another fields of the form (any)
// and select depended ${value} from its own renderList 

// if no depends property, the component will render with passed Object props

// if depends prop is passed pass an object which contains 
// values of depended and a list 
// like in : {
//   'brasil' : ['sc', 'sp'], 
//   'venezuela' : ['a', 'b']
// }



const BorderedDatePicker = ({ children }: { children: ReactNode }) => {
  return (
    <Grid container alignItems="center" style={{ position: 'relative', marginLeft: '-2px' }}>
      <BorderedContainer position="absolute" height={100} width={80} border={2} />
      {children}
    </Grid>
  )

}

const CustomInput = styled.input`
border: transparent;
text-align: center;
max-width: 150px;

`

export function DatePickerFormField({ name, children }: FormSelectProps) {
  const methods = useFormContext()
  // should get values from the current form state
  return (
    <>
      <FormErrorHandling name={name}>
        <Controller
          as={
            children != null ? children as any :
              <BorderedDatePicker>
                <Input
                  type="date"
                  disableUnderline={true}
                  name={name}
                  ref={methods.register}
                  inputComponent={(props) => <CustomInput name={name} ref={methods.register} {...props} />}
                />
              </BorderedDatePicker>
          }
          name={name}
          control={methods?.control}
        />
      </FormErrorHandling >
    </>
  );
}

export default DatePickerFormField