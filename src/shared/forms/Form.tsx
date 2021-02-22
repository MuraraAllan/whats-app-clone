// abstract react-hooks behaviors into components
import { ReactNode, useCallback } from "react";

import { FormProvider, useForm } from "react-hook-form";
import { ObjectSchema } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useActiveChatSessionID } from "../../pages/mainpage/hooks";

interface FormProps {
  id?: string
  children: ReactNode
  onSubmit?: () => void
  schema: ObjectSchema<any>
  validationMode?: 'all' | 'onSubmit'
  revalidationMode?: 'onSubmit' | 'onChange'
  fullWidth?: boolean
  defaultValues?: {
    [key: string]: unknown
  }
}

// react-hook-form
// generate a provider to share form context
// we don't control form state, instead we generate and and validate schemas with yup 
// there is a component called FormErrorHandling which listens for form errors by name
// and wraps the component with a red border

export function Form({ children, defaultValues, fullWidth, id, onSubmit, revalidationMode, schema, validationMode }: FormProps) {
  console.log('validation mode', validationMode)
  console.log('validation mode', revalidationMode)
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: validationMode ?? 'all',
    reValidateMode: revalidationMode ?? 'onChange'
  });
  const { handleSubmit } = methods
  const session_id = useActiveChatSessionID()
  const localHandleSubmit = useCallback((data, form) => {
    if (handleSubmit != null) {
      // fit string type of return object
      const timeStampDate = new Date(data.birth_date).getTime().toString()

      const localObj = {
        form,
        chat_id: session_id,
        ...data,
        birth_date: timeStampDate,
      }
      console.log(localObj)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSubmit, methods])


  if (handleSubmit == null) {
    return null
  }


  return (
    <FormProvider {...methods} >
      <form id={id} style={fullWidth ? { width: '100%' } : undefined} onSubmit={handleSubmit((d) => localHandleSubmit(d, id))}>
        {children}
      </form>
    </FormProvider>
  );
}