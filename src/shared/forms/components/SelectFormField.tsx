import { ReactNode, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";

import { FormErrorHandling } from "shared/forms";


const SelectDiv = styled.div`
position: relative;
pointer: click;
float: left;
&:focus {
  outline: none;
}

 &:after {
    content: '\f100';
    font: normal normal normal 25px FontAwesome;
    right: 1px;
    top: 2px;
    border-left: 2px solid black;
    position: absolute;
    pointer-events: none;
}
`


const StyledSelect = styled.select`border: 2px solid;
background-color: #ffffff;
padding-right: 10px;
min-height: 32px;
text-align-last: center;
background-color: white;
margin-left: -2px;
min-width: max-content;
&:focus {
  outline: none;
  background-color: white;
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
  "data-testid"?: string
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

export function SelectFormField(props: FormSelectProps) {
  const { name, children, depends, renderList } = props
  const methods = useFormContext()
  const dependsValue = depends != null ? methods.watch(depends) : null

  const RenderList = useMemo(() => {
    if (renderList != null) {
      if (dependsValue != null) {
        const optionsToRender = renderList[dependsValue]
        return (
          <>
            {/* fix type any */}
            {Object.values(optionsToRender as []).map((item: any) => {
              return <option key={item} value={item ?? ''}>{item}</option>
            })}
          </>)
      }
      return (
        <>
          {Object.keys(renderList).map((item: any) => {
            return <option key={item} value={item ?? ''}>{item}</option>
          })}
        </>)
    }
    return null
  }, [renderList, dependsValue])

  return (
    <>
      <FormErrorHandling name={name}>
        <SelectDiv>
          <Controller
            as={
              <StyledSelect  {...props} ref={methods.register} name={name}>
                {RenderList != null ? <> {RenderList}</> : children}
                {/* {children} */}
              </StyledSelect>

            }
            name={name}
            control={methods?.control}
          />
        </SelectDiv>
      </FormErrorHandling >
    </>
  );
}

export default SelectFormField;