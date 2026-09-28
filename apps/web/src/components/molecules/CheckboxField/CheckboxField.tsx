import React from 'react'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import type { CheckboxProps } from '../../atoms/Checkbox/Checkbox'

export interface CheckboxFieldProps extends CheckboxProps {
  id: string
  label: string
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  id,
  label,
  className = '',
  disabled = false,
  ...checkboxProps
}) => {
  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`.trim()}>
      <Checkbox id={id} disabled={disabled} {...checkboxProps} />
      <label
        htmlFor={id}
        className={`text-sm text-gray-300 font-normal cursor-pointer hover:text-white transition-colors ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {label}
      </label>
    </div>
  )
}
