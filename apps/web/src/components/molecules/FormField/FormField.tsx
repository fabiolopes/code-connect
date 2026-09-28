import React from 'react'
import { Label } from '../../atoms/Label/Label'
import { Input } from '../../atoms/Input/Input'
import type { InputProps } from '../../atoms/Input/Input'

export interface FormFieldProps extends Omit<InputProps, 'id'> {
  label: string
  id: string
  error?: string
  required?: boolean
  containerClassName?: string
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  error,
  required = false,
  containerClassName = '',
  ...inputProps
}) => {
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className={`flex flex-col text-left ${containerClassName}`.trim()}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <Input
        id={id}
        hasError={Boolean(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        required={required}
        {...inputProps}
      />
      {error && (
        <span id={errorId} role="alert" className="mt-1.5 text-xs text-red-400 font-medium">
          {error}
        </span>
      )}
    </div>
  )
}
