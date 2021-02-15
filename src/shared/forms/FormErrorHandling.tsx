import { ReactNode } from "react"
import { useFormContext } from "react-hook-form"

interface FormErrorHandlingProps {
  children?: ReactNode,
  name: string
}

//the error handling only works if children component is a container (should be as large as children in order to reiceve the border)
//set border color by ref on target element

export function FormErrorHandling({ children, name }: FormErrorHandlingProps) {
  const data = useFormContext()
  const hasErrors = data.errors[name] != null

  return (
    <>
      <div
        data-testid={`FormErrorHandling${name}`}
        style={{
          overflow: hasErrors === true ? 'hidden' : 'inherit',
          border: `2px solid ${hasErrors ? 'red' : 'transparent'}`,
          width: 'fit-content'
        }}>
        {children}
      </div>
    </>
  )
}