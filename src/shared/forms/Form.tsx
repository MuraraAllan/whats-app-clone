// abstract react-hooks behaviors into components

import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ObjectSchema } from "yup";

// <Form>
//  <FormGroup>
//    { children }
//   </FormGroup>

interface FormProps {
  id?: string
  children: ReactNode
  onSubmit?: () => void
  schema: ObjectSchema<any>
  defaultValues: {
    [key: string]: unknown
  }
}

// react-hook-form
// generate a provider to share form context
// we don't control form state, instead we generate and and validate schemas with yup 
// there is a component called FormErrorHandling which listens for form errors by name
// and wraps the component with a red border

export function Form({ children, id, onSubmit, schema, defaultValues }: FormProps) {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: 'all',
  });

  const { handleSubmit } = methods

  if (handleSubmit == null) {
    return null
  }

  return (
    <FormProvider {...methods} >
      <form id={id} style={{ width: '100%' }} onSubmit={handleSubmit((d) => console.log('data is', d))}>
        {children}
      </form>
    </FormProvider>
  );
}